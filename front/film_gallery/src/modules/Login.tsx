import React, {ChangeEvent, useContext, useState} from 'react';
import {UserContext} from "../components/Auth/UserContext/UserContext";
import './Auth.css'
import {Link, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../components/Auth/utils/consts";

const Login = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const user = useContext(UserContext);

    const [reg, setReg] = useState({
        email: '',

        password: '',

        role: '',

        name: '',

        surname: '',

        img: '',
    });

    const onReset = () => {
        setReg({
            email: '',

            password: '',

            role: '',

            name: '',

            surname: '',

            img: '',
        })
    };
    const onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setReg({...reg, [name]: value})
    };
    return (
        <div className='auth'>
            <div className='auth__item'>
                <div className="login__field">
                    <input type="text" className="login__input" name='email' value={reg.email} onChange={onChange}/>
                </div>
                <div className="login__field">
                    <input type="password" className="login__input" name='password' value={reg.password}
                           onChange={onChange}/>
                </div>
                {
                    isLogin ? '' : <div>
                        <div className="login__field">
                            <input type="name" className="login__input" name="name" value={reg.name}
                                   onChange={onChange}/>
                        </div>
                        <div className="login__field">
                            <input type="surname" className="login__input" name="surname" value={reg.surname}
                                   onChange={onChange}/>
                        </div>
                        <div className="login__field">
                            <input type="file" className="login__input" name="img" value={reg.img} multiple
                                   accept="image/*,image/jpeg" onChange={onChange}/>
                        </div>
                    </div>
                }
                <div className='login__btn'>
                    <button className="button login__submit">
                        <span className="button__text">{isLogin ? 'Войти' : "Зарегистрироваться"} </span>
                    </button>
                    <button className="button login__reset" onClick={onReset}>
                        <span className="button__text">Очистить</span>
                    </button>
                </div>
                <span className="button__text">
                {isLogin ?
                    <div>
                        Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                    </div>
                }</span>

            </div>
        </div>
    );
};

export default Login;