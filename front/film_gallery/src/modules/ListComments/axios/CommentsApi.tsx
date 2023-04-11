import {$authHost} from "../../Login/axios";

export const getAllComments = async () => {
    const {data} = await $authHost.get('api/comments/all')
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};

export const getOneComments = async (id: number) => {
    const {data} = await $authHost.get(`api/comments?id=${id}`)
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};

export const deleteComments = async (id: number) => {
    const {data} = await $authHost.delete(`api/comments?id=${id}`)
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};

export const newComments = async (title:string,text:string,likes:number,user_id:number) => {
    const {data} = await $authHost.post(`api/comments/`,{title,text,likes,user_id})
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};

export const updateComments = async (id:number,title:string,text:string,likes:number,user_id:number) => {
    const {data} = await $authHost.post(`api/comments/`,{id,title,text,likes,user_id})
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    return data
};