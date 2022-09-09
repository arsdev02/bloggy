import React, {useEffect, useState} from 'react';
import PostDetails from "../PostDetails/PostDetails";
import PostCommentList from "../Comments/PostCommentList";
import Modal from "../../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";
import {useAppDispatch, useAppSelector} from "../../../../hook";
import {fetchPostDetails} from "../../../../redux/slicers/detailsSlice";
import {useParams} from "react-router-dom";

import './details.css'
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import CreateButton from "../../CreateButton/CreateButton";
import {IComments, IPostDetails} from "../../../../models";


const Details = () => {
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const {post} = useAppSelector(state => state.postDetails)
    const {comments} = useAppSelector(state => state.postDetails.post)
    const [modal, setModal] = useState(false)
    const [formModal, setFormModal] = useState(false)

    console.log(post.id)

    useEffect(() => {
        dispatch(fetchPostDetails(id))
    }, [dispatch, id])

    return (
        <div className={'container post-details'}>
            <PostDetails onEdit={() => setModal(true)} post={post}/>

            {comments && comments.length>0 && <PostCommentList comments={comments}/>}
            {modal && <Modal title={'edit post'} onClose={()=>setModal(false)}>
                    <EditPostForm onEdit={()=>setModal(false)}/>
                </Modal>}

            {formModal && <Modal title={'create comment'} onClose={() => setFormModal(false)}>
                <CreateCommentForm onCreate={() => setFormModal(false)} id={post.id}/>
            </Modal>}
            <CreateButton onCreate={() => setFormModal(true)}/>
        </div>
    );
};

export default Details;