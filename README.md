<!-- filepath: c:\Users\Home\Desktop\assignments\pgagi\README.md -->
# Personalized Content Dashboard

> **SDE Intern - Frontend Development Assignment**  
> A dynamic, user-centric dashboard integrating multiple content sources with personalized feeds, interactive UI, and comprehensive state management.

## Quick Links

[Assignment Context](#assignment-context) • [Live Demo](#live-demo--submission) • [Core Features](#core-features-implementation) • [Technology Stack](#technology-stack) • [Quick Start](#quick-start) • [Testing](#testing) • [API Integration](#api-integration) • [Project Structure](#project-structure) • [Implementation Details](#key-implementation-details) • [Best Practices](#best-practices) • [Security](#security) • [Known Issues](#known-issues) • [Future Enhancements](#future-enhancements)

---

## Assignment Context

This project demonstrates proficiency in modern frontend development by creating an interactive dashboard where users can track and customize their content experience across multiple data sources (movies, news, social feeds, and weather).

**Key Challenges Addressed:**
- Frontend architecture with Next.js 16 and React 19
- Complex state management using Redux Toolkit
- Multi-API integration with proper error handling
- Interactive UI/UX with drag-and-drop functionality
- Comprehensive testing strategy (93+ test cases)

## Live Demo & Submission

- **GitHub Repository**: [github.com/AbdulWasih05/Personalized-Content-Dashboard](https://github.com/AbdulWasih05/Personalized-Content-Dashboard)
- **Live Demo**: (https://personal-dashboard-nextjs.vercel.app/)

---

## Core Features Implementation

### 1. Personalized Content Feed ✅
**User Preferences**
- Customizable content categories (Movies, News, Social, Weather)
- Settings panel for category management
- LocalStorage persistence with Redux Persist

**Multi-API Data Fetching**
- **TMDB API**: Movie recommendations based on trending/popular categories
- **NewsAPI**: Latest news articles by user-selected categories
- **Social Feed**: Mock social media posts with engagement metrics
- **Open-Meteo API**: Real-time weather data (no API key required)

**Interactive Content Cards**
- Rich media cards with images, headlines, and descriptions
- Call-to-action buttons ("View Details", "Add to Favorites")
- Infinite scroll implementation using react-intersection-observer
- Loading states and error handling

### 2. Dashboard Layout ✅
**Responsive Design**
- Sidebar navigation (desktop) with mobile hamburger menu
- Top header with search bar, dark mode toggle, and user settings
- Fully responsive across mobile, tablet, and desktop

**Key Sections**
- **Overview Dashboard**: Unified feed of all content types
- **Trending Section**: Top trending movies and news
- **Favorites Section**: User-bookmarked content with drag-and-drop reordering
- **Dedicated Pages**: Separate views for Movies, News, Social, and Weather

### 3. Search Functionality ✅
- Debounced search (500ms delay) for performance optimization
- Real-time movie search across TMDB database
- Modal-based search UI with responsive grid layout
- Loading, empty, and error states handled gracefully

### 4. Advanced UI/UX Features ✅
**Drag-and-Drop**
- React DnD implementation for reordering favorites
- Smooth drag preview with visual feedback
- Persistent order saved in Redux and localStorage

**Dark Mode**
- Toggle between light and dark themes
- CSS custom properties with Tailwind CSS
- Theme preference persisted across sessions

**Animations & Interactions**
- CSS animations for smooth transitions
- Card hover effects and loading spinners
- Responsive toast notifications using react-hot-toast

### 5. State Management ✅
- **Redux Toolkit** for global state management
- **RTK Query** for API caching and data fetching
- **Redux Persist** for localStorage synchronization
- Async logic handled via RTK Query endpoints
- 4 Redux slices managing user preferences, UI state, favorites, and search

### 6. Testing Coverage ✅
**Unit Tests (60+ cases)**
- Component testing with React Testing Library
- Custom hooks testing (useDebounce, useDarkMode, useLocalStorage)
- Redux slice testing (actions, reducers, state updates)
- Utility function testing

**E2E Tests (33+ cases)**
- Cypress test suites covering:
  - User navigation flows
  - Search functionality
  - Favorites management
  - Dark mode persistence
  - Settings modal interactions

---

## Technology Stack

**Framework & Core**
- Next.js 16 (App Router, Turbopack, Server Components)
- React 19 with TypeScript
- Tailwind CSS 3 for styling

**State Management**
- Redux Toolkit with RTK Query
- Redux Persist for localStorage sync
- Async state handled via RTK Query endpoints

**UI/UX Libraries**
- React DnD (drag-and-drop)
- React Intersection Observer (infinite scroll)
- React Hot Toast (notifications)
- React Icons (icon system)

**Testing Stack**
- Jest 30 + React Testing Library (unit tests)
- Cypress (E2E testing)
- 93+ total test cases

**APIs Integrated**
- TMDB API (movies)
- NewsAPI (news articles with mock fallback)
- Open-Meteo (weather - no API key needed)
- Mock Social API (social feeds)

---

## Quick Start

### Option 1: Docker Setup (Fastest) 🐳

Get running in 5 minutes without Node.js installation:

#### Prerequisites
- Docker Desktop installed 

#### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdulWasih05/Personalized-Content-Dashboard.git
   cd Personalized-Content-Dashboard
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit .env.local and add your API keys
   ```

3. **Start with Docker Compose**
   ```bash
   npm run docker:up
   ```
   
   Or without npm:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

#### Docker Commands

```bash
npm run docker:up        # Start containers
npm run docker:down      # Stop containers
npm run docker:logs      # View logs
npm run docker:restart   # Restart containers
npm run docker:build     # Rebuild image
npm run docker:clean     # Remove all containers & volumes
```

📖 **Detailed Docker Setup Guide**: See [DOCKER_SETUP.md](DOCKER_SETUP.md) for troubleshooting and advanced configuration.

---

### Option 2: Local Development

For active development with hot-reloading:

#### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- TMDB API key (required)
- NewsAPI key (optional - uses mock data if not provided)

#### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdulWasih05/Personalized-Content-Dashboard.git
   cd Personalized-Content-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file:
   ```bash
   # TMDB API Key (Required)
   TMDB_API_KEY=your_tmdb_api_key_here

   # News API Key (Optional - uses mock data if not provided)
   NEWS_API_KEY=your_news_api_key_here

   # Public Configuration
   NEXT_PUBLIC_APP_NAME="Personalized Content Dashboard"
   NEXT_PUBLIC_WEATHER_API_URL="https://api.open-meteo.com/v1"
   NEXT_PUBLIC_TMDB_IMAGE_BASE="https://image.tmdb.org/t/p"
   ```

   **Get API Keys:**
   - TMDB: https://www.themoviedb.org/settings/api (Free, required)
   - NewsAPI: https://newsapi.org/register (Optional, 500 requests/day free)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Test your TMDB API key** (Optional)
   Navigate to [http://localhost:3000/test](http://localhost:3000/test)

#### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run cypress          # Open Cypress UI
npm run cypress:headless # Run Cypress headless
npm run test:e2e         # Start server + run E2E tests

# Docker (if needed)
npm run docker:up        # Start with Docker
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs
npm run docker:restart   # Restart containers
npm run docker:build     # Rebuild Docker image
npm run docker:clean     # Clean Docker volumes
```

📖 **Detailed  Setup Guide**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting and advanced configuration.


---

## Testing

### Unit Tests (60+ cases)
```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Coverage includes:**
- UI components (Button, MovieCard, NewsCard, SocialCard)
- Custom hooks (useDebounce, useDarkMode, useLocalStorage)
- Redux slices (actions, reducers, state)
- Utility functions

### E2E Tests (33+ cases)
```bash
npm run cypress              # Open Cypress UI
npm run test:e2e             # Run with server
```

**Test scenarios:**
- Navigation flows
- Search functionality with debouncing
- Favorites management and persistence
- Dark mode toggling
- Settings modal interactions

---

## API Integration

### TMDB API (Movies)
- Server-side proxy protecting API keys
- Endpoints: trending, popular, top-rated, search
- 5-minute caching with Next.js ISR
- 20M+ movies database

### NewsAPI (News)
- Category-based news fetching
- Mock data fallback if no API key
- Server-side proxy for security
- 5-minute caching

### Open-Meteo API (Weather)
- Free, no registration required
- Current conditions + 7-day forecast
- No API key needed
- Real-time data

### Social Feed (Mock)
- Server-generated mock data
- Realistic engagement metrics
- Hashtag and verification support
- Pagination enabled

---

## Project Structure

```
├── app/                   # Next.js App Router (31 API routes, 7 pages)
├── components/            # 25+ React components (cards, layout, dashboard)
├── store/                 # Redux (4 slices + 4 RTK Query APIs)
├── hooks/                 # Custom hooks (useDebounce, useDarkMode, etc.)
├── utils/                 # Helper functions and constants
├── types/                 # TypeScript definitions
├── __tests__/             # 60+ unit tests
└── cypress/               # 33+ E2E tests
```

**Project Stats:** 80+ TypeScript files | 25+ components | 93+ tests | 5000+ lines of code

---

## Key Implementation Details

### Drag-and-Drop
- React DnD with HTML5 backend
- Smooth drag previews with opacity feedback
- Order persisted in Redux + localStorage
- Optimized with useCallback

### Infinite Scroll
- react-intersection-observer (50% visibility threshold)
- Loading states and end-of-content messaging
- Prevents excessive API calls

### Search System
- 500ms debounce delay (lodash)
- Full-screen modal with responsive grid
- Handles loading, empty, and error states

### Dark Mode
- CSS custom properties (35+ variables)
- localStorage persistence via Redux
- Smooth 300ms transitions

---

## Best Practices

**Code Quality**
- TypeScript with strict mode
- ESLint + Prettier formatting
- Modular component architecture
- Custom hooks for reusability

**Performance**
- Next.js code splitting and lazy loading
- RTK Query caching (5-minute invalidation)
- Optimized images (WebP/AVIF)
- Debounced search

**Accessibility**
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader compatible

**Security**
- API keys server-side only
- XSS protection via React
- Environment variables properly managed

---


## Security

- API keys server-side only (never exposed to client)
- Environment variables properly gitignored
- XSS protection via React
- Type safety prevents runtime errors

---

## Known Issues

### NewsAPI Free Tier Limitations
Some news sources return incomplete data (missing images, `[Removed]` content) due to NewsAPI's free tier restrictions. The application handles this with:
- Fallback placeholder images
- Mock data when API key is unavailable
- Graceful error handling

### Next.js 16 Middleware Deprecation
The build shows a warning about middleware convention deprecation. This is a Next.js 16 notice - the rate limiting middleware functions correctly. Migration to the new proxy convention is planned for when the API stabilizes.

---

## Future Enhancements

Given additional time or backend infrastructure, the following features could be implemented:

### Authentication System
- User login/signup using **NextAuth.js** with OAuth providers (Google, GitHub)
- Protected routes and personalized user sessions
- User profile customization (avatar, bio, preferences)
- Account management dashboard

### Real-time Data Updates
- **WebSocket integration** for live social feed updates
- **Server-Sent Events (SSE)** for real-time news notifications
- Live trending section updates without page refresh
- Real-time collaboration features (shared favorites, comments)

### Internationalization (i18n)
- Multi-language support using **react-i18next**
- Language switcher in settings panel
- RTL (right-to-left) layout support for Arabic, Hebrew
- Localized date/time formats and number formatting
- Translation coverage for 5+ languages (EN, ES, FR, DE, AR)

### Backend Integration
- RESTful API or GraphQL backend for data persistence
- User favorites and preferences stored in database (PostgreSQL/MongoDB)
- Custom recommendation engine based on user behavior
- Analytics dashboard for content engagement tracking

---

## Assignment Reflection

This project demonstrates practical application of modern frontend development principles including:
- Component-driven architecture with React and TypeScript
- Complex state management across multiple data sources
- Performance optimization through caching and debouncing
- Comprehensive testing strategy (unit + E2E)
- Responsive, accessible UI design
- Secure API integration patterns

**Time Investment:** ~40 hours (design, implementation, testing, documentation)

---

## Author

**Abdul Wasih**  
Frontend Developer Intern Candidate

---

## Acknowledgments

Thanks to TMDB, NewsAPI, and Open-Meteo for providing the APIs that power this dashboard. Built with Next.js, Redux Toolkit, and TypeScript.
