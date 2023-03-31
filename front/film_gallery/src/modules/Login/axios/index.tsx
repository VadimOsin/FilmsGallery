import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

interface InternalAxiosRequestConfig<T = any> extends AxiosRequestConfig {
    headers: AxiosRequestHeaders;
}

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config)
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
