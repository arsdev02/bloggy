import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {fetchPosts} from "./postSlice";

type PostDetails = {
    post: any,
    loading: boolean,
}

export const fetchPostDetails = createAsyncThunk<any, any, { rejectValue: string }>(
    'post/fetchPostDetails',
    async (id, {rejectWithValue}) => {
        const res = await fetch(`https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`, {
            headers: {
                "Content-Type": "application/json",
            }

        })
        return await res.json()
    }
)

export const editPost = createAsyncThunk<any, any, { rejectValue: string }>(
    'post/editPost',
    async (post, {dispatch,rejectWithValue}) => {
        await fetch(`https://bloggy-api.herokuapp.com/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        })
        await dispatch(fetchPostDetails(post.id))
        await dispatch(fetchPosts())
    }
)

export const createComment = createAsyncThunk<any, any, { rejectValue: string }>(
    'post/createComment',
    async (comment, {dispatch, rejectWithValue}) => {
        await fetch('https://bloggy-api.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment)
        })
        await dispatch(fetchPostDetails(comment.postId))
        await dispatch(fetchPosts())
        }
)


const initialState: PostDetails = {
    post: [],
    loading: false,
}

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

    }
});

export default detailsSlice.reducer;