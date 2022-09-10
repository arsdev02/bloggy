import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {FormValues, IPostDetails} from '../../models';
import {FormValuesForComment} from '../../components/UI/DetailsComponents/CreateCommentForm/CreateCommentForm';

import {fetchPosts} from './postSlice';

type PostDetailsState = {
    post: IPostDetails,
    loading: boolean,
}

export const fetchPostDetails = createAsyncThunk<IPostDetails, string | undefined | number, { rejectValue: string }>(
  'post/fetchPostDetails',
  async (id, {rejectWithValue}) => {
    const res = await fetch(`https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`, {
      headers: {
        'Content-Type': 'application/json',
      },

    });
    return await res.json();
  },
);

export const editPost = createAsyncThunk<void, FormValues, { rejectValue: string }>(
  'post/editPost',
  async ([{id}, post], {dispatch,rejectWithValue}) => {
    await fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    await dispatch(fetchPostDetails(id));
    await dispatch(fetchPosts());
  },
);

export const createComment = createAsyncThunk<void, FormValuesForComment, { rejectValue: string }>(
  'post/createComment',
  async (comment, {dispatch, rejectWithValue}) => {
    await fetch('https://bloggy-api.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    await dispatch(fetchPostDetails(comment.postId));
    await dispatch(fetchPosts());
  },
);

const initialState:PostDetailsState = {
  post: {
    id: 0,
    title: '',
    body: '',
    comments: [{
      postId: 0,
      id: 0,
      body: '',
    }],
  },
  loading: false,
};

const detailsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      });
  },
});

export default detailsSlice.reducer;