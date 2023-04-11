import React, {useState} from 'react';
import './ManipulationsBtn.css'
import {useNavigate} from "react-router";
import {FILMS_ROUTE} from "../../modules/Auth/utils/consts";
import {deleteFilm} from "../../modules/ListFilm/axios/filmsApi";

interface IManipulationsBtn {
    id: number
}

const ManipulationsBtn: React.FC<IManipulationsBtn> = ({id}) => {
    const [isDeleted, setIsDeleted] = useState(false);
    let navigate = useNavigate()
    const clickDeleteFilm = async () => {
        await deleteFilm(id).then(response => {
            navigate(FILMS_ROUTE)
            setIsDeleted(true);
        }).catch(
            error => {
                console.log(error.message)
            }
        );
    }

    if (isDeleted) {
        return null;
    }
    return (
        <div className="filmItem__manipulations">
            <div className="filmItem__add manipulations__btn" onClick={() => navigate(`films/0`)}>Add</div>
            <div className="filmItem__edit manipulations__btn" onClick={() => navigate(`films/${id}`)}>Edit
            </div>
            <div className="filmItem__delete manipulations__btn" onClick={clickDeleteFilm}>Delete</div>
        </div>
    );
};

export default ManipulationsBtn;