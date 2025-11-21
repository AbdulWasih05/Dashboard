import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  // If no API key, return mock search results
  if (!NEWS_API_KEY) {
    return NextResponse.json(getMockSearchResults(query), { status: 200 });
  }

  try {
    const response = await fetch(
      `${NEWS_API_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=20&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return NextResponse.json(getMockSearchResults(query), { status: 200 });
    }

    const data = await response.json();

    const articlesWithIds = data.articles.map((article: Record<string, unknown>, index: number) => ({
      ...article,
      id: article.url
        ? `${btoa(encodeURIComponent(String(article.url))).replace(/[^a-zA-Z0-9]/g, '').substring(0, 24)}-${index}`
        : `news-search-${Date.now()}-${index}`,
    }));

    return NextResponse.json({
      ...data,
      articles: articlesWithIds,
    });
  } catch (error) {
    console.error('News Search Error:', error);
    return NextResponse.json(getMockSearchResults(query), { status: 200 });
  }
}

function getMockSearchResults(query: string) {
  return {
    status: 'ok',
    totalResults: 2,
    articles: [
      {
        id: 'search-mock-1',
        title: `Latest Updates on ${query}`,
        description: `Comprehensive coverage of ${query} with expert analysis and breaking developments.`,
        content: `Our team is tracking all the latest news about ${query}...`,
        url: 'https://example.com/search-result-1',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        source: { id: 'news-hub', name: 'News Hub' },
        author: 'Editorial Team',
      },
      {
        id: 'search-mock-2',
        title: `In-Depth Analysis: ${query}`,
        description: `Expert perspectives and detailed reporting on ${query} from our correspondents.`,
        content: `A deep dive into the story behind ${query}...`,
        url: 'https://example.com/search-result-2',
        urlToImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        source: { id: 'world-news', name: 'World News Network' },
        author: 'Analysis Desk',
      },
    ],
  };
}
