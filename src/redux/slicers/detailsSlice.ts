import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {defaultDetailsState, FormValues, IPost, IPostComment, IPostDetails} from '../../models';
import {FormValuesForComment} from '../../components/UI/DetailsComponents/CreateCommentForm/CreateCommentForm';

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

export const editPost = createAsyncThunk<IPost, FormValues, { rejectValue: string }>(
  'post/editPost',
  async ([{id}, post], {dispatch,rejectWithValue}) => {
    const res = await fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return res.json();
  },
);

export const createComment = createAsyncThunk<IPostComment, FormValuesForComment, { rejectValue: string }>(
  'post/createComment',
  async (comment, {rejectWithValue}) => {
    const res = await fetch('https://bloggy-api.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return await res.json();
  },
);

const initialState:PostDetailsState = {
  post: defaultDetailsState,
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
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.post.comments.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post.title = action.payload.title;
        state.post.body = action.payload.body;
      });
  },
});

export default detailsSlice.reducer;