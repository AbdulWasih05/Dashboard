'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Movie } from '@/types';
import { getTMDBImageUrl, formatRating, truncateText, isFavorited } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

function MovieCard({ movie, priority = false }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const [imageError, setImageError] = useState(false);

  const isFav = isFavorited(String(movie.id), favorites);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFav) {
      dispatch(removeFavorite(String(movie.id)));
      toast.success('Removed from favorites');
    } else {
      dispatch(addFavorite(movie));
      toast.success('Added to favorites');
    }
  };

  return (
    <div
      className="card-animate group relative overflow-hidden rounded-lg bg-card border border-border shadow-lg transition-shadow duration-200 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {!imageError && movie.poster_path ? (
          <Image
            src={getTMDBImageUrl(movie.poster_path, 'medium')}
            alt={movie.title}
            fill
            className="object-cover md:transition-transform md:duration-200 md:group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground/40">
            <span className="text-4xl" aria-hidden="true">🎬</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart className={`h-4 w-4 ${isFav ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>

        {movie.vote_average > 0 && (
          <div className="absolute top-2 left-2 flex items-center space-x-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
            <FiStar className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-white">
              {formatRating(movie.vote_average)}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 min-h-[100px]">
        <h3 className="font-semibold text-foreground line-clamp-1" title={movie.title}>
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-foreground/60 line-clamp-2 min-h-[2.5rem]">
          {movie.overview ? truncateText(movie.overview, 80) : '\u00A0'}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-foreground/50">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : '\u00A0'}
          </p>
          <Link
            href={`/movies/${movie.id}`}
            className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieCard);
