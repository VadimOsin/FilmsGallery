import React, {useState} from 'react';
import './ListComments.css'
import {useParams} from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import { IListFilm} from "../../global/types/types";

type QuizParams = {
    id: string;
};
const ListComments = () => {
    const {id} = useParams<QuizParams>();
    const [comments,setComments]=useState<IListFilm>()
    return (
        <div>
            <Comment/>
        </div>
    );
};

export default ListComments;