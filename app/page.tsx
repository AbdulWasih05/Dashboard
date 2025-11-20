'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLocation } from '@/store/slices/userSlice';
import { getUserLocation } from '@/utils/helpers';
import { DEFAULT_LOCATION } from '@/utils/constants';
import MainLayout from '@/components/layout/MainLayout';
import OverviewDashboard from '@/components/dashboard/OverviewDashboard';

export default function Home() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.user.preferences.location);

  useEffect(() => {
    // Get user's location on first load if not set
    if (!location) {
      getUserLocation()
        .then((coords) => {
          dispatch(setLocation(coords));
        })
        .catch(() => {
          // Fallback to default location if geolocation fails
          dispatch(setLocation(DEFAULT_LOCATION));
        });
    }
  }, [location, dispatch]);

  return (
    <MainLayout>
      <OverviewDashboard />
    </MainLayout>
  );
}
