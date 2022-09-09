import React from 'react';
import {Link} from "react-router-dom";

import {IPost} from "../../../models";
import {deletePost} from "../../../redux/slicers/postSlice";
import {useAppDispatch} from "../../../hook";

const PostItem: React.FC<IPost> = ({id, title, body}) => {
    const dispatch = useAppDispatch()

    return (
        <li className={'post-list__item post-item'}>
            <p className={'post-item__title'}>{title}</p>
            <p className={'post-item__decr'}>{body}</p>
            <div className={'post-item__box'}>
                <button
                    className={'post-item__button'}
                    onClick={()=>dispatch(deletePost(id))}
                >
                    delete
                </button>
                <Link
                    to={`post/${id}`}
                >
                    <button className={'post-item__button'}>read more</button>
                </Link>
            </div>
        </li>
    );
};

export default PostItem;