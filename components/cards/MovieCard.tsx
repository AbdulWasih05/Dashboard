'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Movie } from '@/types';
import { getTMDBImageUrl, formatRating, truncateText, isFavorited } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-lg bg-card border border-border shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {!imageError && movie.poster_path ? (
          <Image
            src={getTMDBImageUrl(movie.poster_path, 'medium')}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0teleNsCAABkR25NrxAu+l5Y8TT//9k="
            loading="lazy"
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
          {isFav ? (
            <FaHeart className="h-4 w-4 text-red-500" />
          ) : (
            <FiHeart className="h-4 w-4 text-white" />
          )}
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

      <div className="p-3">
        <h3 className="font-semibold text-foreground line-clamp-1" title={movie.title}>
          {movie.title}
        </h3>

        {movie.overview && (
          <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
            {truncateText(movie.overview, 80)}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          {movie.release_date && (
            <p className="text-xs text-foreground/50">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}
          <Link
            href={`/movies/${movie.id}`}
            className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
