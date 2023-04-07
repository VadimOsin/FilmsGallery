import React, {useEffect, useState} from 'react';
import FilmItem from "../../components/FilmItem/FilmItem";
import './ListFilm.css'
import {getFilms} from "./axios/filmsApi";
import {IFilm} from "../../global/types/types";
import Pagination from "../../components/Pagination/Pagination";
import YearSelect from "../../components/YearSelect/YearSelect";
import RatingSelect from "../../components/RatingSelect/RatingSelect";
import SearchWorlds from "../../components/SecrchWorlds/SearchWorlds";
import Spinner from "../../components/Spinner/Spinner";

const ListFilm = () => {
        let date = new Date().getFullYear()
        const [films, setFilms] = useState<IFilm[]>([])
        const [pages, setPages] = useState(1)
        const [year, setYear] = useState(`&yearFrom=1500&yearTo=${date}`)
        const [rating, setRating] = useState(10)
        const [str, setStr] = useState('')
        const [totalPages, setTotalPages] = useState(5)
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            setLoading(true)
            setTimeout(() => {
                getFilms({
                    page: pages,
                    limit: 12,
                    category: "ALL",
                    ratingTo: rating,
                    year: year,
                    keyword: str
                }).then((response) => {
                    setFilms(response.films)
                    setTotalPages(response.totalPages)
                }).finally(() => setLoading(false))
            }, 1000)
        }, [year, rating, pages, str])


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
                <div className="filmList__sort">
                    <SearchWorlds str={str} setStr={setStr} setPages={setPages}/>
                    <YearSelect date={date} setYear={setYear} setPages={setPages}/>
                    <RatingSelect setRating={setRating} setPages={setPages}/>
                </div>
                {loading ? (
                        <Spinner/>
                ) : (
                    <>
                        <div className='filmList'>
                            {films?.map((film) => (
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
                                    nameru={film.nameru}
                                />
                            ))}
                        </div>
                        <Pagination active={pages} setPage={setPages} totalPages={totalPages} />
                    </>
                )}
            </>
        );
    }
;

export default ListFilm;