import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_FILMS
});

const Interceptor = (config:any) => {
    config.headers['X-API-KEY'] = process.env.REACT_APP_API_KEY;
    config.headers['Content-Type'] = 'application/json';
    return config
}

instance.interceptors.request.use(Interceptor)

export {
    instance
}