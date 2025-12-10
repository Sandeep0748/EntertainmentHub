import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bookmark {
  id: string;
  imdbId: string;
  type: 'movie' | 'series';
  title: string;
  poster: string | null;
  year: string;
}

interface BookmarksState {
  items: Bookmark[];
  loading: boolean;
  error: string | null;
}

const loadBookmarksFromStorage = (): Bookmark[] => {
  try {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: BookmarksState = {
  items: loadBookmarksFromStorage(),
  loading: false,
  error: null,
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
      state.items = action.payload;
      localStorage.setItem('bookmarks', JSON.stringify(action.payload));
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      const exists = state.items.some(
        (item) => item.imdbId === action.payload.imdbId && item.type === action.payload.type
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('bookmarks', JSON.stringify(state.items));
      }
    },
    removeBookmark: (state, action: PayloadAction<{ imdbId: string; type: 'movie' | 'series' }>) => {
      state.items = state.items.filter(
        (item) => !(item.imdbId === action.payload.imdbId && item.type === action.payload.type)
      );
      localStorage.setItem('bookmarks', JSON.stringify(state.items));
    },
  },
});

export const { setLoading, setError, setBookmarks, addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
