import { WEATHER_CODES, TMDB_IMAGE_BASE, IMAGE_SIZES } from './constants';
import { format } from 'date-fns';

// Get weather description and icon from code
export const getWeatherInfo = (code: number) => {
  return WEATHER_CODES[code] || { description: 'Unknown', icon: '❓' };
};

// Build TMDB image URL
export const getTMDBImageUrl = (
  path: string | null,
  size: 'small' | 'medium' | 'large' | 'original' = 'medium',
  type: 'poster' | 'backdrop' = 'poster'
): string => {
  if (!path) return '/placeholder-movie.jpg';

  const sizeKey = type === 'poster' ? IMAGE_SIZES.poster[size] : IMAGE_SIZES.backdrop[size];
  return `${TMDB_IMAGE_BASE}/${sizeKey}${path}`;
};

// Format date
export const formatDate = (dateString: string, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    return format(new Date(dateString), formatStr);
  } catch {
    return dateString;
  }
};

// Format rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Get user's geolocation
export const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Check if item is favorited
export const isFavorited = (itemId: string, favorites: Array<{ id: string }>): boolean => {
  return favorites.some((fav) => fav.id === itemId);
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
