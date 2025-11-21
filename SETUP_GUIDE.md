# Quick Setup Guide

## Step-by-Step Setup

### 1. Get Your TMDB API Key

1. Visit [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Create a free account
3. Go to Settings → API: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
4. Click "Request an API Key"
5. Choose "Developer" option
6. Fill out the form (you can use dummy data for personal projects)
7. Copy your **API Key (v3 auth)**

### 2. Configure Environment Variables

1. Create a file named `.env.local` in the root directory of this project
2. Add the following content:

```bash
# TMDB API Key
TMDB_API_KEY=paste_your_api_key_here

# Public Configuration (these are already set correctly)
NEXT_PUBLIC_APP_NAME="Personalized Content Dashboard"
NEXT_PUBLIC_WEATHER_API_URL="https://api.open-meteo.com/v1"
NEXT_PUBLIC_TMDB_IMAGE_BASE="https://image.tmdb.org/t/p"
```

3. Replace `paste_your_api_key_here` with your actual API key
4. Save the file

### 3. Restart the Development Server

If the server is already running, stop it (Ctrl+C) and restart:

```bash
npm run dev
```

### 4. Test Your Configuration

#### Option 1: Visual Test Page
1. Open your browser
2. Go to: **http://localhost:3000/test**
3. Click the **"Test API Key"** button
4. You should see:
   - ✅ Success message
   - Your API key prefix
   - Number of movies retrieved
   - A sample movie with title and rating

#### Option 2: API Endpoint Test
1. Open your browser
2. Go to: **http://localhost:3000/api/test**
3. You should see a JSON response like:
```json
{
  "success": true,
  "message": "✅ TMDB API key is working correctly!",
  "details": {
    "apiKeyConfigured": true,
    "apiKeyPrefix": "12345678...",
    "moviesRetrieved": 20,
    "sampleMovie": {
      "title": "Example Movie",
      "releaseDate": "2024-01-01",
      "rating": 7.5
    }
  }
}
```

### 5. Troubleshooting

#### ❌ API Key Not Configured
**Error**: "TMDB_API_KEY is not configured"

**Solution**:
- Make sure `.env.local` file exists in the root directory
- Check that the file contains `TMDB_API_KEY=your_key`
- Restart the development server

#### ❌ Invalid API Key
**Error**: "Invalid API key or request"

**Solution**:
- Double-check your API key for typos
- Make sure you copied the correct key (API Key v3, not v4 or read access token)
- Verify the key is active at https://www.themoviedb.org/settings/api

#### ❌ Network Error
**Error**: "Network error or invalid response"

**Solution**:
- Check your internet connection
- Make sure you can access https://www.themoviedb.org
- Try again in a few moments

### 6. Start Using the Dashboard

Once the test is successful:
1. Navigate to: **http://localhost:3000**
2. Allow location access for weather (or it will use default location)
3. Browse movies in different categories
4. Use the search bar to find specific movies
5. Click the heart icon to add favorites
6. Toggle dark/light mode with the moon/sun icon
7. Customize preferences in settings

## Important Notes

- **Free Tier**: TMDB free tier allows 40 requests per 10 seconds, which is plenty for this app
- **Weather API**: Open-Meteo requires no API key and is completely free
- **Data Storage**: Favorites and preferences are stored in your browser's localStorage

