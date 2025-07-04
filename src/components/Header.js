import * as React from 'react';
import "../styles/styles_main.css";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function Header({isAuthenticated}) {

        const navigate = useNavigate();

        const token = localStorage.getItem('accessToken');
        const expDateString = localStorage.getItem('expiresIn');
        const expDate = new Date(expDateString).getTime();
        const [data, setData] = useState(null);
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {if (token && expDate && expDate > Date.now()) {
            apiCall();

        } }, [token, expDate]);




        const handleClick = () => {
            navigate('/login');

        }
        const handleClickEnter = () => {
            setIsMobile(false);
            navigate('/login');
        }

        const handleClickMain = () => {
            setIsMobile(false);
            navigate('/');
        }

        const handleClickLogout = () => {
            setAuthenticated(false);
        }

    const apiCall = async () => {
        try {

            const response = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'

                }
            });
            console.log(response.data);
            setData(response.data.eventFiltersInfo);
        } catch (error) {
            console.error(error);
            setAuthenticated(false);
        }
    };


    const handleClickMobile = () => {
        setIsMobile(true);
    }


    const handleClickMobileClose = () => {
        setIsMobile(false);
    }






    return (
        <header>
            <div className="header-logo">
                <img src="/img/scan_logo.png" alt="Company logo" width="141" height="141" />
            </div>
            <nav>
                <Link to={'/'}>Главная</Link>
                <a href="#tarrifs">Тарифы</a>
                <a href="#">FAQ</a>
            </nav>
            { !isAuthenticated && (<div className="header-reg">
                    <span className="register" style={{ opacity: 0.4 }}>Зарегистрироваться</span>
                    <div className="divider"></div>
                    <button className="login-btn" onClick={ handleClick }><span>Войти</span></button> </div> ) }

                { isAuthenticated && (<>
                    <div className="header-reg-auth">
                    <div className="header-reg-auth-text"><p>Использовано компаний  <span style= {{fontSize: 14, color: '#000000', fontWeight: 'bold'}}>{data.usedCompanyCount}</span></p>
                        <p>Лимит по компаниям <span style= {{fontSize: 14, color: '#8AC540', fontWeight: 'bold'}}>{data.companyLimit}</span></p>

                    </div>

                </div>

                    <div className="header-reg-auth-avatar-cont">
                        <div className="header-reg-auth-avatar-text">Алексей А.</div>
                        <div className="header-reg-auth-avatar-text1">
                            <Link to={'/'} onClick={ handleClickLogout }>Выйти</Link>
                        </div>
                        <div className="header-reg-face">
                            <img src="/img/face.png" alt="Face" width="32" height="32" />
                        </div>
                    </div>
                    </>
                    )}


            <div className="header-reg-mobile">
                <button className="hamburger" onClick={ handleClickMobile }>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            {isMobile && (
            <div className="fullscreen-overlay">
                <div className="logo_block">
                <div className="logo_white">
                    <img src="/img/logo_white.png" alt="Company logo" width="111" height="111" />
                </div>
                  <div className="mobile-close-cross">

                    <button className="mobile-close" onClick={ handleClickMobileClose }><img src="/img/cross.svg" alt="Close" width="24" height="24" /></button>
                  </div>
                </div>
                <div className="mobile-main-cont-block">
                <div className="mobile-main-cont-block_text"><p> <Link to={'/'} onClick={ handleClickMain }>Главная</Link></p>
                    <p><a href="#tarrifs">Тарифы</a></p>
                    <p><a href="#">FAQ</a></p>


                </div>
                    <div className="mobile-main-cont-block_text_reg">
                        Зарегистрироваться
                    </div>
                    <button className="mobile-main-enter-btn" onClick={ handleClickEnter }>
                        <div className="mobile-main-enter-btn_text">
                        Войти
                        </div>
                    </button>
                    </div>
                </div>

            )}
        </header>
    );
}

export default Header;