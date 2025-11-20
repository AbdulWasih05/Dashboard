'use client';

import MainLayout from '@/components/layout/MainLayout';
import FavoritesSection from '@/components/dashboard/FavoritesSection';
import { useAppSelector } from '@/store/hooks';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Favorites
          <span className="ml-3 text-lg font-normal text-foreground/60">
            ({favorites.length} {favorites.length === 1 ? 'item' : 'items'})
          </span>
        </h1>
        <p className="text-foreground/60">
          All your favorite movies in one place
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No favorites yet
          </h2>
          <p className="text-foreground/60 mb-6">
            Start adding your favorite movies to see them here!
          </p>
          <a
            href="/movies"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Movies
          </a>
        </div>
      ) : (
        <FavoritesSection />
      )}
    </MainLayout>
  );
}
