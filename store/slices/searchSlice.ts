import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState, Movie } from '@/types';

const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<Movie[]>) => {
      state.results = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setResults,
  setSearching,
  setSearchError,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
