import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserPreferences } from '@/types';

const initialState: UserState = {
  preferences: {
    categories: ['popular', 'top_rated', 'upcoming'],
    newsCategories: ['general', 'technology'],
    temperatureUnit: 'celsius',
    language: 'en',
    theme: 'light',
  },
  isOnboarded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.preferences.theme = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.preferences.categories = action.payload;
    },
    setNewsCategories: (state, action: PayloadAction<string[]>) => {
      state.preferences.newsCategories = action.payload;
    },
    setTemperatureUnit: (state, action: PayloadAction<'celsius' | 'fahrenheit'>) => {
      state.preferences.temperatureUnit = action.payload;
    },
    setLocation: (state, action: PayloadAction<UserPreferences['location']>) => {
      state.preferences.location = action.payload;
    },
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
  },
});

export const {
  setPreferences,
  setTheme,
  setCategories,
  setNewsCategories,
  setTemperatureUnit,
  setLocation,
  setOnboarded,
  resetPreferences,
} = userSlice.actions;

export default userSlice.reducer;
