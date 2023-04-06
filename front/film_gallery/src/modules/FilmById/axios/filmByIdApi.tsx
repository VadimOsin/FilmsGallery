import {$host} from "../../Login/axios";



export const getFilmById = async (id: string) => {
    const {data} = await $host.get(`api/film/${id}`).catch((error) => {
            throw new Error(error.response.data.message);
        }
    )
    return data;
}