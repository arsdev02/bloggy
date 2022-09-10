import React, {useEffect, useState} from 'react';
import PostDetails from "../PostDetails/PostDetails";
import PostCommentList from "../Comments/PostCommentList";
import Modal from "../../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";
import {useAppDispatch, useAppSelector} from "../../../../hook";
import {fetchPostDetails} from "../../../../redux/slicers/detailsSlice";
import {useParams} from "react-router-dom";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import CreateButton from "../../CreateButton/CreateButton";

import './details.css'


const Details = () => {
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const {post} = useAppSelector(state => state.postDetails)
    const [modal, setModal] = useState(false)
    const [commentModal, setCommentModal] = useState(false)

    useEffect(() => {
        dispatch(fetchPostDetails(id))
    }, [dispatch, id])

    return (
        <div className={'container post-details'}>
            <PostDetails onEdit={() => setModal(true)} post={post}/>

            {post.comments && post.comments.length>0 && <PostCommentList comments={post.comments}/>}
            {modal && <Modal title={'edit post'} onClose={()=>setModal(false)}>
                    <EditPostForm onEdit={()=>setModal(false)}/>
                </Modal>}

            {commentModal && <Modal title={'create comment'} onClose={() => setCommentModal(false)}>
                <CreateCommentForm onCreate={() => setCommentModal(false)} id={post.id}/>
            </Modal>}
            <CreateButton onCreate={() => setCommentModal(true)}/>
        </div>
    );
};

export default Details;