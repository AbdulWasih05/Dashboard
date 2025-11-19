# Personalized Content Dashboard

A modern, interactive dashboard built with Next.js that aggregates movies from TMDB and weather data from Open-Meteo, providing a personalized user experience with real-time content updates.

## Features

### Core Features ✅
- **Movie Discovery**: Browse trending, popular, top-rated, and upcoming movies
- **Real-time Weather**: Local weather information with hourly forecasts
- **Smart Search**: Debounced search functionality with instant results
- **Favorites System**: Save and manage your favorite movies
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **User Preferences**: Customizable content categories with localStorage persistence
- **Smooth Animations**: Enhanced UX with Framer Motion animations
- **Type Safety**: Full TypeScript implementation

### Technical Highlights
- **Next.js 16** with App Router and Turbopack
- **Redux Toolkit** with RTK Query for state management and API caching
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations
- **Server-side API Routes** for secure TMDB API key management
- **Client-side Weather API** (Open-Meteo - no API key required!)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- TMDB API key (free - get it from https://www.themoviedb.org/settings/api)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # TMDB API Key (get from https://www.themoviedb.org/settings/api)
   TMDB_API_KEY=your_tmdb_api_key_here

   # Public Configuration
   NEXT_PUBLIC_APP_NAME="Personalized Content Dashboard"
   NEXT_PUBLIC_WEATHER_API_URL="https://api.open-meteo.com/v1"
   NEXT_PUBLIC_TMDB_IMAGE_BASE="https://image.tmdb.org/t/p"
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Test your TMDB API key** (Optional but recommended)
   Before using the dashboard, verify your API key is working:
   - Navigate to [http://localhost:3000/test](http://localhost:3000/test)
   - Click "Test API Key"
   - You should see a success message with a sample movie

   Or test via the API endpoint directly:
   - Navigate to [http://localhost:3000/api/test](http://localhost:3000/api/test)
   - You should see a JSON response with `"success": true`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
pgagi/
├── app/                          # Next.js App Router
│   ├── api/tmdb/                # Server-side API routes (TMDB proxy)
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles with Tailwind
├── components/                   # React components
│   ├── cards/                   # Movie and weather cards
│   ├── common/                  # Reusable UI components
│   ├── dashboard/               # Dashboard sections
│   ├── layout/                  # Header and navigation
│   ├── providers/               # Redux provider
│   ├── search/                  # Search modal
│   └── settings/                # Settings modal
├── store/                        # Redux store
│   ├── api/                     # RTK Query API services
│   ├── slices/                  # Redux slices
│   ├── index.ts                 # Store configuration
│   └── hooks.ts                 # Typed Redux hooks
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
├── hooks/                        # Custom React hooks
└── lib/                          # Library configurations
```

## Key Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **React Hot Toast**: Toast notifications
- **React Icons**: Icon library
- **date-fns**: Date formatting

## API Configuration

### TMDB API (Movies)
- **Endpoint**: `https://api.themoviedb.org/3`
- **Authentication**: API Key (stored in environment variables)
- **Features**: Trending, Popular, Top Rated, Upcoming movies, Search
- **Security**: Protected via Next.js API routes (server-side)

### Open-Meteo API (Weather)
- **Endpoint**: `https://api.open-meteo.com/v1`
- **Authentication**: None required (completely free!)
- **Features**: Current weather, hourly forecast, daily forecast
- **Location**: Uses browser geolocation

## Features in Detail

### Movie Discovery
- Browse multiple categories: Trending, Popular, Top Rated, Upcoming
- View movie details including ratings, posters, and release dates
- Add movies to favorites with one click

### Weather Widget
- Auto-detects your location (or uses default)
- Displays current temperature and conditions
- Shows hourly forecast for the next 8 hours
- Beautiful gradient design with weather icons

### Search
- Real-time movie search with debouncing
- Displays up to 12 results
- Modal interface for focused searching

### Personalization
- Toggle content categories on/off
- Dark/Light mode preference
- Favorites persist in localStorage
- User preferences saved locally

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface
- Optimized images with Next.js Image

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

All sensitive data (like TMDB API key) is stored server-side and never exposed to the client. Weather API requires no authentication.

## Future Enhancements (Potential)

- Drag-and-drop card reordering
- User authentication with NextAuth.js if backend is hosted..
- Database sync for cross-device favorites
- Real-time content updates via WebSockets
- Progressive Web App (PWA) features
- Advanced recommendation engine

## Deployment

### Recommended: Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `TMDB_API_KEY`
4. Deploy!

The app automatically configures for production builds.

### Alternative: Netlify, Railway, or any Node.js host

Works with any platform that supports Next.js.


## Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Built with [Next.js](https://nextjs.org/)
