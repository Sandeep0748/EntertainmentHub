import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OMDbItem } from '@/lib/omdb';

interface TVState {
  trending: OMDbItem[];
  popular: OMDbItem[];
  searchResults: OMDbItem[];
  currentShow: OMDbItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: TVState = {
  trending: [],
  popular: [],
  searchResults: [],
  currentShow: null,
  loading: false,
  error: null,
};

const tvSlice = createSlice({
  name: 'tv',
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
    setCurrentShow: (state, action: PayloadAction<OMDbItem | null>) => {
      state.currentShow = action.payload;
    },
  },
});

export const { setLoading, setError, setTrending, setPopular, setSearchResults, setCurrentShow } = tvSlice.actions;
export default tvSlice.reducer;
