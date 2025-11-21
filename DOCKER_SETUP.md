#  Docker Setup Guide 

## Prerequisites
- Docker Desktop installed
- Git installed

## Quick Start (5 minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/AbdulWasih05/Personalized-Content-Dashboard.git
cd Personalized-Content-Dashboard
```

### Step 2: Setup Environment Variables
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your API keys
```

**Required API Keys:**
- **TMDB_API_KEY**: Get from [TMDB API](https://www.themoviedb.org/settings/api) (Free account)
- **NEWS_API_KEY**: Optional - Get from [News API](https://newsapi.org/register) (500 requests/day free)

Example `.env.local`:
```env
TMDB_API_KEY=your_tmdb_api_key_here
NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_APP_NAME=Personalized Content Dashboard
NEXT_PUBLIC_WEATHER_API_URL=https://api.open-meteo.com/v1
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

### Step 3: Run with Docker Compose
```bash
npm run docker:up
```

Or directly:
```bash
docker-compose up -d
```

### Step 4: Access the Application
Open your browser and visit: **http://localhost:3000**

## 📋 Useful Commands

### Start the application
```bash
npm run docker:up
# or
docker-compose up -d
```

### Stop the application
```bash
npm run docker:down
# or
docker-compose down
```

### View logs
```bash
npm run docker:logs
# or
docker-compose logs -f
```

### Rebuild after code changes
```bash
npm run docker:build
npm run docker:up
# or
docker-compose up -d --build
```

### Restart containers
```bash
npm run docker:restart
# or
docker-compose restart
```

### Remove containers and volumes
```bash
npm run docker:clean
# or
docker-compose down -v
```

## 🚀 API Keys Setup

### TMDB API Key (Required)
1. Visit: https://www.themoviedb.org/signup
2. Sign up for a free account
3. Go to Settings → API → Request API Key
4. Choose "Developer" option
5. Fill in the required information
6. Copy your API Key (v3 auth) to `.env.local`

### News API Key (Optional)
1. Visit: https://newsapi.org/register
2. Sign up for a free account (500 requests/day)
3. Copy your API key from the dashboard
4. Add to `.env.local`

**Note:** Without News API key, the app will display mock news data.


## 💡 Tips

1. **First-time setup takes 3-5 minutes** due to Docker image building
2. **Subsequent starts are much faster** (10-15 seconds)
3. **Keep Docker Desktop running** in the background
4. **Monitor resource usage** in Docker Desktop dashboard
5. **Use `npm run docker:logs`** to debug issues

## 🆘 Support

If you encounter issues:
1. Check the logs: `npm run docker:logs`
2. Verify environment variables in `.env.local`
3. Ensure Docker Desktop is running
4. Try rebuilding: `npm run docker:clean && npm run docker:build && npm run docker:up`

For more help, open an issue on the [GitHub repository](https://github.com/AbdulWasih05/Personalized-Content-Dashboard/issues).
