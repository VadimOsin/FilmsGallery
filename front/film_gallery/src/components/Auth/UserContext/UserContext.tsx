import React, { createContext } from 'react';
export interface IUser {
    username: string;
    email: string;
    isAuth: boolean;
}
export interface UserContextType extends IUser {
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    username: '',
    email: '',
    isAuth: false,
    login: () => {},
    logout: () => {},
});