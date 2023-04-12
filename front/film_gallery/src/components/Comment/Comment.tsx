import React, {useContext, useEffect, useState} from 'react';
import './Comment.css'
import {IUserMeta} from "../../global/types/types";
import {getUserCommentInfo} from "../../modules/ListComments/axios/CommentsApi";
import {UserContext} from "../../modules/Auth/UserContext/UserContext";

interface ICommentId {
    idComment: number
    title: string,
    text: string
    user_id: number,
    deleteComment: (number: number) => void;

    editComment: (number: number) => void;
}

const Comment: React.FC<ICommentId> = ({idComment, title, text, user_id, deleteComment, editComment}) => {
    const [userInfo, setUserInfo] = useState<IUserMeta>()
    const user = useContext(UserContext)
    useEffect(() => {
        getUserCommentInfo(user_id.toString()).then(res =>
            setUserInfo(res)).catch(error => console.log(error))
    })

    return (
        <div className="quote">
            <h2 className="quote-title">{title}</h2>
            {userInfo && userInfo.user_meta_id === parseInt(user.id) ?
                <>
                    <button className="editComment"
                            onClick={(event) => editComment(idComment)}>EDIT
                    </button>
                    <button className="addComments__btn__reset deleteComment"
                            onClick={(event) => deleteComment(idComment)}>DELETE
                    </button>
                </> : null}
            <p className="quote-text">{text}</p>
            <h4 className="quote-author">
                {userInfo?.name} {userInfo?.surname} {userInfo?.img ?
                <img src={process.env.REACT_APP_API_URL + userInfo?.img} alt='user' width={30}
                     height={30}/> : ''}</h4>
        </div>
    );
};

export default Comment;