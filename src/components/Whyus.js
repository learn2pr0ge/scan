import React, { useRef } from 'react';
import "../styles/styles_main.css";


function Whyus() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.offsetWidth / 3;
            scrollRef.current.scrollBy({left: -cardWidth, behavior: 'smooth'});


        }
    }
        const scrollRight = () => {
            if (scrollRef.current) {
                const cardWidth = scrollRef.current.offsetWidth / 3;
                scrollRef.current.scrollBy({ left: +cardWidth, behavior: 'smooth'});
        }
    }
    return (
        <>
        <div className="scroll-text">
            почему именно мы
        </div>
    <div className="whyus-block-main">
        <button className="whyus-block__image" onClick={scrollLeft} aria-label="Scroll left">
            <img src="/img/chevron-left.png" width="39" height="39" alt="Left" />
        </button>



            <div className="whyus-scroll-container">
                <div className="whyus-block" ref={scrollRef}>
            <div className="whyus-block__card">
                <div className="whyus-block__card__image">
                    <img src="/img/watch_icon.svg" width="64" height="64" alt="Watch icon" />
                </div>
                <div className="whyus-block__card__title">
                    Высокая и оперативная скорость обработки заявки
                </div>
            </div>

            <div className="whyus-block__card1">
                <div className="whyus-block__card__image">
                    <img src="/img/lens_icon.svg" width="64" height="64" alt="Lens icon" />
                </div>
                <div className="whyus-block__card__title">
                    Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
                </div>
            </div>

            <div className="whyus-block__card2">
                <div className="whyus-block__card__image">
                    <img src="/img/lock.svg" width="64" height="64" alt="Lock icon" />
                </div>
                <div className="whyus-block__card__title">
                    Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству
                </div>
            </div>

                <div className="whyus-block__card3">
                    <div className="whyus-block__card__image">
                        <img src="/img/skill.png" width="64" height="64" alt="Phone icon" />
                    </div>
                    <div className="whyus-block__card__title">
                        SkillFactory лучшие!
                    </div>
                </div>

                    <div className="whyus-block__card4">
                        <div className="whyus-block__card__image">
                            <img src="/img/skill.png" width="64" height="64" alt="Phone icon" />
                        </div>
                        <div className="whyus-block__card__title">
                            Точно лучшие!
                        </div>
                    </div>


        </div>
    </div>
        <button className="whyus-block__image_right" onClick={scrollRight} aria-label="Scroll right">
            <img src="/img/chevron-right.png" width="39" height="39" alt="Right" />
        </button>
    </div>
            </>
);
}

export default Whyus;