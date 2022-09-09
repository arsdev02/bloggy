import React, {useEffect, useState} from 'react';
import PostDetails from "../PostDetails/PostDetails";
import PostCommentList from "../Comments/PostCommentList";
import Modal from "../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";
import {useAppDispatch, useAppSelector} from "../../../hook";
import {fetchPostDetails} from "../../../redux/slicers/detailsSlice";
import {useParams} from "react-router-dom";
import {IPostDetails} from "../../../models";


const Details = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        dispatch((fetchPostDetails(id)))
    },[dispatch])


    const post = useAppSelector(state => state.postDetails.postDetails)
    console.log(post)

    return (
        <div className={'container'}>
            <PostDetails post={post} onEdit={()=>setModal(true)}/>
            <PostCommentList/>
            {modal && <Modal title={'edit post'} onClose={() => setModal(false)}>
                <EditPostForm onEdit={() => setModal(false)} post={post}/>
            </Modal>}
        </div>
    );
};

export default Details;