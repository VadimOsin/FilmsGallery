import React, {ChangeEvent, useContext, useState} from 'react';
import {IUser, UserContext} from "../Auth/UserContext/UserContext";
import './Login.css'
import {Link, useLocation,useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../Auth/utils/consts";
import {login, registration} from "./axios/UserApi";
import RedirectModal from "../../components/redirectModal/redirectModal";

const Login = () => {
    const location = useLocation()
    let navigate=useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {signIn} = useContext(UserContext);
    const [file, setFile] = useState<File | null>(null);
    const [reg, setReg] = useState({
        email: '',

        password: '',

        role: '',

        name: '',

        surname: ''
    });

    const [modal, setModal] = useState({
        title: '',
        text: '',
        isOpen: false
    })
    const handleCloseModal = () => {
        setModal({...modal, isOpen: false});
    };

    const onReset = () => {
        setReg({
            email: '',

            password: '',

            role: '',

            name: '',

            surname: ''
        })
        setFile(null)
    };
    const onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setReg({...reg, [name]: value})
    };
    const isEmailValid = (email: string) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };
    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }
    const authClick = async () => {
        if (!isLogin) {

            if (!reg.email || !isEmailValid(reg.email)) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите корректный email", isOpen: true});
                return;
            }
            if (!reg.password || reg.password.length < 8 || reg.password.length > 12) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите пароль от 8 до 12 символов", isOpen: true});
                return;
            }
            if (!reg.name || reg.name.length < 2) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите имя (минимум 2 символа)", isOpen: true});
                return;
            }
            if (!reg.surname || reg.surname.length < 2) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите фамилию (минимум 2 символа)", isOpen: true});
                return;
            }
            if (!file) {
                setModal({title: 'Ошибка при регистрации!', text: "Загрузите фото", isOpen: true});
                return;
            }
        }

        let data
        if (isLogin) {
            data = await login(reg.email, reg.password)
                .catch(
                    error => {
                        setModal({
                            title: 'Повторите попытку',
                            text: `${error.message}`,
                            isOpen: true
                        });
                    }
                ) as IUser;
            signIn(data.email, data.password, data.role, data.name, data.surname, data.img)
            setModal({
                title: 'Вход выполнен!',
                text: "Подождите вас перенаправит на главную страницу",
                isOpen: true
            });
            setTimeout(()=>{
                setModal({
                    title: 'Вход выполнен!',
                    text: "Подождите вас перенаправит на главную страницу",
                    isOpen: false
                });
            },1000)
            navigate("/")
        } else {
            const formData = new FormData()
            formData.append('email', reg.email)
            formData.append('password', reg.password)
            formData.append('role', 'USER')
            formData.append('name', reg.name)
            formData.append('surname', reg.surname)
            if (file) {
                formData.append('img', file);
            }
            data = await registration(formData).catch(
                error => {
                    setModal({
                        title: 'Повторите попытку',
                        text: `${error.message}`,
                        isOpen: true
                    });
                }
            ) as IUser;
            signIn(data.email, data.password, data.role, data.name, data.surname, data.img)
            setModal({
                title: 'Регистрация прошла успешно!',
                text: "Подождите вас перенаправит на главную страницу",
                isOpen: true
            });
            setTimeout(()=>{
                setModal({
                    title: 'Регистрация прошла успешно!',
                    text: "Подождите вас перенаправит на главную страницу",
                    isOpen: false
                });
            },1000)
            navigate("/")
        }

    };


    return (
        <div className='auth'>
            <div className='auth__item'>
                <div className="login__field">
                    <input type="email" className="login__input" name='email' value={reg.email} onChange={onChange}
                           placeholder='Email' required/>
                </div>
                <div className="login__field">
                    <input type="password" className="login__input" name='password' value={reg.password}
                           onChange={onChange} placeholder='Password' required min={8} max={12}/>
                </div>
                {
                    isLogin ? '' : <div>
                        <div className="login__field">
                            <input type="name" className="login__input" name="name" value={reg.name}
                                   onChange={onChange} placeholder='Name' required min={2}/>
                        </div>
                        <div className="login__field">
                            <input type="surname" className="login__input" name="surname" value={reg.surname}
                                   onChange={onChange} placeholder='Surname' required min={2}/>
                        </div>
                        <div className="login__field">
                            <input type="file" className="login__input" name="img" multiple
                                   accept="image/*,image/jpeg" onChange={selectFile} placeholder='File' required/>
                        </div>
                    </div>
                }
                <div className='login__btn'>
                    <button className="button login__submit" onClick={authClick}>
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
                }
                </span>
            </div>

            <RedirectModal
                title={modal.title}
                children={modal.text}
                isOpen={modal.isOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Login;