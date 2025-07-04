import * as React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import "../styles/member.css"
import axios from "axios";
import Result from "./Result";


class Memberzone extends React.Component {

    render() {
        /* проверка наличия токена */
        const token = localStorage.getItem('accessToken');
        const expDate = Number(localStorage.getItem('expiresIn'));
        if (!token || expDate < Date.now()) {
            return <Navigate to="/"/>;

        }
        return (
            <>
                <div className="member_wrapper">
                    <div className="member_content_h1">
                        <h1>Найдите необходимые данные в пару кликов.</h1>
                    </div>
                    <div className="member_content_h2">
                        <h2>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</h2>
                    </div>

                    <div className="member_content_paper_pic">
                        <img src="/img/paper.svg" width="100%" height="100%" alt="paper pic"/>
                    </div>

                    <form className="member_form" onSubmit={this.props.handleSubmit}>
                        <div className={`member_form1 ${this.props.errorMsgInn ? 'error' : ''}`}>
                        <div className="member_form_main_font">
                            ИНН компании*

                        </div>

                        <input type="text" name="inn" id="inn" className="member_form_inn_input"
                                                              placeholder="10 цифр" autoComplete="on" onChange={this.props.handleChangeMember} value={this.props.MsgInn || ''} />
                        </div>
                            { this.props.errorMsgInn && ( <div className={"member-error-message-inn"}> Введите корректные данные </div>)}


                        <div className="member_form_main_font">
                            Тональность*

                        </div>
                        <select className="input-field_tonality" id="tonality" name="tonality" value={this.props.tonality} onChange={this.props.handleChangeMember} required>
                            <option value="any">Любая</option>
                            <option value="positive">Позитивная</option>
                            <option value="negative">Негативная</option>
                        </select>
                            <div className={`member_form1 ${this.props.errorMsgDocQuant ? 'error' : ''}`}>
                        <div className="member_form_main_font">
                            Количество документов в выдаче*

                        </div>
                        <input type="text" name="doc_quant" id="doc_quant" className="member_form_docquant_input"
                               placeholder="От 1 до 1000" autoComplete="on" onChange={this.props.handleChangeMember} value={this.props.MsgDocQuant || ''} />
                            </div>
                            { this.props.errorMsgDocQuant  && ( <div className={"member-error-message-docs"}> Обязательное поле </div>)}

                        <div className={`member_form1 ${this.props.errorMsgDates ? 'error' : ''}`}>
                        <div className="member_form_main_font">
                            Диапазон поиска*

                        </div>
                        <div className="memberform_input-dates">
                            <input type="text" id="daystart" className="memberform_input-field" placeholder="Дата начала" autoComplete="on" onChange={this.props.handleChangeMember} value={this.props.MsgDatesStart || ''}/>
                            <input type="text" id="dayend" className="memberform_input-field" placeholder="Дата конца" autoComplete="on" onChange={this.props.handleChangeMember} value={this.props.MsgDatesEnd || ''}/>
                        </div>
                            { this.props.errorMsgDates  && ( <div className={"member-error-message-dates"}> Введите корректные данные </div>)}

                        </div>

                        <div className="member_form_main_checkboxes">
                            <label>
                                <input type="checkbox" id="maxFullness" name="maxFullness" checked={this.props.maxFullness} onChange={this.props.handleChangeMember}  />

                                Признак максимальной полноты
                            </label>
                            <label>
                                <input type="checkbox" id="businessContext" name="businessContext" checked={this.props.businessContext} onChange={this.props.handleChangeMember} />

                                Упоминания в бизнес-контексте
                            </label>
                            <label>
                                <input type="checkbox" id="mainRole" name="mainRole" checked={this.props.mainRole} onChange={this.props.handleChangeMember}/>
                                Главная роль в публикации
                            </label>
                            <div className="member_form_main_checkboxes_disabled">
                                <label>
                                    <input type="checkbox" id="onlyWithRiskFactors" name="onlyWithRiskFactors" checked={this.props.onlyWithRiskFactors} onChange={this.props.handleChangeMember}/>

                                    Публикации только с риск-факторами

                                </label>
                            </div>
                            <div className="member_form_main_checkboxes_disabled">
                                <label>
                                    <input type="checkbox" id="includeTechNews" name="includeTechNews" checked={this.props.includeTechNews} onChange={this.props.handleChangeMember}/>
                                    Включать технические новости рынков
                                </label>
                            </div>
                            <label>
                                <input type="checkbox" id="includeAnnouncements" name="includeAnnouncements" checked={this.props.includeAnnouncements} onChange={this.props.handleChangeMember}/>
                                Включать анонсы и календари
                            </label>
                            <div className="member_form_main_checkboxes_disabled">
                                <label>
                                    <input type="checkbox" id="includeDigests" name="includeDigests" checked={this.props.includeDigests} onChange={this.props.handleChangeMember}/>
                                    Включать сводки новостей
                                </label>
                            </div>
                        </div>
                        <div className="member_form_btn_cont">
                            <button type="button" className="member_form_btn" disabled={!this.props.btnMemberEnabled} onClick={this.props.handleSubmit}>
                                Поиск
                            </button>
                            <div className="member_form_last_text ">
                                * Обязательные к заполнению поля
                            </div>
                        </div>

                    </form>
                    <div className="member_content_folders">
                        <img src="/img/folders.svg" width="100%" height="100%" alt="folders pic"/>
                    </div>
                    <div className="member_content_folders_pic">
                        <img src="/img/rocket.svg" width="100%" height="100%" alt="folders pic"/>
                    </div>
                    <div className="member_content_folders_pic_mobile">
                        <img src="/img/rocket.svg" width="100%" height="100%" alt="folders pic"/>
                    </div>
                </div>
            </>
        )
    }
}

class ApiMember extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnMemberEnabled: false,
            MsgInn: '',
            MsgDocQuant: '',
            MsgDatesStart: '',
            MsgDatesEnd: '',
            maxFullness: false,
            mainRole: false,
            businessContext: false,
            tonality: 'any',
            onlyWithRiskFactors: false,
            includeTechNews: false,
            includeAnnouncements: false,
            includeDigests: false,
            documentsCount: 10,
            errorMsgInn: false,
            errorMsgDocQuant: false,
            errorMsgDates: false,
            searchProcess: false,
            searchHistory: [],
            objIDSearch: [],

        };


    }

    handleChangeMember = (event) => {
        const {id, type, value, checked} = event.target;
        this.setState({
            [id]: type === "checkbox" ? checked : value
        });

        // начало проверки валидности инн
        if (id === 'inn' && /[^0-9]/.test(value)) {
            this.setState({errorMsgInn: true});
        } else if (id === 'inn' && (value.length === 10 || value.length === 12)) {
            const errorObj = {};
            const inntocheck = validateINN(value, errorObj);
            if (inntocheck) {
                this.setState({errorMsgInn: false});
            } else {
                this.setState({errorMsgInn: true});
            }
        }

        // проверка валидности количества
        if (id === 'doc_quant' && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 1000)) {
            this.setState({errorMsgDocQuant: true});
        } else if (id === 'doc_quant' && /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 1000) {
            this.setState({errorMsgDocQuant: false});
        }

        // проверка валидности даты daystart

        if (id === 'daystart' && !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            this.setState({ errorMsgDates: true });
        } else if (id === 'daystart' && /^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            const [dayStr, monthStr, yearStr] = value.split('.');
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);

            const inputDate = new Date(year, month - 1, day);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (inputDate <= currentDate) {
                // Добавляем ведущие нули
                const dayFormatted = day < 10 ? `0${day}` : `${day}`;
                const monthFormatted = month < 10 ? `0${month}` : `${month}`;
                const formattedDate = `${year}-${monthFormatted}-${dayFormatted}`;

                this.setState(
                    {
                        MsgDatesStart: formattedDate,
                        errorMsgDates: false
                    },

                );
            } else {
                this.setState(
                    { errorMsgDates: true },
                    this.checkErrors
                );
            }
        }


        // проверка валидности даты dayend

        if (id === 'dayend' && !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            this.setState({ errorMsgDates: true });
        } else if (id === 'dayend' && /^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            const [dayStr, monthStr, yearStr] = value.split('.');
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);

            const inputDate = new Date(year, month - 1, day);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (inputDate <= currentDate) {
                // Добавляем ведущие нули
                const dayFormatted = day < 10 ? `0${day}` : `${day}`;
                const monthFormatted = month < 10 ? `0${month}` : `${month}`;
                const formattedDate = `${year}-${monthFormatted}-${dayFormatted}`;

                this.setState(
                    {
                        MsgDatesEnd: formattedDate,
                        errorMsgDates: false
                    },
                    this.checkErrors
                );
            } else {
                this.setState(
                    { errorMsgDates: true },
                    this.checkErrors
                );
            }
        }


        // Функция проверки валидности ИНН
        function validateINN(inn, error) {
            let result = false;
            if (typeof inn === 'number') {
                inn = inn.toString();
            } else if (typeof inn !== 'string') {
                inn = '';
            }
            if (!inn.length) {
                error.code = 1;
                error.message = 'ИНН пуст';
            } else if (/[^0-9]/.test(inn)) {
                error.code = 2;
                error.message = 'ИНН может состоять только из цифр';
            } else if ([10, 12].indexOf(inn.length) === -1) {
                error.code = 3;
                error.message = 'ИНН может состоять только из 10 или 12 цифр';
            } else {
                var checkDigit = function (inn, coefficients) {
                    var n = 0;
                    for (var i in coefficients) {
                        n += coefficients[i] * inn[i];
                    }
                    return parseInt(n % 11 % 10);
                };
                switch (inn.length) {
                    case 10:
                        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if (n10 === parseInt(inn[9])) {
                            result = true;
                        }
                        break;
                    case 12:
                        var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                            result = true;
                        }
                        break;
                }
                if (!result) {
                    error.code = 4;
                    error.message = 'Неправильное контрольное число';
                }
            }
            return result;
        }
    }

// проверка отсутствия ошибок и включения кнопки
    checkErrors() {
        if (this.state.errorMsgInn === false &&
            this.state.errorMsgDocQuant === false &&
            this.state.errorMsgDates === false) {
            this.setState({btnMemberEnabled: true});
        } else {
            this.setState({btnMemberEnabled: false});
        }
    }





    // данные для API запроса



    handleSubmit = async (event) => {
    event.preventDefault();

    const URLHISTORY = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms'
        const URLOBJECTSEARCH = 'https://gateway.scan-interfax.ru/api/v1/objectsearch'
        const URLDOCSEARCH = 'https://gateway.scan-interfax.ru/api/v1/documents'
        const token = localStorage.getItem('accessToken');
    const apidata = {
        issueDateInterval: {
            startDate: `${this.state.MsgDatesStart}T00:00:00+03:00`,
            endDate: `${this.state.MsgDatesEnd}T23:59:59+03:00`
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: 'company',
                        sparkId: null,
                        entityId: null,
                        inn: this.state.inn,
                        maxFullness: this.state.maxFullness,
                        inBusinessNews: this.state.businessContext
                    }
                ],
                onlyMainRole: this.state.mainRole,
                tonality: this.state.tonality,
                onlyWithRiskFactors: this.state.onlyWithRiskFactors,
                riskFactors: {
                    and: [],
                    or: [],
                    not: []
                },
                themes: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            themesFilter: {
                and: [],
                or: [],
                not: []
            }
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: []
        },
        attributeFilters: {
            excludeTechNews: !this.state.includeTechNews,
            excludeAnnouncements: !this.state.includeAnnouncements,
            excludeDigests: !this.state.includeDigests
        },
        similarMode: "duplicates",
        limit: parseInt(this.state.doc_quant),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: [
            "totalDocuments",
            "riskFactors"
        ]
    }

    // вызов API истории
    const api_call_history = async () => {
        const { navigate } = this.props;
        try {
            this.props.setSearchProcess(true);
            const response = await axios.post(URLHISTORY, apidata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
            });


            this.props.setSearchHistory(response.data);
            navigate('/result');
        } catch (error) {

            this.props.setSearchProcess(false);
            this.props.setSearchHistory(error);
        }
    };
        // вызов API id
        const api_call_objectsearch = async () => {
            let tenIds = [];
            let restIds = [];
            try {
                const response_objectsearch = await axios.post(URLOBJECTSEARCH, apidata, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                });


                if (response_objectsearch.data.items.length > 10) {
                    tenIds = response_objectsearch.data.items.slice(0, 10);
                    restIds = response_objectsearch.data.items.slice(10);
                }
                else {
                    return response_objectsearch.data.items;
                }
                this.props.setIds(restIds);
                return tenIds;

            } catch (error) {
                console.error(error);
                this.props.setSearchProcess(false);
                return null;
            }
        };

        const api_call_docsearch = async (objData) => {
            if (!objData) {
                console.warn("ObjectsID или items не определены:", objData);
                return;
            }

            const docIds = objData.map(item => item.encodedId);

            try {
                const response_docsearch = await axios.post(
                    URLDOCSEARCH,
                    { ids: docIds },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                    }
                );


                this.props.setDocsearch(response_docsearch.data);

            } catch (error) {
                console.error(error);

            } finally {
                this.props.setSearchProcess(false);
            }
        };


    await api_call_history();


        const objData = await api_call_objectsearch();
        if (objData) {
            await api_call_docsearch(objData);
        }


    }



render()
    {
        return (
            <Memberzone
                btnMemberEnabled={this.state.btnMemberEnabled}
                MsgInn={this.state.inn}
                MsgDocQuant={this.state.doc_quant}
                MsgDatesStart={this.state.daystart}
                MsgDatesEnd={this.state.dayend}
                handleChangeMember={this.handleChangeMember}
                handleSubmit={this.handleSubmit}
                errorMsgInn={this.state.errorMsgInn}
                errorMsgDocQuant={this.state.errorMsgDocQuant}
                errorMsgDates={this.state.errorMsgDates}
                   />

        )
    }
}


function ApiMemberWrapper(props) {
    const navigate = useNavigate();
    return <ApiMember {...props} navigate={navigate} />;
}

export default ApiMemberWrapper;