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
    const [openModal,setOpenModal]=useState(true)
    const [isEditing,setIsEditing]=useState(0)
    useEffect(() => {
        if (id) {
            getAllCommentsByFilmId(parseInt(id)).then(res =>
                setComments(res)
            ).catch(error => console.log(error))
        }
    }, [id]);

    const deleteComment = async (number:number) => {
        setComments(comments.filter(i => i.id !== number))
        await deleteComments(number).then(res=>console.log(res)).catch(error=>console.log(error.message))
    }

    const editComment = async (number:number) => {
     setIsEditing(number)
        setOpenModal(true)
    }

    return (
        <>
            {user.isAuth ? (<>
                    <AddComments comment={comments} setComment={setComments} isOpen={openModal} onClose={()=>setOpenModal(!openModal)} isEditing={isEditing}/>
                    <div>
                        {comments?.reverse().map(i =>
                            <Comment key={i.id} idComment={i.id} title={i.title} text={i.text} user_id={i.user_id} deleteComment={deleteComment} editComment={editComment}/>
                        )}
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ListComments;