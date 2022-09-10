import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../../hook';
import {fetchPosts} from '../../../../redux/slicers/postSlice';
import PostList from '../Posts/PostList';
import CreateButton from '../../CreateButton/CreateButton';
import Modal from '../../Modal/Modal';
import CreatePostForm from '../CreatePostForm/CreatePostForm';

const Main = () => {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const {loading} = useAppSelector(state => state.posts);
  useEffect(()=> {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={'container main-container'}>
      {!loading?<PostList/>:<h1>loading...</h1>}
      <CreateButton onCreate={()=>setModal(true)}/>
      {modal && <Modal title={'Create new post'} onClose={() => setModal(false)}>
        <CreatePostForm onCreate={() => setModal(false)}/>
      </Modal>}
    </div>
  );
};

export default Main;