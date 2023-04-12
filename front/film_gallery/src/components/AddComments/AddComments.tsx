import React, {useContext, useEffect, useState} from 'react';
import './AddComments.css'
import {UserContext} from "../../modules/Auth/UserContext/UserContext";
import {useParams} from 'react-router-dom'
import {newComments, updateComments} from "../../modules/ListComments/axios/CommentsApi";
import {IComment} from "../../global/types/types";


type QuizParams = {
    id: string;
};

interface IAddComment {
    comment: IComment[],

    setComment: (comment: IComment[]) => void
    isOpen: boolean;
    onClose: () => void;

    isEditing: number
}

const AddComments: React.FC<IAddComment> = ({comment, setComment, isOpen, onClose, isEditing}) => {
    const user = useContext(UserContext)
    const {id} = useParams<QuizParams>();
    const [addComments, setAddComment] = useState({
        title: '',
        text: "",
        user_id: 0
    })

    useEffect(() => {
        if (isEditing !== 0) {
            comment?.map(i => {
                if (i.id === isEditing) {
                    setAddComment({
                        title: i.title,
                        text: i.text,
                        user_id: i.user_id,
                    });
                }
            })
        }
    }, [isEditing]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setAddComment(prev => ({...prev, [name]: value}));
    };
    const resetComments = () => {
        setAddComment({
            title: "",
            text: "",
            user_id: 0
        })
    }
    const addNewComments = async () => {
        if (addComments.title !== "" && addComments.text !== "") {
            if (id) {
                try {
                    await newComments(
                        addComments.title,
                        addComments.text,
                        0,
                        user.id,
                        id
                    ).then((res) => {

                        setComment([...comment, {
                            id: res.id,
                            text: addComments.text,
                            title: addComments.title,
                            user_id: addComments.user_id,
                            film_id: parseInt(id),
                            likes: 0
                        }])
                        resetComments()
                    })

                } catch (error) {
                    console.log(error);
                }
                resetComments()
            }
        }
    }
    const updateComment = async () => {
        if (addComments.title !== "" && addComments.text !== "") {
            if (id) {
                try {
                    await updateComments(
                        isEditing,
                        addComments.title,
                        addComments.text,
                        0,
                        user.id,
                        id
                    ).then((res) => {
                        let updatedList = comment.map(item => {
                            if (item.id === isEditing) {
                                return {
                                    ...item,
                                    id: item.id,
                                    title: addComments.title,
                                    text: addComments.text,
                                    user_id: item.user_id,
                                    film_id: item.film_id,
                                    likes: 0
                                };
                            }
                            return item;
                        });
                        setComment(updatedList)
                        resetComments()
                        onClose()
                    })

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }
    return isOpen ? (
        <div className="modal-overlay">
            <div className="quote addComments">
                <button className="addComments__close-button" onClick={onClose}>
                    X
                </button>
                <h2 className="quote-title"><input className="comments__input" type="text" name="title"
                                                   onChange={handleChange}
                                                   value={addComments.title}/> <label>Title</label></h2>
                <p className="quote-text"><textarea className="comments__input" name="text" onChange={handleChange}
                                                    value={addComments.text}/> <label>Text</label></p>
                <div className="addComments__btn">
                    <button type="button" className="addComments__btn__add"
                            onClick={isEditing ? updateComment : addNewComments}>{isEditing ? 'Save' : 'Submit'}</button>
                    <button type="reset" className="addComments__btn__reset" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    ) : null
};

export default AddComments;