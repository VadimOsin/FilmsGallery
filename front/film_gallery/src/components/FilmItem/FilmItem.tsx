import React, {useContext} from 'react';
import './FilmItem.css'
import {useNavigate} from "react-router";
import {UserContext} from "../../modules/Auth/UserContext/UserContext";
import {IFilm} from "../../global/types/types";

const FilmItem: React.FC<IFilm> = ({
                                       id,
                                       nameoriginal,
                                       posterurlpreview,
                                       year,
                                       genres,
                                       countries,
                                       ratingkinopoisk,
                                       nameen,
                                       nameru,
                                       ratingagelimits,
                                       descriptions,
                                       type,
                                       filmlength
                                   }) => {
    const user = useContext(UserContext);
    let navigate = useNavigate()
    return (<div className="filmItem">
            {user.role === 'ADMIN' ? <div className="filmItem__manipulations">
                <div className="filmItem__add manipulations__btn">Add</div>
                <div className="filmItem__edit manipulations__btn">Edit</div>
                <div className="filmItem__delete manipulations__btn">Delete</div>
            </div> : ""}
            <div className="filmItem__card" onClick={() => navigate(`films/${id}`)}>
                <img src={posterurlpreview} alt='user'/>
                <div className="filmItem__descriptions">
                    <h1>{nameoriginal ? nameoriginal : nameru ? nameru : nameen}</h1>
                    <div className="filmItem__list">
                        <div>Рейтинг: {ratingkinopoisk}</div>
                        <div>Год: {year}</div>
                        {ratingagelimits ? <div>Возраст: {ratingagelimits.replace('age', '')}+</div> : ''}
                        <div className="filmItem__list--ul">Жанр: {genres.map(genre => <div key={genre}
                                                                                            className="filmItem__list--item">{genre}</div>)}</div>
                        <div className="filmItem__list--ul">Страна: {countries.map(country => <div key={country}
                                                                                                   className="filmItem__list--item">{country}</div>)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmItem;