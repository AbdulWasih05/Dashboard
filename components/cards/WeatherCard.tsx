'use client';

import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import { WeatherData } from '@/types';
import { getWeatherInfo } from '@/utils/helpers';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTemperatureUnit } from '@/store/slices/userSlice';

interface WeatherCardProps {
  weather: WeatherData;
  city?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date;
}

// Weather-based gradient mappings
const getWeatherGradient = (code: number, isNight: boolean): string => {
  if (isNight) {
    if (code === 0) return 'from-slate-800 to-indigo-900';
    if (code <= 3) return 'from-slate-700 to-slate-800';
    if (code >= 95) return 'from-slate-900 to-purple-900';
    return 'from-slate-700 to-slate-900';
  }

  if (code === 0) return 'from-sky-400 to-blue-500';
  if (code <= 3) return 'from-blue-400 to-slate-500';
  if (code === 45 || code === 48) return 'from-gray-400 to-gray-500';
  if (code >= 51 && code <= 67) return 'from-slate-500 to-blue-600';
  if (code >= 71 && code <= 86) return 'from-slate-300 to-blue-300';
  if (code >= 95) return 'from-slate-700 to-purple-800';

  return 'from-blue-500 to-purple-600';
};

// Get weather severity for alerts
const getWeatherSeverity = (code: number): { level: string; message: string; color: string } | null => {
  if (code >= 95) return { level: 'severe', message: 'Thunderstorm Warning', color: 'bg-red-500' };
  if (code >= 75 || code === 65 || code === 67) return { level: 'moderate', message: 'Heavy Precipitation', color: 'bg-yellow-500' };
  if (code === 45 || code === 48) return { level: 'info', message: 'Fog - Low Visibility', color: 'bg-blue-400' };
  return null;
};

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours}h ago`;
};

// Get day name from date string
const getDayName = (dateStr: string, index: number): string => {
  if (index === 0) return 'Today';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default function WeatherCard({
  weather,
  city = 'Your Location',
  onRefresh,
  isRefreshing = false,
  lastUpdated = new Date(),
}: WeatherCardProps) {
  const dispatch = useAppDispatch();
  const temperatureUnit = useAppSelector((state) => state.user.preferences.temperatureUnit) || 'celsius';
  const weatherInfo = getWeatherInfo(weather.current_weather.weathercode);

  const currentHour = new Date().getHours();
  const isNight = currentHour >= 20 || currentHour < 6;
  const gradient = getWeatherGradient(weather.current_weather.weathercode, isNight);
  const severity = getWeatherSeverity(weather.current_weather.weathercode);

  const formatTemp = (celsius: number): string => {
    if (temperatureUnit === 'fahrenheit') {
      return `${Math.round((celsius * 9) / 5 + 32)}°`;
    }
    return `${Math.round(celsius)}°`;
  };

  const getIcon = (code: number): string => {
    if (code === 0 && isNight) return '🌙';
    return getWeatherInfo(code).icon;
  };

  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const toggleUnit = () => {
    dispatch(setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div
      className={`card-animate relative overflow-hidden rounded-lg bg-gradient-to-br ${gradient} p-4 md:p-6 text-white shadow-lg`}
    >
      <div className="relative z-10">
        {/* Weather Alert Banner */}
        {severity && (
          <div
            className={`${severity.color} px-2 py-1.5 rounded-lg mb-3 flex items-center text-xs`}
          >
            <FiAlertTriangle className="mr-1.5 h-3 w-3" />
            <span className="font-medium">{severity.message}</span>
          </div>
        )}

        {/* Header with refresh */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] md:text-xs opacity-70">
            Updated {formatRelativeTime(lastUpdated)}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleUnit}
              className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] md:text-xs hover:bg-white/30 transition-colors"
            >
              °C/°F
            </button>
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-1 rounded bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <FiRefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Main weather display */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs md:text-sm opacity-90">{city}</p>
            <h3 className="text-4xl md:text-5xl font-bold mt-1">
              {formatTemp(weather.current_weather.temperature)}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-4xl md:text-5xl">{getIcon(weather.current_weather.weathercode)}</span>
            <p className="mt-1 text-xs md:text-sm opacity-90">{weatherInfo.description}</p>
          </div>
        </div>

        {/* Wind and High/Low */}
        <div className="mt-3 md:mt-4 flex items-center justify-between border-t border-white/20 pt-3">
          <div className="flex items-center space-x-2">
            {/* Wind compass */}
            <div className="relative w-6 h-6 md:w-8 md:h-8">
              <svg className="w-full h-full" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <path
                  d="M16 6 L14 12 L16 10 L18 12 Z"
                  fill="white"
                  transform={`rotate(${weather.current_weather.winddirection}, 16, 16)`}
                />
              </svg>
            </div>
            <div className="text-xs md:text-sm">
              <div>{Math.round(weather.current_weather.windspeed)} km/h</div>
              <div className="text-[10px] opacity-70">{getWindDirection(weather.current_weather.winddirection)}</div>
            </div>
          </div>

          {weather.daily && weather.daily.temperature_2m_max[0] && (
            <div className="text-xs md:text-sm">
              <span className="opacity-70">H:</span> {formatTemp(weather.daily.temperature_2m_max[0])}{' '}
              <span className="opacity-70">L:</span> {formatTemp(weather.daily.temperature_2m_min[0])}
            </div>
          )}
        </div>

        {/* Hourly forecast - compact on mobile */}
        {weather.hourly && (
          <div className="mt-3 md:mt-4">
            <p className="text-[10px] md:text-xs opacity-70 mb-1.5">Hourly</p>
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {weather.hourly.time.slice(0, 6).map((time, index) => {
                const hour = new Date(time).getHours();
                const temp = weather.hourly!.temperature_2m[index];
                const code = weather.hourly!.weathercode[index];

                return (
                  <div
                    key={time}
                    className="flex flex-col items-center rounded-lg bg-white/10 px-2 py-1.5 min-w-[44px] md:min-w-[50px]"
                  >
                    <span className="text-[9px] md:text-[10px] opacity-70">{hour}:00</span>
                    <span className="text-sm md:text-base">{getWeatherInfo(code).icon}</span>
                    <span className="text-[10px] md:text-xs font-medium">{formatTemp(temp)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7-Day Forecast - horizontal scroll */}
        {weather.daily && weather.daily.time.length > 1 && (
          <div className="mt-3 md:mt-4 border-t border-white/20 pt-3">
            <p className="text-[10px] md:text-xs opacity-70 mb-1.5">7-Day</p>
            <div className="flex space-x-1.5 overflow-x-auto pb-1">
              {weather.daily.time.slice(0, 7).map((date, index) => {
                const code = weather.daily!.weathercode?.[index] || 0;
                const maxTemp = weather.daily!.temperature_2m_max[index];
                const minTemp = weather.daily!.temperature_2m_min[index];

                return (
                  <div
                    key={date}
                    className="flex flex-col items-center text-center px-1.5 py-1 rounded-lg bg-white/10 min-w-[42px] md:min-w-[48px]"
                  >
                    <span className="text-[8px] md:text-[9px] opacity-70">{getDayName(date, index)}</span>
                    <span className="text-sm md:text-base">{getWeatherInfo(code).icon}</span>
                    <div className="text-[8px] md:text-[9px]">
                      <span className="font-bold">{Math.round(maxTemp)}°</span>
                      <span className="opacity-60"> {Math.round(minTemp)}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-10 -bottom-10 h-32 w-32 md:h-40 md:w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -top-10 h-32 w-32 md:h-40 md:w-40 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}
