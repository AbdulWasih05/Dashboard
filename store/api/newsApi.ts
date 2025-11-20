import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsArticle, NewsResponse } from '@/types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/news',
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, { category?: string; page?: number }>({
      query: ({ category = 'general', page = 1 }) =>
        `/top-headlines?category=${category}&page=${page}`,
      providesTags: ['News'],
    }),
    searchNews: builder.query<NewsResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) =>
        `/search?q=${encodeURIComponent(query)}&page=${page}`,
    }),
    getNewsByCategory: builder.query<NewsResponse, { category: string; page?: number }>({
      query: ({ category, page = 1 }) =>
        `/category/${category}?page=${page}`,
      providesTags: ['News'],
    }),
  }),
});

export const {
  useGetTopHeadlinesQuery,
  useSearchNewsQuery,
  useLazySearchNewsQuery,
  useGetNewsByCategoryQuery,
} = newsApi;
