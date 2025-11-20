// Weather code mappings for Open-Meteo
export const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌧️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '⛈️' },
  71: { description: 'Slight snow fall', icon: '🌨️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

// TMDB image base URL
export const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

// Image sizes
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
};

// LocalStorage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'dashboard_preferences',
  FAVORITES: 'dashboard_favorites',
  THEME: 'dashboard_theme',
  ONBOARDED: 'dashboard_onboarded',
  DASHBOARD_LAYOUT: 'dashboard_layout',
};

// Default widget configuration for dashboard
export const DEFAULT_WIDGETS = [
  { id: 'weather' as const, label: 'Weather', visible: true, order: 0 },
  { id: 'trending' as const, label: 'Trending Movies', visible: true, order: 1 },
  { id: 'news' as const, label: 'Latest News', visible: true, order: 2 },
  { id: 'social' as const, label: 'Social Feed', visible: true, order: 3 },
];

// News categories for content preferences
export const NEWS_CATEGORIES = [
  { id: 'general', label: 'General', icon: '📰' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
];

// Temperature units for weather settings
export const TEMPERATURE_UNITS = [
  { id: 'celsius', label: '°C', name: 'Celsius' },
  { id: 'fahrenheit', label: '°F', name: 'Fahrenheit' },
];

// Movie categories
export const MOVIE_CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'top_rated', label: 'Top Rated', icon: '👑' },
  { id: 'upcoming', label: 'Upcoming', icon: '📅' },
];

// Default location (Bangalore)
export const DEFAULT_LOCATION = {
  latitude: 12.9716,
  longitude: 77.5946,
  city: 'Bangalore',
};
