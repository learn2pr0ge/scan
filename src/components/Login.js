import * as React from 'react';
import "../styles/login.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';


class Login extends React.Component {
    render() {

        return(
            <>
                <div className="login_fullpage">
                <div className="login_wrapper">
                    <div className="login_main_text_wrapper">
                        <div className="login_main_text">
                            <h1>для оформления подписки на тариф, необходимо авторизоваться.</h1>
                        </div>
                    </div>
                    <div className="login_main_pic_wrapper">
                        <img src="/img/login_main.svg" width="100%" height="100%" alt="login main pic"/>
                    </div>
                    <div className="login_placeholder_wrapper">
                        <div className="login_lock">
                            <img src="/img/login_lock.svg" width="100%" height="100%" alt="login lock"/>
                        </div>
                        <div className="login_main_placeholder">
                            <div className="login_main_placeholder_text_cont">
                                <div className="login_main_placeholder_text_enter">
                                    Войти
                                    <hr className="hover-line"/>
                                </div>
                                <div className="login_main_placeholder_text_reg">
                                    Зарегистрироваться
                                    <hr className="hover-line1"/>
                                </div>

                            </div>
                            <div className="login_form">
                                <form className="login-form1" onSubmit={this.props.handleSubmit}>
                                    <div className={`login-input-group ${this.props.errorMessagePhone ? 'error' : ''}`}>
                                        <label htmlFor="login-user" className="login-label">Логин или номер
                                            телефона:</label>
                                        <input id="user" type="text" className="login-input" placeholder="Введите логин или телефон" autoComplete="on" onChange={this.props.handleChange} value={this.props.user}/>
                                    </div>
                                    { this.props.errorMessagePhone && ( <div className="login-error-message-phone">Введите корректные данные</div>)}
                                    <div className={`login-input-group ${this.props.errorMessagePass ? 'error' : ''}`}>

                                        <label htmlFor="login-pass" className="login-label"> Пароль</label>
                                        <input id="password" type="password" className="login-input"
                                               placeholder="Введите пароль" autoComplete="on" onChange={this.props.handleChange} value={this.props.password}/>
                                    </div>
                                    { this.props.errorMessagePass && ( <div className="login-error-message-pass">Неправильный пароль</div>)}
                                    <button type="submit" className="login-btn__1" disabled={!this.props.btnEnabled}>
                                        <span>Войти</span>
                                    </button>
                                    <div className="login-recover-password">
                                        <a href="#recover">Восстановить пароль</a>
                                    </div>
                                </form>

                                <div className="login-social-block">
                                    <div className="login-social-block-text">
                                        Войти через:
                                    </div>
                                    <div className="login-social-block-icons">
                                        <a href="https://www.google.com"><img src="/img/google.svg" width="100%"
                                                                              height="100%" alt="Google"/></a>
                                        <a href="https://www.facebook.com"><img src="/img/facebook_good.svg"
                                                                                width="100%"
                                                                                height="100%" alt="Facebook"/></a>
                                        <a href="https://www.yandex.com"><img src="/img/yandex.svg" width="100%"
                                                                              height="100%" alt="Yandex"/></a>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                <div className="main_pic_mobile">
                    <img src="/img/login_main.svg" width="100%" height="100%" alt="login main pic"/>
                </div>
                </div>
            </>
        );
    }
}

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            btnEnabled: false,
            accessToken: null,
            expiresIn: null,
            user: '',
            password: '',
            errorMessagePass: false,
            errorMessagePhone: false,

        }
    }

    handleChange = (event) => {
        const {id, value} = event.target;
        this.setState({
            btnEnabled: true,
            [id]: value
        })
        /* Валидация телефона */
        if (id === 'user' && value.startsWith('+')) {
           this.checkPhone(value);
        }
    }

    checkPhone = (value) => {
        const digitsOnly = value.slice(1);
        if (digitsOnly.length > 0 && !/^\d+$/.test(digitsOnly)) {
            this.setState({ errorMessagePhone: true });
        } else {
            this.setState({ errorMessagePhone: false });
        }

    }



    handleSubmit = (event) => {
        event.preventDefault();
        const { user, password } = this.state;
        const URL = 'https://gateway.scan-interfax.ru/api/v1/account/login'

        const api_call = async () => {
            try {
                const response = await axios.post(URL, {
                    login: user,
                    password: password
                });

                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('expiresIn', response.data.expire);
                this.setState({ isAuthenticated: true });
                this.props.setAuthenticated(true);



            } catch (error) {
                /* Если еррор то пароль не подходит */
                this.setState( { errorMessagePass: true} );

            }
        };

        api_call();

    }
    render() {
        if (this.state.isAuthenticated) {
            return <Navigate to="/memberzone" />;
        }
        return (
            <Login
                user={this.state.user}
                password={this.state.password}
                btnEnabled={this.state.btnEnabled}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                errorMessagePhone={this.state.errorMessagePhone}
                errorMessagePass={this.state.errorMessagePass}

            />
        );
    }
}

export default Api;

