import React from 'react';

import {IPostCommentsList} from "./PostCommentList";

const PostCommentsItem: React.FC<IPostCommentsList> = ({ body }) => {
    return (
        <li className={'post-list__item post-item'}>
            <p className={'post-item__decr'}>{ body }</p>
        </li>
    );
};

export default PostCommentsItem;