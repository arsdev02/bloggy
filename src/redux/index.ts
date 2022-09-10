import {configureStore} from '@reduxjs/toolkit';

import postSlice from './slicers/postSlice';
import detailsSlice from './slicers/detailsSlice';


const store = configureStore({
  reducer: {
    posts: postSlice,
    postDetails: detailsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

