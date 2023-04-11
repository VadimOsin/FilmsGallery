import React, {useState} from 'react';
import './Comment.css'
import {IComment} from "../../global/types/types";

const Comment = () => {
    const [comments,setComments]=useState<IComment>()

    return (
        <div className="quote">
            <h2 className="quote-title">Dolor sippup fan toppu</h2>
            <p className="quote-text">lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam eveniet dicta
                laborum ut necessitatibus. Pariatur, illum. Consequatur porro nemo voluptatum similique nam,
                perspiciatis velit accusamus exercitationem optio necessitatibus libero odio?</p>
            <h4 className="quote-author" >-Ipsum Gibbus</h4>
        </div>
    );
};

export default Comment;