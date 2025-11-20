import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  isSearchOpen: false,
  isSettingsOpen: false,
  isSidebarOpen: false,
  isMobileMenuOpen: false,
  loading: {
    movies: false,
    weather: false,
    search: false,
  },
  error: {
    movies: null,
    weather: null,
    search: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setLoading: (
      state,
      action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>
    ) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setError: (
      state,
      action: PayloadAction<{ key: keyof UIState['error']; value: string | null }>
    ) => {
      state.error[action.payload.key] = action.payload.value;
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    },
  },
});

export const {
  toggleSearch,
  toggleSettings,
  toggleSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  setLoading,
  setError,
  clearErrors,
} = uiSlice.actions;

export default uiSlice.reducer;
