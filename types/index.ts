// User types
export interface UserPreferences {
  categories: string[];
  language: string;
  theme: 'light' | 'dark';
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
  };
}

export interface UserState {
  preferences: UserPreferences;
  isOnboarded: boolean;
}

// TMDB Movie types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Weather types
export interface WeatherData {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
    time: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    weathercode: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    precipitation_sum: number[];
  };
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  category?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Social Media types
export interface SocialPost {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  hashtags: string[];
  verified?: boolean;
}

// Content types
export type ContentType = 'movie' | 'tv' | 'weather' | 'news' | 'social';

export interface ContentItem {
  id: string;
  type: ContentType;
  data: Movie | WeatherData | NewsArticle | SocialPost;
  timestamp: number;
}

// Favorites
export interface FavoriteItem {
  id: string;
  type: ContentType;
  data: Movie;
  addedAt: number;
}

// UI State
export interface UIState {
  isSearchOpen: boolean;
  isSettingsOpen: boolean;
  isSidebarOpen: boolean;
  loading: {
    movies: boolean;
    weather: boolean;
    search: boolean;
  };
  error: {
    movies: string | null;
    weather: string | null;
    search: string | null;
  };
}

// Search
export interface SearchState {
  query: string;
  results: Movie[];
  isSearching: boolean;
  error: string | null;
}

// Redux Store
export interface RootState {
  user: UserState;
  ui: UIState;
  favorites: FavoriteItem[];
  search: SearchState;
}
