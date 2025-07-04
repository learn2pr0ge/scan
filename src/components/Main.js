import * as React from 'react';
import "../styles/styles_main.css";
import {useNavigate} from "react-router-dom";

function Main({isAuthenticated}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/memberzone');
    }
    return (
        <main>
            <div className="main-content" id="main">
                <h1 className="main-block__title">сервис по поиску<br/> публикаций <br/>о компании <br/>по его ИНН</h1>
                <div className="main-block__desc">Комплексный анализ публикаций, получение данных<br/> в формате PDF на
                    электронную почту.
                </div>
                { isAuthenticated && (<div className="main-block__btn">
                    <button className="main-block__btn-text" onClick={handleClick}>Запросить данные</button>
                </div>)}

            </div>

            <div className="main-block__img">
                <img src="/img/main-bg.png" width="100%" height="100%" alt="Main image"/>
            </div>

        </main>


);

}

export default Main;