import React from 'react';
import {useParams} from "react-router-dom";
import './FilmById.css'
const FilmById = () => {
    const {id} = useParams()
    console.log(id)
    return (
        <div>

        </div>
    );
};

export default FilmById;