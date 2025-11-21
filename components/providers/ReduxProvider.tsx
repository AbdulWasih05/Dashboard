'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setPreferences, setOnboarded } from '@/store/slices/userSlice';
import { setFavorites } from '@/store/slices/favoritesSlice';
import { setWidgets } from '@/store/slices/dashboardSlice';
import { STORAGE_KEYS } from '@/utils/constants';
import debounce from 'lodash.debounce';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Load user preferences from localStorage
      try {
        const savedPreferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        if (savedPreferences) {
          store.dispatch(setPreferences(JSON.parse(savedPreferences)));
        }

        const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        if (savedFavorites) {
          store.dispatch(setFavorites(JSON.parse(savedFavorites)));
        }

        const onboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDED);
        if (onboarded) {
          store.dispatch(setOnboarded(JSON.parse(onboarded)));
        }

        const savedDashboardLayout = localStorage.getItem(STORAGE_KEYS.DASHBOARD_LAYOUT);
        if (savedDashboardLayout) {
          store.dispatch(setWidgets(JSON.parse(savedDashboardLayout)));
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }

      // Track previous state for selective saving
      let previousState = store.getState();

      // Debounced save function - only saves changed data
      const saveToStorage = debounce(() => {
        const state = store.getState();

        try {
          // Only save if data has changed
          if (state.user.preferences !== previousState.user.preferences) {
            localStorage.setItem(
              STORAGE_KEYS.USER_PREFERENCES,
              JSON.stringify(state.user.preferences)
            );
          }
          if (state.favorites !== previousState.favorites) {
            localStorage.setItem(
              STORAGE_KEYS.FAVORITES,
              JSON.stringify(state.favorites)
            );
          }
          if (state.user.isOnboarded !== previousState.user.isOnboarded) {
            localStorage.setItem(
              STORAGE_KEYS.ONBOARDED,
              JSON.stringify(state.user.isOnboarded)
            );
          }
          if (state.dashboard.widgets !== previousState.dashboard.widgets) {
            localStorage.setItem(
              STORAGE_KEYS.DASHBOARD_LAYOUT,
              JSON.stringify(state.dashboard.widgets)
            );
          }

          previousState = state;
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }, 1000);

      // Subscribe to store changes with debounced save
      store.subscribe(saveToStorage);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
