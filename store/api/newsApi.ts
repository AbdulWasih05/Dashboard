import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse } from '@/types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/news',
  }),
  tagTypes: ['News'],
  // News data changes frequently but can be cached
  keepUnusedDataFor: 300,
  // Refetch on reconnect for fresh news
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, { category?: string; page?: number }>({
      query: ({ category = 'general', page = 1 }) =>
        `/top-headlines?category=${category}&page=${page}`,
      providesTags: ['News'],
      // Headlines change often, keep for 5 minutes
      keepUnusedDataFor: 300,
    }),
    searchNews: builder.query<NewsResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) =>
        `/search?q=${encodeURIComponent(query)}&page=${page}`,
      // Search results can be cached shorter
      keepUnusedDataFor: 180,
    }),
    getNewsByCategory: builder.query<NewsResponse, { category: string; page?: number }>({
      query: ({ category, page = 1 }) =>
        `/category/${category}?page=${page}`,
      providesTags: ['News'],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetTopHeadlinesQuery,
  useSearchNewsQuery,
  useLazySearchNewsQuery,
  useGetNewsByCategoryQuery,
} = newsApi;
