import { FC, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from './Routes';
import {IUser, UserContext} from "./UserContext/UserContext";

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

            password:'',

            role:'',

            name:'',

            surname:'',

            img:'',

            isAuth: false,
        });
    };


    return (
        <UserContext.Provider value={{...user, signIn, logOut}}>
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
