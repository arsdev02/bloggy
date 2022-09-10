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

export const createPost = createAsyncThunk<void, FormValues, { rejectValue: string }>(
  'post/createPost',
  async (post, {dispatch ,rejectWithValue}) => {
    await fetch('https://bloggy-api.herokuapp.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    await dispatch(fetchPosts());
  },
);

export const deletePost = createAsyncThunk<void, number, { rejectValue: string }>(
  'post/deletePost',
  async (id, {dispatch ,rejectWithValue}) => {
    await fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await dispatch(fetchPosts());
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
      });
  },
});

export default postSlice.reducer;