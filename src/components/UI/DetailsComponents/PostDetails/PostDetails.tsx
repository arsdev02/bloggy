import React from 'react';

import {useNavigate} from 'react-router-dom';

import {useAppDispatch} from '../../../../hook';
import {deletePost} from '../../../../redux/slicers/postSlice';

import './postDetails.css';

import {IPostDetails} from '../../../../models';

interface PostDetailsProps {
    onEdit: () => void,
    post: IPostDetails,
}

const PostDetails = ({onEdit, post}: PostDetailsProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const handleDeletePost = async () => {
    await dispatch(deletePost(post.id));
    await navigation('/');
  };

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