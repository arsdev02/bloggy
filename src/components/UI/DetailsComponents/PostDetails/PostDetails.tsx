import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hook";
import {deletePost} from "../../../../redux/slicers/postSlice";

import './postDetails.css'
import {useNavigate} from "react-router-dom";
import {IPostDetails} from "../../../../models";

interface PostDetailsProps {
    onEdit: () => void,
    post: IPostDetails,
}

const PostDetails = ({onEdit, post}: PostDetailsProps) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    console.log(post)
    const handleDeletePost = async () => {
        await dispatch(deletePost(post.id))
        await navigation('/')
    }

    return (
        <div className={'post-details__post'}>
            <p className={'post-details__title'}> {post.title} </p>
            <p className={'post-details__desc'}> {post.body} </p>
            <div className={'post-item__box'}>
                <button
                    className={'post-item__button'}
                    onClick={handleDeletePost}
                >
                    delete
                </button>

                <button
                    className={'post-item__button'}
                    onClick={onEdit}
                >
                    edit
                </button>
            </div>
        </div>
    );
};

export default PostDetails;