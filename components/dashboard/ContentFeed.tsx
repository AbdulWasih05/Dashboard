'use client';

import { useAppSelector } from '@/store/hooks';
import {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
} from '@/store/api/tmdbApi';
import MovieCard from '../cards/MovieCard';
import { SkeletonGrid } from '../common/CardSkeleton';
import { MOVIE_CATEGORIES } from '@/utils/constants';

export default function ContentFeed() {
  const categories = useAppSelector((state) => state.user.preferences.categories);

  const { data: popularData, isLoading: popularLoading } = useGetPopularQuery(
    { page: 1 },
    { skip: !categories.includes('popular') }
  );

  const { data: topRatedData, isLoading: topRatedLoading } = useGetTopRatedQuery(
    { page: 1 },
    { skip: !categories.includes('top_rated') }
  );

  const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcomingQuery(
    { page: 1 },
    { skip: !categories.includes('upcoming') }
  );

  const sections = [
    {
      id: 'popular',
      data: popularData,
      isLoading: popularLoading,
      category: MOVIE_CATEGORIES.find((c) => c.id === 'popular'),
    },
    {
      id: 'top_rated',
      data: topRatedData,
      isLoading: topRatedLoading,
      category: MOVIE_CATEGORIES.find((c) => c.id === 'top_rated'),
    },
    {
      id: 'upcoming',
      data: upcomingData,
      isLoading: upcomingLoading,
      category: MOVIE_CATEGORIES.find((c) => c.id === 'upcoming'),
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map(
        (section) =>
          categories.includes(section.id) && (
            <section key={section.id}>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">{section.category?.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">
                  {section.category?.label}
                </h2>
              </div>

              {section.isLoading ? (
                <SkeletonGrid count={10} />
              ) : section.data && section.data.results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {section.data.results.slice(0, 10).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground/60 py-8">
                  No {section.category?.label.toLowerCase()} movies found
                </p>
              )}
            </section>
          )
      )}
    </div>
  );
}
