'use client';

import { useRef, useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/store/hooks';
import { useGetCurrentWeatherQuery } from '@/store/api/weatherApi';
import { useGetTrendingQuery } from '@/store/api/tmdbApi';
import { useGetTopHeadlinesQuery } from '@/store/api/newsApi';
import { useGetFeedQuery } from '@/store/api/socialApi';
import WeatherCard from '../cards/WeatherCard';
import MovieCard from '../cards/MovieCard';
import { SkeletonGrid, WeatherCardSkeleton } from '../common/CardSkeleton';
import { FiMessageCircle, FiFilm, FiFileText } from 'react-icons/fi';
import { WidgetType } from '@/types';

// Dynamically import below-fold card components
const NewsCard = dynamic(() => import('../cards/NewsCard'), {
  loading: () => <div className="h-48 md:h-64 bg-secondary skeleton rounded-lg" />,
});

const SocialCard = dynamic(() => import('../cards/SocialCard'), {
  loading: () => <div className="h-40 md:h-48 bg-secondary skeleton rounded-lg" />,
});

// Custom hook for Intersection Observer
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Once element is in view, keep it true (don't unload data)
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { rootMargin: '100px', ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

export default function OverviewDashboard() {
  const location = useAppSelector((state) => state.user.preferences.location);
  const widgets = useAppSelector((state) => state.dashboard.widgets);

  // Refs for lazy loading below-fold content
  const newsSection = useInView();
  const socialSection = useInView();

  // Above-fold queries - load immediately
  const { data: weatherData } = useGetCurrentWeatherQuery(
    location || { latitude: 12.9716, longitude: 77.5946 },
    { skip: !location }
  );

  const { data: trendingMovies, isLoading: moviesLoading } = useGetTrendingQuery(
    { timeWindow: 'week' }
  );

  // Below-fold queries - lazy load when section comes into view
  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery(
    { category: 'general' },
    { skip: !newsSection.isInView }
  );

  const { data: socialData, isLoading: socialLoading } = useGetFeedQuery(
    { page: 1 },
    { skip: !socialSection.isInView }
  );

  const renderWidget = (widgetType: WidgetType) => {
    switch (widgetType) {
      case 'weather':
        return (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4 flex items-center">
              <span className="mr-2">🌤️</span>
              Weather
            </h2>
            {weatherData ? (
              <WeatherCard weather={weatherData} city={location?.city} />
            ) : (
              <WeatherCardSkeleton />
            )}
          </section>
        );

      case 'trending':
        return (
          <section>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center">
                <FiFilm className="mr-2 h-5 w-5 md:h-6 md:w-6 text-primary-500" />
                Trending Movies
              </h2>
              <a
                href="/movies"
                className="text-primary-500 hover:text-primary-600 text-xs md:text-sm font-medium"
              >
                View All →
              </a>
            </div>

            {moviesLoading ? (
              <SkeletonGrid count={4} />
            ) : trendingMovies && trendingMovies.results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {trendingMovies.results.slice(0, 4).map((movie, index) => (
                  <MovieCard key={movie.id} movie={movie} priority={index < 2} />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-6 md:py-8 text-sm md:text-base">No trending movies found</p>
            )}
          </section>
        );

      case 'news':
        return (
          <section ref={newsSection.ref}>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center">
                <FiFileText className="mr-2 h-5 w-5 md:h-6 md:w-6 text-primary-500" />
                Latest News
              </h2>
              <a
                href="/news"
                className="text-primary-500 hover:text-primary-600 text-xs md:text-sm font-medium"
              >
                View All →
              </a>
            </div>

            {!newsSection.isInView || newsLoading ? (
              <SkeletonGrid count={3} variant="news" />
            ) : newsData && newsData.articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {newsData.articles.slice(0, 3).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-6 md:py-8 text-sm md:text-base">No news articles found</p>
            )}
          </section>
        );

      case 'social':
        return (
          <section ref={socialSection.ref}>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center">
                <FiMessageCircle className="mr-2 h-5 w-5 md:h-6 md:w-6 text-primary-500" />
                Social Feed
              </h2>
              <a
                href="/social"
                className="text-primary-500 hover:text-primary-600 text-xs md:text-sm font-medium"
              >
                View All →
              </a>
            </div>

            {!socialSection.isInView || socialLoading ? (
              <SkeletonGrid count={2} variant="social" />
            ) : socialData && socialData.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {socialData.posts.slice(0, 2).map((post) => (
                  <SocialCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-6 md:py-8 text-sm md:text-base">No social posts found</p>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  // Filter visible widgets and sort by order
  const visibleWidgets = widgets
    .filter((w) => w.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section - renders immediately for fast LCP */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-sm md:text-base text-foreground/60">
          Stay updated with trending movies, latest news, social feeds, and weather
        </p>
      </div>

      {/* Widget Sections */}
      {visibleWidgets.map((widget) => {
        const content = renderWidget(widget.id);
        if (!content) return null;

        return (
          <div key={widget.id}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
