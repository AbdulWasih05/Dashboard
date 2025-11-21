import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { Movie, TMDBResponse, Genre } from '@/types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/tmdb',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Movies', 'Trending'],
  // Keep unused data in cache for 5 minutes to reduce refetches
  keepUnusedDataFor: 300,
  // Refetch on reconnect for better offline experience
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTrending: builder.query<TMDBResponse<Movie>, { timeWindow?: 'day' | 'week' }>({
      query: ({ timeWindow = 'week' }) => `/trending?timeWindow=${timeWindow}`,
      providesTags: ['Trending'],
      // Trending data is relatively stable, keep for 10 minutes
      keepUnusedDataFor: 600,
    }),
    getPopular: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/popular?page=${page}`,
      providesTags: ['Movies'],
    }),
    getTopRated: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/top-rated?page=${page}`,
      providesTags: ['Movies'],
      // Top rated is very stable, keep for 15 minutes
      keepUnusedDataFor: 900,
    }),
    getUpcoming: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/upcoming?page=${page}`,
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<TMDBResponse<Movie>, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => `/search?query=${encodeURIComponent(query)}&page=${page}`,
      // Search results can be cached for shorter time
      keepUnusedDataFor: 180,
    }),
    getGenres: builder.query<{ genres: Genre[] }, void>({
      query: () => '/genres',
      // Genres are very static, cache for 30 minutes
      keepUnusedDataFor: 1800,
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: (id) => `/movie/${id}`,
      // Movie details are stable, cache for 15 minutes
      keepUnusedDataFor: 900,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
  useSearchMoviesQuery,
  useLazySearchMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
