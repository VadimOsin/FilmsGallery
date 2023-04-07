import {$host} from "../../Login/axios";
import {IFilm} from "../../../global/types/types";

interface IGetAllFilms {
    page: number,
    limit: number,
    category: string,
    ratingTo: number,
    year: string,
    keyword: string
}

export const getFilms = async ({page, limit, category, ratingTo, year, keyword}: IGetAllFilms) => {
    const {data} = await $host.get(`api/film/all?page=${page}&limit=${limit}&category=${category}&ratingTo=${ratingTo}&${year}&keyword=${keyword}`).catch(
        error => {
            throw new Error(error.response.data.message);
        }
    );
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

