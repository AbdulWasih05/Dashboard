'use client';

import { FiHeart } from 'react-icons/fi';
import { useAppSelector } from '@/store/hooks';
import MovieCard from '../cards/MovieCard';

export default function FavoritesSection() {
  const favorites = useAppSelector((state) => state.favorites);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center space-x-2 mb-6">
        <FiHeart className="h-6 w-6 text-red-500" />
        <h2 className="text-2xl font-bold text-foreground">
          Your Favorites
          <span className="ml-2 text-sm font-normal text-foreground/60">
            ({favorites.length})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.slice(0, 10).map((favorite) => (
          <MovieCard key={favorite.id} movie={favorite.data} />
        ))}
      </div>
    </section>
  );
}
