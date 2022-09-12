import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {IPost} from '../../models';
import {FormValues} from '../../components/UI/MainComponents/CreatePostForm/CreatePostForm';

type PostsState = {
  list: IPost[],
  loading: boolean,
  error: string | null,
}

export const fetchPosts = createAsyncThunk<IPost[], undefined, { rejectValue: string }>(
  'post/fetchPosts',
  async (_, {rejectWithValue}) => {
    const res = await fetch('https://bloggy-api.herokuapp.com/posts', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
);

export const createPost = createAsyncThunk<IPost, FormValues, { rejectValue: string }>(
  'post/createPost',
  async (post, {rejectWithValue}) => {
    const res = await fetch('https://bloggy-api.herokuapp.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  },
);

export const deletePost = createAsyncThunk<number, number, { rejectValue: string }>(
  'post/deletePost',
  async (id, {rejectWithValue}) => {
    await fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return id;
  },
);

const initialState: PostsState = {
  list: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((post) => post.id !== action.payload);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default postSlice.reducer;