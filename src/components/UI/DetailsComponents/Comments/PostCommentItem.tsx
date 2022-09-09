import React from 'react';

interface PostCommentItemProps {
    postId: number,
    id: number,
    body: string,
}

const PostCommentItem = ({body}: PostCommentItemProps) => {
    return (
        <li className={'post-details__list-item'}>
            <p>{body}</p>
        </li>
    );
};

export default PostCommentItem;