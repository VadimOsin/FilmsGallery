import  { createContext } from 'react';
export interface IUser {
    email: string;

    password:string;

    role:string;

    name:string;

    surname:string;

    img:string;
    isAuth: boolean;
}
export interface IUserContextType extends IUser {
    signIn: (email: string, password: string, role: string, name: string, surname: string, img: string) => void;
    logOut: () => void;
}

export const UserContext = createContext<IUserContextType>({
    email: '',

    password:'',

    role:'',

    name:'',

    surname:'',

    img:'',

    isAuth: false,

    signIn: () => {},

    logOut: () => {},
});