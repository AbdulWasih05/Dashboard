import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData } from '@/types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEATHER_API_URL || 'https://api.open-meteo.com/v1',
  }),
  tagTypes: ['Weather'],
  // Weather data should be kept for reasonable time
  keepUnusedDataFor: 600,
  // Refetch on reconnect for accurate weather
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      WeatherData,
      { latitude: number; longitude: number }
    >({
      query: ({ latitude, longitude }) =>
        `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto`,
      providesTags: ['Weather'],
      // Weather updates frequently, keep for 10 minutes
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useLazyGetCurrentWeatherQuery } = weatherApi;
