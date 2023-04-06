import {ADMIN_ROUTE, FILM_ROUTE, FILMS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "../../pages/Auth";
import Film from "../../pages/Film";
import FilmById from "../FilmById/FilmById";

export const authRoutes = [
    {
        path: FILMS_ROUTE,
        Component: Film
    }
]

export const publicRoutes = [
    {
        path: FILMS_ROUTE,
        Component: Film
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: FILM_ROUTE+ '/:id',
        Component: FilmById
    }
]