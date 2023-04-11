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
import SwitchView from "../../components/SwitchView/SwitchView";

const ListFilm = () => {
        let date = new Date().getFullYear()
        const [films, setFilms] = useState<IFilm[]>([])
        const [pages, setPages] = useState(1)
        const [year, setYear] = useState(`&yearFrom=1500&yearTo=${date}`)
        const [rating, setRating] = useState(10)
        const [str, setStr] = useState('')
        const [totalPages, setTotalPages] = useState(5)
        const [loading, setLoading] = useState(true)
        const [switchView, setSwitchView] = useState(false)
    const [deleted, setDeleted] = useState(false)
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
        }, [year, rating, pages, str,deleted])

        return (<>
                <div className="filmList__sort">
                    <SearchWorlds str={str} setStr={setStr} setPages={setPages}/>
                    <YearSelect date={date} setYear={setYear} setPages={setPages}/>
                    <RatingSelect setRating={setRating} setPages={setPages}/>
                    <SwitchView switchView={switchView} setSwitchView={setSwitchView}/>
                </div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <>
                        <div className={switchView?'column__filmList':'filmList'}>
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
                                    switchView={switchView}
                                    setDeleted={setDeleted}
                                />
                            ))}
                        </div>
                        <Pagination active={pages} setPage={setPages} totalPages={totalPages}/>
                    </>
                )}
            </>
        );
    }
;

export default ListFilm;