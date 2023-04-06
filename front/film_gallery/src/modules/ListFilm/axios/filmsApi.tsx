import {$host} from "../../Login/axios";
import {IFilm} from "../../../global/types/types";

export const getFilms = async () => {
    const {data} = await $host.get(`api/film/all`)
    return data;
}
export const addFilm = async (film: IFilm): Promise<IFilm> => {
    const {data} = await $host.post('api/film', {film})
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};

