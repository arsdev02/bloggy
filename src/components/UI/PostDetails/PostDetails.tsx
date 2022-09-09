import React from 'react';
import {deletePost} from "../../../redux/slicers/postSlice";
import {useAppDispatch} from "../../../hook";
import {useNavigate} from "react-router-dom";

import './postDetails.css'
import {IPostDetails} from "../../../models";
type Props = {
    post: IPostDetails,
    onEdit : ()=>void,
}
const PostDetails = ({post, onEdit}: Props) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()

    const HandleDeletePost = async () => {
        await dispatch(deletePost(post.id))
        await navigation(('/'))
    }

    return (
        <div className={'post-details'}>
            <p className={'post-item__title'}>{post.title}</p>
            <p className={'post-item__decr'}>{post.body}</p>
            <div className={'post-item__box'}>
                <button
                    className={'post-item__button'}
                    onClick={HandleDeletePost}
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
PostDetails.defaultProps={
    post:undefined,
    onEdit:undefined
}
export default PostDetails;