'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiHeart, FiStar, FiCalendar, FiGlobe } from 'react-icons/fi';
import { useGetMovieDetailsQuery } from '@/store/api/tmdbApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { getTMDBImageUrl, formatRating, isFavorited } from '@/utils/helpers';
import { LoadingScreen } from '@/components/common/Loader';
import MainLayout from '@/components/layout/MainLayout';
import toast from 'react-hot-toast';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = use(params);
  const movieId = parseInt(id, 10);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);

  const { data: movie, isLoading, isError, error } = useGetMovieDetailsQuery(movieId, {
    skip: isNaN(movieId),
  });

  const isFav = movie ? isFavorited(String(movie.id), favorites) : false;

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (isFav) {
      dispatch(removeFavorite(String(movie.id)));
      toast.success('Removed from favorites');
    } else {
      dispatch(addFavorite(movie));
      toast.success('Added to favorites');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingScreen />
      </MainLayout>
    );
  }

  if (isError || (!isLoading && !movie)) {
    const is404 = error && 'status' in error && error.status === 404;

    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-xl text-foreground/60 mb-4">
            {is404 ? 'Movie not found' : 'Failed to load movie details. Please try again.'}
          </p>
          <Link
            href="/movies"
            className="text-primary-500 hover:text-primary-600 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Movies
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="card-animate space-y-6">
        {/* Back Button */}
        <Link
          href="/movies"
          className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Movies
        </Link>

        {/* Movie Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary shadow-lg">
              {movie.poster_path ? (
                <Image
                  src={getTMDBImageUrl(movie.poster_path, 'large')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-foreground/40">
                  <span className="text-6xl">🎬</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {movie.title}
              </h1>
              {movie.release_date && (
                <p className="text-foreground/60 mt-1">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {movie.vote_average > 0 && (
                <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-accent">
                  <FiStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{formatRating(movie.vote_average)}</span>
                  <span className="text-foreground/60">({movie.vote_count} votes)</span>
                </div>
              )}

              {movie.release_date && (
                <div className="flex items-center space-x-1 text-foreground/60">
                  <FiCalendar className="h-4 w-4" />
                  <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
              )}

              {movie.original_language && (
                <div className="flex items-center space-x-1 text-foreground/60">
                  <FiGlobe className="h-4 w-4" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isFav
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              <FiHeart className={`mr-2 h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            {/* Overview */}
            {movie.overview && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Overview</h2>
                <p className="text-foreground/80 leading-relaxed">{movie.overview}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wide">Popularity</p>
                <p className="font-medium text-foreground">{movie.popularity.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wide">Adult Content</p>
                <p className="font-medium text-foreground">{movie.adult ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop Image */}
        {movie.backdrop_path && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary mt-8">
            <Image
              src={getTMDBImageUrl(movie.backdrop_path, 'large')}
              alt={`${movie.title} backdrop`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
