'use client';

import { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { useGetTrendingQuery } from '@/store/api/tmdbApi';
import MovieCard from '../cards/MovieCard';
import { SkeletonGrid } from '../common/CardSkeleton';
import Button from '../common/Button';

export default function TrendingSection() {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('week');
  const { data, isLoading, error } = useGetTrendingQuery({ timeWindow });

  if (error) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiTrendingUp className="h-6 w-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-foreground">Trending</h2>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={timeWindow === 'day' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTimeWindow('day')}
          >
            Today
          </Button>
          <Button
            variant={timeWindow === 'week' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </Button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonGrid count={5} />
      ) : data && data.results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.results.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/60 py-8">No trending movies found</p>
      )}
    </section>
  );
}
