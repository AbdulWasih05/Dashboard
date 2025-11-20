'use client';

import { useState, useEffect } from 'react';
import { FiX, FiSearch, FiFilm, FiMessageCircle } from 'react-icons/fi';
import { MdOutlineNewspaper } from 'react-icons/md';
import { useDebounce } from '@/hooks/useDebounce';
import { useLazySearchMoviesQuery } from '@/store/api/tmdbApi';
import { useLazySearchNewsQuery } from '@/store/api/newsApi';
import { useLazySearchSocialQuery } from '@/store/api/socialApi';
import { Movie, NewsArticle, SocialPost } from '@/types';
import MovieCard from '../cards/MovieCard';
import NewsCard from '../cards/NewsCard';
import SocialCard from '../cards/SocialCard';
import Loader from '../common/Loader';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchTab = 'movies' | 'news' | 'social';

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('movies');
  const debouncedQuery = useDebounce(query, 500);

  const [searchMovies, { data: moviesData, isLoading: moviesLoading, isFetching: moviesFetching }] = useLazySearchMoviesQuery();
  const [searchNews, { data: newsData, isLoading: newsLoading, isFetching: newsFetching }] = useLazySearchNewsQuery();
  const [searchSocial, { data: socialData, isLoading: socialLoading, isFetching: socialFetching }] = useLazySearchSocialQuery();

  const isLoading = moviesLoading || newsLoading || socialLoading;
  const isFetching = moviesFetching || newsFetching || socialFetching;

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      searchMovies({ query: debouncedQuery });
      searchNews({ query: debouncedQuery });
      searchSocial({ query: debouncedQuery });
    }
  }, [debouncedQuery, searchMovies, searchNews, searchSocial]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setActiveTab('movies');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const moviesCount = moviesData?.results?.length || 0;
  const newsCount = newsData?.articles?.length || 0;
  const socialCount = socialData?.posts?.length || 0;
  const totalResults = moviesCount + newsCount + socialCount;

  const tabs: { id: SearchTab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'movies', label: 'Movies', icon: <FiFilm className="h-4 w-4" />, count: moviesCount },
    { id: 'news', label: 'News', icon: <MdOutlineNewspaper className="h-4 w-4" />, count: newsCount },
    { id: 'social', label: 'Social', icon: <FiMessageCircle className="h-4 w-4" />, count: socialCount },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-card rounded-lg shadow-2xl border border-border max-h-[80vh] overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <FiSearch className="h-5 w-5 text-foreground/60" />
            <input
              type="text"
              placeholder="Search movies, news, and social posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none text-lg"
              autoFocus
            />
            {(isLoading || isFetching) && <Loader size="sm" />}
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg"
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {debouncedQuery && (
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-primary-500/20 text-primary-500'
                      : 'bg-foreground/10 text-foreground/60'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Initial State */}
          {!debouncedQuery && (
            <div className="text-center py-12 text-foreground/60">
              <FiSearch className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Search across movies, news, and social posts...</p>
            </div>
          )}

          {/* No Results */}
          {debouncedQuery && !isLoading && !isFetching && totalResults === 0 && (
            <div className="text-center py-12 text-foreground/60">
              <p>No results found for "{debouncedQuery}"</p>
            </div>
          )}

          {/* Movies Results */}
          {activeTab === 'movies' && moviesData && moviesData.results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {moviesData.results.slice(0, 12).map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {activeTab === 'movies' && debouncedQuery && !moviesLoading && !moviesFetching && moviesCount === 0 && (
            <div className="text-center py-12 text-foreground/60">
              <FiFilm className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>No movies found for "{debouncedQuery}"</p>
            </div>
          )}

          {/* News Results */}
          {activeTab === 'news' && newsData && newsData.articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.articles.slice(0, 9).map((article: NewsArticle) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {activeTab === 'news' && debouncedQuery && !newsLoading && !newsFetching && newsCount === 0 && (
            <div className="text-center py-12 text-foreground/60">
              <MdOutlineNewspaper className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>No news articles found for "{debouncedQuery}"</p>
            </div>
          )}

          {/* Social Results */}
          {activeTab === 'social' && socialData && socialData.posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialData.posts.slice(0, 8).map((post: SocialPost) => (
                <SocialCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {activeTab === 'social' && debouncedQuery && !socialLoading && !socialFetching && socialCount === 0 && (
            <div className="text-center py-12 text-foreground/60">
              <FiMessageCircle className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>No social posts found for "{debouncedQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
