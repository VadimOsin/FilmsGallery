import React, {useContext, useState} from 'react';
import './AddComments.css'
import {UserContext} from "../../modules/Auth/UserContext/UserContext";
import {useParams} from 'react-router-dom'
import {newComments} from "../../modules/ListComments/axios/CommentsApi";
import {IComment} from "../../global/types/types";


type QuizParams = {
    id: string;
};

interface IAddComment {
    comment: IComment[],

    setComment: (comment: IComment[]) => void
}

const AddComments: React.FC<IAddComment> = ({comment, setComment}) => {
    const user = useContext(UserContext)
    const {id} = useParams<QuizParams>();
    const [addComments, setAddComment] = useState({
        title: "",
        text: "",
        user_id: 0
    })
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
            }
        }
    }
    return (
        <div className="quote addComments">
            <h2 className="quote-title"><input className="comments__input" type="text" name="title"
                                               onChange={handleChange}
                                               value={addComments.title}/> <label>Title</label></h2>
            <p className="quote-text"><textarea className="comments__input" name="text" onChange={handleChange}
                                                value={addComments.text}/> <label>Text</label></p>
            <div className="addComments__btn">
                <button type="button" className="addComments__btn__add" onClick={addNewComments}>submit</button>
                <button type="reset" className="addComments__btn__reset" onClick={resetComments}>reset</button>
            </div>
        </div>
    );
};

export default AddComments;