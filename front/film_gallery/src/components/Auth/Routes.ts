import {ADMIN_ROUTE, FILM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "../../pages/Auth";

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]