import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import moviesReducer from './slices/moviesSlice';
import tvReducer from './slices/tvSlice';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    tv: tvReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
