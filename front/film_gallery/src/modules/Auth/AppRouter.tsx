import React, {FC, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from './Routes';
import {IUser, UserContext} from "./UserContext/UserContext";
import Navbar from "../../components/NavBar/Navbar";
import {check} from "../Login/axios/UserApi";
import Spinner from "../../components/Spinner/Spinner";

const AppRouter: FC = () => {

    const [user, setUser] = useState<IUser>({
        email: '',

        password: '',

        role: '',

        name: '',

        surname: '',

        img: '',

        isAuth: false
    });

    const signIn = (email: string, password: string, role: string, name: string, surname: string, img: string) => {
        setUser({
            email: email,

            password: password,

            role: role,

            name: name,

            surname: surname,

            img: img,

            isAuth: true,
        });
    };

    const logOut = () => {
        setUser({
            email: '',

            password: '',

            role: '',

            name: '',

            surname: '',

            img: '',

            isAuth: false,
        });
    };

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then((response) => {
                let data = response as IUser
                signIn(data.email, data.password, data.role, data.name, data.surname, data.img)
            }).finally(() => setLoading(false))
        }, 1000)
    }, [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <UserContext.Provider value={{...user, signIn, logOut}}>
            <Navbar/>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path="*" element={<div>NotFound</div>}/>
            </Routes>
        </UserContext.Provider>
    );
};

export default AppRouter;
