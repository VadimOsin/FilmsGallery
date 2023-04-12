import React, {useContext, useEffect, useState} from 'react';
import './ListComments.css'
import {useParams} from "react-router-dom";
import {IComment} from "../../global/types/types";
import {UserContext} from "../Auth/UserContext/UserContext";
import Comment from "../../components/Comment/Comment";
import AddComments from "../../components/AddComments/AddComments";
import {deleteComments, getAllCommentsByFilmId} from "./axios/CommentsApi";

type QuizParams = {
    id: string;
};
const ListComments = () => {
    const {id} = useParams<QuizParams>();
    const [comments, setComments] = useState<IComment[]>([])
    const user = useContext(UserContext)
    useEffect(() => {
        if (id) {
            getAllCommentsByFilmId(parseInt(id)).then(res =>
                setComments(res)
            ).catch(error => console.log(error))
        }
    }, []);

    const deleteComment = async (number:number) => {
        setComments(comments.filter(i => i.id !== number))
        await deleteComments(number).then(res=>console.log(res)).catch(error=>console.log(error.message))
    }

    return (
        <>
            {user.isAuth ? (<>
                    <AddComments comment={comments} setComment={setComments}/>
                    <div>
                        {comments?.reverse().map(i =>
                            <Comment key={i.id} idComment={i.id} title={i.title} text={i.text} user_id={i.user_id} deleteComment={deleteComment}/>
                        )}
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ListComments;