'use client';

import { useState, useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAppSelector } from '@/store/hooks';
import { useGetCurrentWeatherQuery } from '@/store/api/weatherApi';
import WeatherCard from '@/components/cards/WeatherCard';
import { LoadingScreen } from '@/components/common/Loader';

// Popular cities with their coordinates
const POPULAR_CITIES = [
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Mysore', latitude: 12.2958, longitude: 76.6394 },
  { name: 'Delhi', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
];

function CityWeatherCard({ city }: { city: typeof POPULAR_CITIES[0] }) {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { data: weatherData, isFetching, refetch } = useGetCurrentWeatherQuery({
    latitude: city.latitude,
    longitude: city.longitude,
  });

  const handleRefresh = useCallback(() => {
    refetch();
    setLastUpdated(new Date());
  }, [refetch]);

  if (!weatherData) return null;

  return (
    <WeatherCard
      weather={weatherData}
      city={city.name}
      onRefresh={handleRefresh}
      isRefreshing={isFetching}
      lastUpdated={lastUpdated}
    />
  );
}

export default function WeatherPage() {
  const location = useAppSelector((state) => state.user.preferences.location);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { data: weatherData, isLoading, isFetching, refetch } = useGetCurrentWeatherQuery(
    location || { latitude: 12.9716, longitude: 77.5946 },
    { skip: !location }
  );

  const handleRefresh = useCallback(() => {
    refetch();
    setLastUpdated(new Date());
  }, [refetch]);

  if (!location || isLoading) {
    return (
      <MainLayout>
        <LoadingScreen />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Weather</h1>
        <p className="text-foreground/60">
          Current weather conditions and forecast for popular cities
        </p>
      </div>

      {/* User's location */}
      {weatherData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Location</h2>
          <div className="max-w-2xl">
            <WeatherCard
              weather={weatherData}
              city={location.city}
              onRefresh={handleRefresh}
              isRefreshing={isFetching}
              lastUpdated={lastUpdated}
            />
          </div>
        </div>
      )}

      {/* Popular Cities */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Popular Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_CITIES.map((city) => (
            <CityWeatherCard key={city.name} city={city} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
