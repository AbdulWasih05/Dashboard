import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle } from '@/types';

interface NewsState {
  cachedArticles: Record<string, NewsArticle>;
}

const initialState: NewsState = {
  cachedArticles: {},
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    cacheArticle: (state, action: PayloadAction<NewsArticle>) => {
      state.cachedArticles[action.payload.id] = action.payload;
    },
    clearCache: (state) => {
      state.cachedArticles = {};
    },
  },
});

export const { cacheArticle, clearCache } = newsSlice.actions;

export default newsSlice.reducer;
