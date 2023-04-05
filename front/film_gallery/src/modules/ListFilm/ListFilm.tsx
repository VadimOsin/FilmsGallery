import React, {useEffect, useState} from 'react';
import FilmItem from "../../components/FilmItem/FilmItem";
import './ListFilm.css'
import {addFilm, getFilmById, getFilms} from "./axios/filmsApi";
import {IFilm} from "../../global/types/types";
import Pagination from "../../components/Pagination/Pagination";

const ListFilm = () => {
        const [films, setFilms] = useState<IFilm[]>([])
        const [pages,setPages] = useState(1)
        useEffect(() => {
            getFilms().then((response) => {
                setFilms(response)
            })
        }, [])

        // useEffect  (() => {
        // const film: IFilm = {
        //     id: fil?.kinopoiskId ?? Math.floor(Math.random() * 1000000),
        //     nameru: fil?.nameRu ?? "",
        //     nameen: fil?.nameEn ?? "",
        //     nameoriginal: fil?.nameOriginal ?? "",
        //     posterurlpreview: fil?.posterUrlPreview ?? "",
        //     descriptions: fil?.description ?? "",
        //     ratingkinopoisk: fil?.ratingKinopoisk ?? 0,
        //     year: fil?.year ?? 0,
        //     type: fil?.type ?? "",
        //     ratingagelimits: fil?.ratingAgeLimits ?? "",
        //     filmlength: fil?.filmLength ?? 0,
        //     countries: fil?.countries?.map(country => country?.country) ?? [],
        //     genres: fil?.genres?.map(genre => genre?.genre) ?? []
        // };

        //}, [fil]);
        const newFilm = async () => {
            // try {
            //
            //     // console.log(films)
            //     for (let i = 0; i < 20; i++) {
            //         let ID = films[i].kinopoiskId;
            //
            //         await getFilmById(ID).then(resp => {
            //                 setFil(resp)
            //             }
            //         ).catch(e => console.log(e.response.data.message))
            //
            //     }
            // } catch
            //     (error) {
            //     console.error(error);
            // }
        }
        return (<>
                <div className='filmList'>
                    {Array.isArray(films) && films.map((film) =>
                        <FilmItem
                            key={film.id}
                            id={film.id}
                            nameoriginal={film.nameoriginal}
                            posterurlpreview={film.posterurlpreview}
                            ratingkinopoisk={film.ratingkinopoisk}
                            year={film.year}
                            genres={film.genres}
                            countries={film.countries}
                            type={film.type}
                            filmlength={film.filmlength}
                            ratingagelimits={film.ratingagelimits}
                            descriptions={film.descriptions}
                            nameen={film.nameen}
                            nameru={film.nameru}/>
                    )}
                </div>
                <Pagination active={pages} setPage={setPages} totalPages={5}/>
            </>
        );
    }
;

export default ListFilm;