import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (user: any) => {
    try {
        const {data} = await $host.post('api/user/registration', user);
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token)
    } catch (error) {
        throw new Error('Ошибка при регистрации пользователя!'); // Выбрасываем новую ошибку
    }
};

export const login = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
};


export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        throw new Error('Автаризуйтесь снова!'); // Выбрасываем новую ошибку
    }
};
