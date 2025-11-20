'use client';

import { useAppSelector } from '@/store/hooks';
import TrendingSection from './TrendingSection';
import FavoritesSection from './FavoritesSection';
import ContentFeed from './ContentFeed';
import { LoadingScreen } from '../common/Loader';

export default function Dashboard() {
  const location = useAppSelector((state) => state.user.preferences.location);
  const preferences = useAppSelector((state) => state.user.preferences);

  if (!location) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-8">
      {/* Favorites Section */}
      <FavoritesSection />

      {/* Trending Section */}
      {preferences.categories.includes('trending') && <TrendingSection />}

      {/* Content Feed by Categories */}
      <ContentFeed />
    </div>
  );
}
