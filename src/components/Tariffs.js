import React from 'react';

function Tariffs() {
    return (
        <>
            <div className="mainperson_image_block">
                <div className="mainperson_image_image">
                    <img src="/img/person.png" width="100%" height="100%" alt="Main person"/>
                </div>
                <div className="mainperson_image_svg">
                    <div className="mainperson_image_svg1">
                        <img src="/img/main_img.svg" width="100%" height="100%" alt="Main person"/>
                    </div>
                    <div className="mainperson_image_svg2">
                        <img src="/img/main_img_1.svg" width="100%" height="100%" alt="Main person"/>
                    </div>
                </div>
            </div>

            <div className="tarrifs-text" id="tarrifs">
                наши тарифы
            </div>

            <div className="tarrifs-block__wrap">
                <div className="tarrifs-block__main">
                    <div className="tarrifs-block__card tarrifs-block__card__current">
                        <div className="tarrifs-block__card__header">
                            <div className="tarrifs-block__card__header_text">Beginner</div>
                            <div className="tarrifs-block__card__header_text1">Для небольшого исследования</div>
                            <div className="tarrifs-block__card__header_bulb_icon">
                                <img src="/img/bulb_icon.png" width="100%" height="100%" alt="Bulb icon"/>
                            </div>
                        </div>


                        <div className="tarrifs-block__card__price">
                            <div className="current_price_wrapper1">
                                <div className="current_price_text">799 &#8381;</div>
                                <div className="current_price_text1">1 200 &#8381; </div>
                                <div className="current_price_icon">
                                    <img src="/img/rectangle_tarif.svg" width="134" height="24"
                                         alt="Current price icon"/>
                                    <div className="current_price_icon_text">
                                        Текущий тариф
                                    </div>
                                </div>

                            </div>
                            <div className="current_price_text2_2">
                                или 150 &#8381/мес. при рассрочке на 24 мес.
                            </div>
                            <div className="current_price_text3">
                                В тариф входит:
                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Безлимитная история запросов
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Безопасная сделка
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Поддержка 24/7
                                </div>


                            </div>


                            <div className="current_price_memberzone_btn1">
                                <button className="current_price_memberzone_btn_text">
                                    <img src="/img/tarrif_btn_blue.png" width="100%" height="100%"
                                         alt="Memberzone icon"/>
                                    <div className="current_price_icon_text_btn">
                                        Подробнее
                                    </div>
                                </button>
                            </div>




                        </div>

                    </div>


                    <div className="tarrifs-block__card1 ">
                        <div className="tarrifs-block__card__header1 ">
                            <div className="tarrifs-block__card__header_text">Pro</div>
                            <div className="tarrifs-block__card__header_text1">Для HR и фрилансеров</div>
                            <div className="tarrifs-block__card__header_bulb_icon">
                                <img src="/img/arrow_icon.png" width="93" height="103" alt="Bulb icon"/>
                            </div>
                        </div>


                        <div className="tarrifs-block__card__price">

                            <div className="current_price_wrapper current_price_wrapper_margin">

                                <div className="current_price_text current_price_text_margin">1 299 &#8381;</div>
                                <div className="current_price_text1 current_price_text_margin">2 600 &#8381; </div>
                                <div className="current_price_icon">

                                    <div className="current_price_icon_text">
                                        Текущий тариф
                                    </div>
                                </div>


                            </div>
                            <div className="current_price_text2">
                                или 279 &#8381/мес. при рассрочке на 24 мес.
                            </div>
                            <div className="current_price_text3">
                                В тариф входит:
                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Все пункты тарифа Beginner
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Экспорт истории
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Рекомендации по приоритетам
                                </div>


                            </div>
                            <div className="current_price_memberzone_btn1">
                                <button className="current_price_memberzone_btn_text">
                                    <img src="/img/tarrif_btn_blue.png" width="100%" height="100%"
                                         alt="Memberzone icon"/>
                                    <div className="current_price_icon_text_btn">
                                        Подробнее
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>



                    <div className="tarrifs-block__card2 ">
                        <div className="tarrifs-block__card__header1 tarrifs-block__card__header1_color ">
                            <div
                                className="tarrifs-block__card__header_text tarrifs-block__card__header_text_color">Business
                            </div>
                            <div
                                className="tarrifs-block__card__header_text1 tarrifs-block__card__header_text_color">Для
                                корпоративных клиентов
                            </div>
                            <div className="tarrifs-block__card__header_bulb_icon">
                                <img src="/img/note_icon.png" width="93" height="103" alt="Bulb icon"/>
                            </div>
                        </div>


                        <div className="tarrifs-block__card__price">

                            <div className="current_price_wrapper current_price_wrapper_margin">

                                <div className="current_price_text current_price_text_margin">2 379 &#8381;</div>
                                <div className="current_price_text1 current_price_text_margin">3 700 &#8381; </div>
                                <div className="current_price_icon">

                                    <div className="current_price_icon_text">
                                        Текущий тариф
                                    </div>
                                </div>


                            </div>
                            <div className="current_price_text2 current_price_text2_margin">

                            </div>
                            <div className="current_price_text3">
                                В тариф входит:
                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Все пункты тарифа Pro
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Безлимитное количество запросов
                                </div>

                            </div>
                            <div className="current_price_text_ok_icon">
                                <img src="/img/ok_icon.png" width="20" height="20" alt="OK icon"/>
                                <div className="current_price_text_ok_text">
                                    Приоритетная поддержка
                                </div>


                            </div>
                            <div className="current_price_memberzone_btn2 current_price_memberzone_btn_margin">
                                <button className="current_price_memberzone_btn_text">
                                    <img src="/img/tarrif_btn_blue.png" width="100%" height="100%"
                                         alt="Memberzone icon"/>
                                    <div className="current_price_icon_text_btn">
                                        Подробнее
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Tariffs;