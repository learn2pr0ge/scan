import * as React from 'react';
import { Navigate } from 'react-router-dom';
import "../styles/result.css";
import {useEffect, useState} from "react";
import { api_call_docsearch } from "./apidoc"




function Result({ searchHistory = null, searchProcess = null, Docsearch = null, ids = null}) {

    const token = localStorage.getItem('accessToken');
    const expDate = Number(localStorage.getItem('expiresIn'));
    if (!token || expDate < Date.now()) {
        return <Navigate to="/"/>;
    }

    const firstHistogram = searchHistory?.data?.find((h) => h.histogramType === "totalDocuments");
    const riskFactors = searchHistory?.data?.find((h) => h.histogramType === "riskFactors");
    const totalValues = firstHistogram
        ? firstHistogram.data.reduce((sum, item) => sum + item.value, 0)
        : 0;

    // скролл
    const scrollRef = React.useRef(null);
    const scrollLeft = () => {
        if (scrollRef.current && window.innerWidth < 768) {
            const cardWidth = scrollRef.current.offsetWidth - 3;
            scrollRef.current.scrollBy({left: -cardWidth, behavior: 'smooth'});
        } else if (scrollRef.current && window.innerWidth >= 768) {
            const cardWidth = scrollRef.current.offsetWidth / 8 - 17;
            scrollRef.current.scrollBy({left: -cardWidth, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current && window.innerWidth < 768) {
            const cardWidth = scrollRef.current.offsetWidth - 3;
            scrollRef.current.scrollBy({left: +cardWidth, behavior: 'smooth'});
        } else if (scrollRef.current && window.innerWidth >= 768) {
            const cardWidth = scrollRef.current.offsetWidth / 8 - 17;
            scrollRef.current.scrollBy({left: +cardWidth, behavior: 'smooth'});
        }
    };

    // это документы которые идут на рендеринг

    const [articles, setArticles] = useState([]);

    // это счетчик документов для показа
    const [dispArticles, setdispArticles] = useState(2);
    // это отстаток ID для передачи для новых апи запросов
    const [remainingIds, setRemainingIds] = useState(ids || []);


// следим за изменением ids
    useEffect(() => {
        setRemainingIds(ids || []);
    }, [ids]);

    // это документы которые мы получили из Docsearcha
    const [docs, setDocs] = useState(Docsearch || []);

    useEffect(() => {
        setDocs(Docsearch || []);
         }, [Docsearch]);


    // это стейт загрузки
    const [loading, setLoading] = useState(false);
    // стейт каунтера
    const [startCounter, setStartCounter] = useState(0);
    // стейт кнопки загрузки новых новостей
    const [loadmore, setLoadmore] = useState(false);

    const showMoreArticles = () => {
        setdispArticles(prev => {
            const newDispArticles = prev + 2;
            if (newDispArticles % 10 === 0) {
                setLoadmore(true);
            }
            return newDispArticles;
        });
    };

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function cleanHtmlContent(htmlContent) {
        const decodedHtml = decodeHtml(htmlContent);
        const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
        return cleanedContent;
    }

    function loadArticles(articlesToLoad) {
        if (articlesToLoad && Array.isArray(articlesToLoad)) {
            const transformedArticles = articlesToLoad.map(doc => ({
                id: doc.ok.id,
                date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
                url: doc.ok.url,
                sourceName: doc.ok.source.name,
                isTechNews: doc.ok.attributes.isTechNews,
                isAnnouncement: doc.ok.attributes.isAnnouncement,
                isDigest: doc.ok.attributes.isDigest,
                title: doc.ok.title.text,
                content: doc.ok.content.markup,
                wordCount: doc.ok.attributes.wordCount,
            }));
            setArticles(prev => [...prev, ...transformedArticles]);
        }
    }


    async function loadmoreArticles() {
        setLoading(true);

        try {

            let idsToFetch;
            if (remainingIds.length <= 10) {
                // Берём всё что осталось
                idsToFetch = remainingIds;
                setRemainingIds([]);

            } else {
                // Берём первые 10
                idsToFetch = remainingIds.slice(0, 10);
                setRemainingIds(remainingIds.slice(10));
            }

            // Делаем запрос к API
            const data = await api_call_docsearch(idsToFetch);

            // Добавляем новые статьи к уже загруженным
            loadArticles(data);


        } catch (error) {
            console.error("Ошибка при загрузке новых документов:", error);
        } finally {
            setLoading(false);
            setStartCounter(+10);
            setLoadmore(false);
            showMoreArticles();
        }
    }


    useEffect(() => {
        if (docs && Array.isArray(docs)) {
            loadArticles(docs);
            showMoreArticles();
        }

    }, [docs]);

    useEffect(() => {
        return () => {
            setDocs([]);
            setArticles([]);
            setdispArticles(0);

        };
    }, [Docsearch]);


    return (
        <>
            <div className="result_wrapper">
                <div className="result_content_text">
                    <div className="result_content_text_h1">
                        <h1>ищем. скоро будут результаты</h1>
                    </div>
                    <div className="result_content_text_h2">
                        Поиск может занять некоторое время, просим сохранять терпение
                    </div>
                </div>
                <div className="result_pic_woman">
                    <img src="img/woman.svg" alt="woman" width="100%" height="100%"/>
                </div>
                <div className="result_content_text_h3_cont">
                    <div className="result_content_text_h3">
                        Общая сводка
                    </div>
                    <div className="result_content_text_h4">
                        Найдено {totalValues} вариантов
                    </div>
                </div>
                <div className="result_maininfo_wrapper">
                    <button className="whyus-block__leftimage" aria-label="left" onClick={scrollLeft}>
                        <img src="img/chevron-left.png" width="39" height="39" alt="Left"/>
                    </button>

                    <div className="result_risk_scroll_leftblock">
                        <div className="result_risk_scroll_leftblock_text">
                            Период
                        </div>
                        <div className="result_risk_scroll_leftblock_text">
                            Всего
                        </div>
                        <div className="result_risk_scroll_leftblock_text">
                            Риски
                        </div>
                    </div>

                    {searchProcess && (
                        <div className="result_risk_scroll">
                            <div className="spinner">
                                <img src="img/spiner.svg" alt="spinner" width="100%" height="100%"/>
                            </div>

                            <div className="result_spinner_text">
                                Загружаем данные
                            </div>

                        </div>
                    )}
                    {!searchProcess && (
                        <div className="result_risk_scroll " ref={scrollRef}>
                            {firstHistogram && firstHistogram.data.map(item => {

                                const riskItem = riskFactors?.data.find(r => r.date === item.date);

                                return (
                                    <div key={item.date} className="result_info_box">
                                        <div className="result_info_box_text">
                                            {item.date.split('T')[0].split('-').reverse().join('.')}
                                        </div>
                                        <div className="result_info_box_text">
                                            {item.value}
                                        </div>
                                        <div className="result_info_box_text">
                                            {riskItem ? riskItem.value : "—"}
                                        </div>
                                        <div className="vertical-line"></div>
                                    </div>

                                );
                            })}
                        </div>
                    )}
                        <button className="whyus-block__image_right1" aria-label="Scroll right" onClick={scrollRight}>
                            <img src="img/chevron-right.png" width="39" height="39" alt="Left"/>
                        </button>

                    </div>

                <div className="result_documents_text">
                    список документов
                </div>
                {docs && (
                    <div className="result_articles_wrapper">
                        {articles.slice(startCounter, dispArticles).map(article => {
                            const tagLabel = article.isTechNews
                                ? "Технические новости"
                                : article.isAnnouncement
                                    ? "Анонсы и события"
                                    : "Сводки новостей";
                            const cleanContent = cleanHtmlContent(article.content);


                            return (

                                <div className="result_articles_card" key={article.id}>
                                    <div className="article-info">
                                        <span className="article-date">{article.date}</span>
                                        <a href={article.url} className="article-source" target="_blank" rel="noopener noreferrer">
                                            {article.sourceName}
                                        </a>
                                    </div>
                                    <h3 className="article-title">{article.title}</h3>
                                    <div className="tag">{tagLabel}</div>
                                    <img src="/img/skill_man.svg" alt="Article" className="article-picture" />
                                    <p className="article-content">{cleanContent}</p>
                                    <div className="article-footer">
                                        <a href={article.url} className="button read-more" target="_blank" rel="noopener noreferrer">
                                            Читать в источнике
                                        </a>
                                        <span className="word-count">{article.wordCount} слова</span>
                                    </div>
                                </div>


                            );

                        })}
                    </div>

                )}
                {dispArticles < articles.length && (
                    <div className="button-div">
                        <button className="show-more" onClick={showMoreArticles}>
                            Показать больше
                        </button>
                    </div>
                )}

                {loadmore && (
                    <div className="button-div">
                        <button
                            className="show-more"
                            onClick={loadmoreArticles}
                            disabled={loading}
                        >
                            {loading ? "Загружаем..." : "Загрузить новые статьи"}
                        </button>
                    </div>
                )}
            </div>

            </>
            );
            }

            export default Result;