import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../../hook";
import {fetchPosts} from "../../../redux/slicers/postSlice";
import PostList from "../Posts/PostList";
import CreateButton from "../CreateButton/CreateButton";
import Modal from "../Modal/Modal";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

const Main = () => {
    const dispatch = useAppDispatch();

    const [modal, setModal] = useState(false)

    useEffect(()=> {
        dispatch(fetchPosts());
    }, [dispatch])

    return (
        <div className={'container main-container'}>
            <PostList/>
            <CreateButton onCreate={()=>setModal(true)}/>
            {modal && <Modal title={'Create new post'} onClose={() => setModal(false)}>
                <CreatePostForm onCreate={() => setModal(false)}/>
            </Modal>}
        </div>
    );
};

export default Main;