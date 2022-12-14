import React from 'react';

import {IComments} from '../../../../models';

import PostCommentItem from './PostCommentItem';

import './postComment.css';

const PostCommentList = ({comments}: IComments) => {

  return (
    <ul className={'post-details__list'}>
      {comments?.map((comment) => (
        <PostCommentItem
          key={comment.id}
          {...comment}
        />
      ))}

    </ul>
  );
};

export default PostCommentList;