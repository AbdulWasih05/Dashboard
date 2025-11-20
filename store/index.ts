import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';
import newsReducer from './slices/newsSlice';
import dashboardReducer from './slices/dashboardSlice';
import { tmdbApi } from './api/tmdbApi';
import { weatherApi } from './api/weatherApi';
import { newsApi } from './api/newsApi';
import { socialApi } from './api/socialApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    news: newsReducer,
    dashboard: dashboardReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tmdbApi.middleware,
      weatherApi.middleware,
      newsApi.middleware,
      socialApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
