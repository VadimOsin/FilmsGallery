import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './FilmById.css'
import {getFilmById} from "./axios/filmByIdApi";
import {IFilm} from "../../global/types/types";
import ManipulationsBtn from "../../components/manipulationsBTN/ManipulationsBtn";
import {UserContext} from "../Auth/UserContext/UserContext";
import ListComments from "../ListComments/ListComments";

type QuizParams = {
    id: string;
};
const FilmById = () => {
    const {id} = useParams<QuizParams>();
    const [film, setFilm] = useState<IFilm>()
    const [checkedValue, setCheckedValue] = useState<Number>(0);
    const rating = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
    const user = useContext(UserContext);
    useEffect(() => {
        if (id) {
            getFilmById(id).then(response => {
                setFilm(response)
                setCheckedValue(Math.round(response.ratingkinopoisk * 2) / 2)
            }).catch(error => console.log(error))
        }
    }, [])


    return (
        <>
            <div className="movie-card">
                <div className="container">
                    {user.role === 'ADMIN' ? <ManipulationsBtn id={parseInt(id ?? "")}/> : ""}
                    <img
                        src={film?.posterurlpreview.startsWith('http') ? film?.posterurlpreview : `${process.env.REACT_APP_API_URL}${film?.posterurlpreview}`}
                        alt="cover"
                        className="cover"/>
                    <div className="hero">
                        <div className="details">
                            <div className="title1">{film?.nameoriginal}</div>
                            <div className="title2">{film?.nameru ? film.nameru : film?.nameen}</div>
                            <fieldset className="rating">
                                {
                                    rating.reverse().map((value, index) =>
                                        <React.Fragment key={index}>
                                            <input
                                                type="radio"
                                                id={value % 1 === 0 ? `star${value}` : `star${value}half`}
                                                name="rating"
                                                value={value % 1 === 0 ? `${value}` : `${value} and a half`}
                                                checked={checkedValue === value}
                                                onChange={() => setCheckedValue(value)}
                                            />
                                            <label
                                                className={value % 1 === 0 ? `full` : `half`}
                                                htmlFor={value % 1 === 0 ? `star${value}` : `star${value}half`}
                                            ></label>
                                        </React.Fragment>
                                    )
                                }


                            </fieldset>
                            <span className="likes">109 likes</span>
                        </div>
                    </div>

                    <div className="description">

                        <div className="column1">
                            {film?.genres.map((genre) =>
                                <span key={genre} className="tag">{genre}</span>
                            )}
                            {film?.countries.map((country) =>
                                <span key={country} className="tag">{country}</span>
                            )}
                        </div>

                        <div className="column2">

                            <p>{film?.descriptions}</p>

                            <div className="avatars">

                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar1.png"
                                     alt="avatar1"/>


                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar2.png"
                                     alt="avatar2"/>


                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar3.png"
                                     alt="avatar3"/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ListComments/>
        </>
    );
};

export default FilmById;