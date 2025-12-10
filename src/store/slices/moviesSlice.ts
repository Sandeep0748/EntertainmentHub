import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OMDbItem } from '@/lib/omdb';

interface MoviesState {
  trending: OMDbItem[];
  popular: OMDbItem[];
  searchResults: OMDbItem[];
  currentMovie: OMDbItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  trending: [],
  popular: [],
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTrending: (state, action: PayloadAction<OMDbItem[]>) => {
      state.trending = action.payload;
    },
    setPopular: (state, action: PayloadAction<OMDbItem[]>) => {
      state.popular = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<OMDbItem[]>) => {
      state.searchResults = action.payload;
    },
    setCurrentMovie: (state, action: PayloadAction<OMDbItem | null>) => {
      state.currentMovie = action.payload;
    },
  },
});

export const { setLoading, setError, setTrending, setPopular, setSearchResults, setCurrentMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
