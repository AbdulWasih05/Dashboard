import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Test endpoint to verify TMDB API key is configured correctly
 * Access at: http://localhost:3000/api/test
 */
export async function GET() {
  // Check if API key is configured
  if (!TMDB_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: 'TMDB_API_KEY is not configured',
        message: 'Please add TMDB_API_KEY to your .env.local file',
        instructions: [
          '1. Create a .env.local file in the root directory',
          '2. Add: TMDB_API_KEY=your_api_key_here',
          '3. Get your API key from: https://www.themoviedb.org/settings/api',
          '4. Restart the development server',
        ],
      },
      { status: 500 }
    );
  }

  try {
    // Test API call to TMDB
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: 'TMDB API request failed',
          status: response.status,
          message: errorData.status_message || 'Invalid API key or request',
          instructions: [
            'Verify your API key is correct',
            'Check that the API key is active at https://www.themoviedb.org/settings/api',
          ],
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: '✅ TMDB API key is working correctly!',
      details: {
        apiKeyConfigured: true,
        apiKeyPrefix: `${TMDB_API_KEY.substring(0, 8)}...`,
        moviesRetrieved: data.results?.length || 0,
        sampleMovie: data.results?.[0]
          ? {
              title: data.results[0].title,
              releaseDate: data.results[0].release_date,
              rating: data.results[0].vote_average,
            }
          : null,
      },
      nextSteps: [
        'Your TMDB API is configured correctly!',
        'You can now use the dashboard at http://localhost:3000',
        'Search for movies, add favorites, and explore content',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Network error or invalid response',
        message: error instanceof Error ? error.message : 'Unknown error',
        instructions: [
          'Check your internet connection',
          'Verify the TMDB API is accessible',
          'Try again in a few moments',
        ],
      },
      { status: 500 }
    );
  }
}
