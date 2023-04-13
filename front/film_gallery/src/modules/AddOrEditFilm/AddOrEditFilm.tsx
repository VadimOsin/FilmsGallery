import React, {useEffect, useState} from 'react';
import {IFilm} from "../../global/types/types";
import {getFilmById} from "../FilmById/axios/filmByIdApi";
import {useParams} from "react-router-dom";
import './AddorEditFilm.css'
import {newFilm, updateFilm} from "../ListFilm/axios/filmsApi";


type QuizParams = {
    id: string;
};
const AddOrEditFilm: React.FC = () => {
    const {id} = useParams<QuizParams>();
    const [file, setFile] = useState<File | null>(null);
    const [film, setFilm] = useState<IFilm>({
        id: 0,
        nameru: '',
        nameen: '',
        nameoriginal: "",
        posterurlpreview: "",
        descriptions: "",
        ratingkinopoisk: 0,
        year: 0,
        type: "",
        ratingagelimits: '',
        filmlength: 0,
        countries: [],
        genres: []
    });
    useEffect(() => {
        if (id !== "0" && id !== undefined) {
            getFilmById(id).then(response => {
                setFilm(response)
            }).catch(error => console.log(error))
        }
    },[])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFilm(prevFilm => ({...prevFilm, [name]: value}));
    };
    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }
    const resetFilm = () => {
        setFile(null)
        setFilm({
            id: 0,
            nameru: '',
            nameen: '',
            nameoriginal: "",
            posterurlpreview: "",
            descriptions: "",
            ratingkinopoisk: 0,
            year: 0,
            type: "",
            ratingagelimits: '',
            filmlength: 0,
            countries: [],
            genres: []
        })
    }
    const addFilm = async () => {
        const formData = new FormData();
        formData.append('nameru', film.nameru ?? '');
        formData.append('nameen', film.nameen ? film.nameen : "");
        formData.append('nameoriginal', film.nameoriginal);
        formData.append('descriptions', film.descriptions);
        formData.append('ratingkinopoisk', String(film.ratingkinopoisk));
        formData.append('year', String(film.year));
        formData.append('type', film.type);
        formData.append('ratingagelimits', film.ratingagelimits ?? '');
        formData.append('filmlength', String(film.filmlength));
        formData.append('countries', JSON.stringify(film.countries));
        formData.append('genres', JSON.stringify(film.genres));
        if (file) {
            formData.append('img', file);
        } else {
            formData.append('posterurlpreview', film.posterurlpreview);
        }
        if (id !== "0" && id !== undefined) {
            formData.append('id', film.id?.toString() ?? "0");
           await updateFilm(formData).then(response => {

            }).catch(
                error => {
                    console.log(error.message)
                }
            );
        } else {
           await newFilm(formData).then(response => {
                console.log(response)
            }).catch(
                error => {
                    console.log(error.message)
                }
            );
        }
    }

    const addInfo = () => {
        setFilm({...film, genres: [...film.genres, ""]});
    };

    const removeInfo = (index: number) => {
        const newGenres = [...film.genres];
        newGenres.splice(index, 1);
        setFilm({...film, genres: newGenres});
    };

    const changeInfo = (key: string, value: string, index: number) => {
        const newGenres = [...film.genres];
        newGenres[index] = value;
        setFilm({...film, genres: newGenres});
    };
    const addCountry = () => {
        setFilm({...film, countries: [...film.countries, ""]});
    };

    const removeCountry = (index: number) => {
        const newCountries = [...film.countries];
        newCountries.splice(index, 1);
        setFilm({...film, countries: newCountries});
    };

    const changeCountry = (key: string, value: string, index: number) => {
        const newCountries = [...film.countries];
        newCountries[index] = value;
        setFilm({...film, countries: newCountries});
    };
    return (
        <div className="box">
            <form>
                <span className="text-center">login</span>
                <div className="input-container">
                    <input type="text" name="nameru" onChange={handleChange} value={film.nameru ?? ""}/>
                    <label>NameRu</label>
                </div>
                <div className="input-container">
                    <input type="text" name="nameen" onChange={handleChange} value={film.nameen ?? ""}/>
                    <label>NameEn</label>
                </div>
                <div className="input-container">
                    <input type="text" name="nameoriginal" onChange={handleChange} value={film.nameoriginal ?? ""}/>
                    <label>NameOriginal</label>
                </div>
                <div className="input-container">
                    <input type="text" name="posterurlpreview" onChange={handleChange}
                           value={film.posterurlpreview ?? ""}/>
                    <label>File link or select</label>
                    <input type="file" name="posterurlpreview" onChange={selectFile}
                           accept="image/*,image/jpeg"/>
                </div>

                <div className="input-container">
                    <input type="text" name="descriptions" onChange={handleChange} value={film.descriptions ?? ""}/>
                    <label>Descriptions</label>
                </div>
                <div className="input-container">
                    <input type="text" name="ratingkinopoisk" onChange={handleChange}
                           value={film.ratingkinopoisk ?? ""}/>
                    <label>Rating</label>
                </div>
                <div className="input-container">
                    <input type="text" name="year" onChange={handleChange} value={film.year ?? ""}/>
                    <label>Year</label>
                </div>
                <div className="input-container">
                    <label>Type</label>
                    <br/>
                    <select
                        onChange={(event) => setFilm({...film, type: event.target.value})}
                        value={film.type}
                    >
                        <option value="VIDEO">VIDEO</option>
                        <option value="FILM">FILM</option>
                        <option value="TV_SERIES">TV_SERIES</option>
                        <option value="MINI_SERIES">MINI_SERIES</option>
                        <option value="TV_SHOW">TV_SHOW</option>
                    </select>
                </div>
                <div className="input-container">
                    <input type="text" name="ratingagelimits" onChange={handleChange}
                           value={film.ratingagelimits ?? ""}/>
                    <label>RatingAgeLimits</label>
                </div>
                <div className="input-container">
                    <input type="text" name="filmlength" onChange={handleChange} value={film.filmlength ?? ""}/>
                    <label>FilmLength</label>
                </div>
                <div className="input-container">
                    <div className="input-container__info">
                        <label>Countries</label>
                        <div className="btn__add__items" onClick={() => addCountry()}>Add</div>
                    </div>
                    <div className="input-container__info__list">
                        {film.countries.map((country, index) => (
                            <div className="input-container input-container__item" key={index}>
                                <input type="text" value={country}
                                       onChange={(event) => changeCountry("countries", event.target.value, index)}/>
                                <div className="btn__remove__items" onClick={() => removeCountry(index)}>Remove</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-container">
                    <div className="input-container__info">
                        <label>Genres</label>
                        <div className="btn__add__items" onClick={() => addInfo()}>Add</div>
                    </div>
                    <div className="input-container__info__list">
                        {film.genres.map((genre, index) => (
                            <div className="input-container input-container__item" key={index}>
                                <input type="text" value={genre}
                                       onChange={(event) => changeInfo("genres", event.target.value, index)}/>
                                <div className="btn__remove__items" onClick={() => removeInfo(index)}>Remove</div>
                            </div>
                        ))}</div>

                </div>
                <div className="addFilm__btn">
                    <button type="button" className="btn" onClick={addFilm}>submit</button>
                    <button type="reset" className="btn" onClick={resetFilm}>reset</button>
                </div>
            </form>
        </div>
    );
};

export default AddOrEditFilm;