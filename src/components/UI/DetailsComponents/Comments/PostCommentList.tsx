import React from 'react';
import PostCommentItem from "./PostCommentItem";

import './postComment.css'
import {IComments} from "../../../../models";

const PostCommentList = ({comments}: IComments) => {

    return (
        <ul className={'post-details__list'}>
            {comments?.map((comment) => (
                <PostCommentItem
                    key={comment.id}
                    {...comment}
                />
            ))}

        </ul>
    );
};

export default PostCommentList;