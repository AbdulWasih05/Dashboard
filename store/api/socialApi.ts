import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialPost } from '@/types';

interface SocialFeedResponse {
  posts: SocialPost[];
  hasMore: boolean;
  nextCursor?: string;
}

interface SocialSearchResponse {
  posts: SocialPost[];
  totalResults: number;
}

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/social',
  }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getFeed: builder.query<SocialFeedResponse, { page?: number; hashtag?: string }>({
      query: ({ page = 1, hashtag }) => {
        const params = new URLSearchParams({ page: String(page) });
        if (hashtag) params.append('hashtag', hashtag);
        return `/feed?${params}`;
      },
      providesTags: ['Social'],
    }),
    getTrending: builder.query<SocialFeedResponse, void>({
      query: () => '/trending',
      providesTags: ['Social'],
    }),
    searchSocial: builder.query<SocialSearchResponse, { query: string }>({
      query: ({ query }) => `/search?q=${encodeURIComponent(query)}`,
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetTrendingQuery: useGetSocialTrendingQuery,
  useSearchSocialQuery,
  useLazySearchSocialQuery,
} = socialApi;
