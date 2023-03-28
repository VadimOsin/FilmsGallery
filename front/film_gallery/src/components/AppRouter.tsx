import { FC, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from './Auth/Routes';
import {IUser, UserContext} from "./Auth/UserContext/UserContext";

const AppRouter: FC = () => {
    const isAuth = false;

    const [user, setUser] = useState<IUser>({
        username: '',
        email: '',
        isAuth: false,
    });

    const login = (username: string, email: string) => {
        setUser({
            username,
            email: 'john@example.com',
            isAuth: true,
        });
    };

    const logout = () => {
        setUser({
            username: '',
            email: '',
            isAuth: false,
        });
    };
    return (
        <UserContext.Provider value={{...user, login, logout}}>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) =>
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
