import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: 'TMDB API key not configured' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
        {
          next: { revalidate: 300 },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch from TMDB');
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error(`TMDB API Error (attempt ${attempt}/${maxRetries}):`, error);

      if (attempt === maxRetries) {
        return NextResponse.json(
          { error: 'Failed to fetch popular movies' },
          { status: 500 }
        );
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return NextResponse.json(
    { error: 'Failed to fetch popular movies' },
    { status: 500 }
  );
}
