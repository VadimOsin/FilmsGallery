export interface IUser {
    id: number;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN'; // This could be an enum instead of a string
}

export interface IComment {
    id: number;
    title: string;
    text: string;
    likes: number;
    user_id: number;
}

export interface IListFilm {
    id: number;
    comments_id: number;
}

export interface IStaff {
    id: number;
    nameru: string;
    nameen: string;
    description: string;
    posterurl: string;
    professiontext: string;
    professionkey: string;
}

export interface IBudget {
    id: number;
    type: string;
    amount: string;
    symbol: string;
}

export interface IFilm {
    id: number;
    nameru: string | null;
    nameen: string | null;
    nameoriginal: string;
    posterurlpreview: string;
    descriptions: string;
    ratingkinopoisk: string;
    year: number;
    type: string;
    ratingagelimits: string | null;
    filmlength: number;
    countries: string[]; // This could be an array of objects if there's more data to represent
    genres: string[]; // This could be an array of objects if there's more data to represent
}

export interface IUserMeta {
    id: number;
    name: string;
    surname: string ;
    img: string;
    user_meta_id: number;
}
