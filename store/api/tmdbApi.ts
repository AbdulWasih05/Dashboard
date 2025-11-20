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
  endpoints: (builder) => ({
    getTrending: builder.query<TMDBResponse<Movie>, { timeWindow?: 'day' | 'week' }>({
      query: ({ timeWindow = 'week' }) => `/trending?timeWindow=${timeWindow}`,
      providesTags: ['Trending'],
    }),
    getPopular: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/popular?page=${page}`,
      providesTags: ['Movies'],
    }),
    getTopRated: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/top-rated?page=${page}`,
      providesTags: ['Movies'],
    }),
    getUpcoming: builder.query<TMDBResponse<Movie>, { page?: number }>({
      query: ({ page = 1 }) => `/upcoming?page=${page}`,
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<TMDBResponse<Movie>, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => `/search?query=${encodeURIComponent(query)}&page=${page}`,
    }),
    getGenres: builder.query<{ genres: Genre[] }, void>({
      query: () => '/genres',
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: (id) => `/movie/${id}`,
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
