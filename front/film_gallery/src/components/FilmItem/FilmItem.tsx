import React, {useContext} from 'react';
import './FilmItem.css'
import {useNavigate} from "react-router";
import {UserContext} from "../../modules/Auth/UserContext/UserContext";
import {IFilm} from "../../global/types/types";

interface IFilmWithSwitch extends IFilm {
    switchView: boolean
}

const FilmItem: React.FC<IFilmWithSwitch> = ({
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
                                                 filmlength,
                                                 switchView
                                             }) => {
    const user = useContext(UserContext);
    let navigate = useNavigate()
    return (<>{
            switchView ? <div className="column__filmItem">
                    {user.role === 'ADMIN' ? <div className="filmItem__manipulations">
                        <div className="filmItem__add manipulations__btn">Add</div>
                        <div className="filmItem__edit manipulations__btn">Edit</div>
                        <div className="filmItem__delete manipulations__btn">Delete</div>
                    </div> : ""}
                    <div className="column__filmItem__card" onClick={() => navigate(`films/${id}`)}>
                        <img src={posterurlpreview} alt='user'/>
                        <div className="column__filmItem__descriptions">
                            <h1>{nameoriginal ? nameoriginal : nameru ? nameru : nameen}</h1>
                            <div className="column__filmItem__list">
                                <div>Рейтинг: {ratingkinopoisk}</div>
                                <div>Год: {year}</div>
                                {ratingagelimits ? <div>Возраст: {ratingagelimits.replace('age', '')}+</div> : ''}
                                <div className="filmItem__list--ul">Жанр: {genres.map(genre => <div key={genre}
                                                                                                    className="filmItem__list--item">{genre}</div>)}</div>
                                <div className="filmItem__list--ul">Страна: {countries.map(country => <div key={country}
                                                                                                           className="filmItem__list--item">{country}</div>)}</div>

                                <div className="filmItem__list--ul filmItem__descriptions__text">{descriptions}</div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="filmItem">
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
        }
        </>
    );
};

export default FilmItem;