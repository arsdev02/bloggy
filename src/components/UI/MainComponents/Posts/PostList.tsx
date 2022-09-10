import React from 'react';

import {useAppSelector} from '../../../../hook';

import PostItem from './PostItem';

import './posts.css';

const PostList = () => {
  const posts = useAppSelector(state => state.posts.list);
  return (
    <ul className={'post-list'}>
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          {...post}
        />
      ))}
    </ul>
  );
};

export default PostList;