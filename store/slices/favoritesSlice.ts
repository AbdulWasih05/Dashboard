import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteItem, Movie, NewsArticle } from '@/types';

const initialState: FavoriteItem[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.find((fav) => fav.id === String(action.payload.id));
      if (!exists) {
        state.push({
          id: String(action.payload.id),
          type: 'movie',
          data: action.payload,
          addedAt: Date.now(),
        });
      }
    },
    addNewsFavorite: (state, action: PayloadAction<NewsArticle>) => {
      const exists = state.find((fav) => fav.id === action.payload.id);
      if (!exists) {
        state.push({
          id: action.payload.id,
          type: 'news',
          data: action.payload,
          addedAt: Date.now(),
        });
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      return state.filter((fav) => fav.id !== action.payload);
    },
    clearFavorites: () => {
      return [];
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      return action.payload;
    },
  },
});

export const { addFavorite, addNewsFavorite, removeFavorite, clearFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
