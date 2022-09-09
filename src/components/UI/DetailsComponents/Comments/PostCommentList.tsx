import React from 'react';
import PostCommentItem from "./PostCommentItem";

import './postComment.css'

interface PostCommentListProps {
    comments: [{
        postId: number,
        id: number,
        body: string,
    }]
}

const PostCommentList = ({comments}: PostCommentListProps) => {

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