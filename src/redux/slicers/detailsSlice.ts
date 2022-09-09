import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IComment, IPostDetails} from "../../models";
import {FormValues} from "../../components/UI/CreatePostForm/CreatePostForm";
import {fetchPosts} from "./postSlice";

type PostDetails = {
    postDetails: IPostDetails[],
    loading: boolean,
}

export const fetchPostDetails = createAsyncThunk<IPostDetails[], string | undefined, { rejectValue: string }>(
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

export const editPost = createAsyncThunk<IPostDetails[], FormValues, { rejectValue: string }>(
    'post/editPost',
    async (post, {dispatch,rejectWithValue}) => {
        const res = await fetch(`https://bloggy-api.herokuapp.com/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        })
        await dispatch(fetchPosts())
        return await res.json()
    }
)

export const createComment = createAsyncThunk<void, IComment[], { rejectValue: string }>(
    'post/createComment',
    async (comment, {rejectWithValue}) => {
        const res = await fetch('https://bloggy-api.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment)
        })
        }
)


const initialState: PostDetails = {
    postDetails: [],
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
                state.postDetails = action.payload;
                state.loading = false;
            })

    }
});

export default detailsSlice.reducer;