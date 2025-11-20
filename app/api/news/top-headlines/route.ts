import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'general';
  const page = searchParams.get('page') || '1';

  // If no API key, return mock data
  if (!NEWS_API_KEY) {
    return NextResponse.json(getMockNewsData(category), { status: 200 });
  }

  try {
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=20&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      console.warn('NewsAPI failed, returning mock data');
      return NextResponse.json(getMockNewsData(category), { status: 200 });
    }

    const data = await response.json();

    // Add unique IDs to articles
    const articlesWithIds = data.articles.map((article: any, index: number) => ({
      ...article,
      id: article.url
        ? `${btoa(encodeURIComponent(article.url)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 24)}-${index}`
        : `news-${Date.now()}-${index}`,
    }));

    return NextResponse.json({
      ...data,
      articles: articlesWithIds,
    });
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(getMockNewsData(category), { status: 200 });
  }
}

function getMockNewsData(category: string) {
  const mockArticles = [
    {
      id: 'mock-1',
      title: 'Breaking: Major Tech Company Announces Revolutionary AI Product',
      description: 'A leading technology company has unveiled a groundbreaking artificial intelligence system that promises to transform how we interact with computers.',
      content: 'The new AI system demonstrates unprecedented capabilities in natural language understanding and generation...',
      url: 'https://example.com/tech-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { id: 'tech-news', name: 'Tech News Daily' },
      author: 'Sarah Johnson',
      category: 'technology',
    },
    {
      id: 'mock-2',
      title: 'Global Markets React to Economic Policy Changes',
      description: 'Stock markets worldwide showed mixed reactions following the announcement of new economic policies by major central banks.',
      content: 'Financial analysts are closely monitoring the situation as investors digest the implications...',
      url: 'https://example.com/business-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: { id: 'financial-times', name: 'Financial Times' },
      author: 'Michael Chen',
      category: 'business',
    },
    {
      id: 'mock-3',
      title: 'Scientists Make Breakthrough Discovery in Renewable Energy',
      description: 'Researchers have developed a new solar cell technology that could significantly increase energy efficiency and reduce costs.',
      content: 'The breakthrough represents a major step forward in the quest for sustainable energy solutions...',
      url: 'https://example.com/science-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: { id: 'science-daily', name: 'Science Daily' },
      author: 'Dr. Emily Watson',
      category: 'science',
    },
    {
      id: 'mock-4',
      title: 'Championship Team Secures Historic Victory',
      description: 'In an exciting finale, the underdog team claimed their first championship title in franchise history.',
      content: 'The thrilling match kept fans on the edge of their seats until the final moments...',
      url: 'https://example.com/sports-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: { id: 'espn', name: 'ESPN' },
      author: 'James Martinez',
      category: 'sports',
    },
    {
      id: 'mock-5',
      title: 'New Health Guidelines Released for Better Wellness',
      description: 'Medical experts have released updated guidelines focusing on preventive care and mental health awareness.',
      content: 'The comprehensive guidelines emphasize the importance of holistic health approaches...',
      url: 'https://example.com/health-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: { id: 'health-magazine', name: 'Health Magazine' },
      author: 'Dr. Lisa Anderson',
      category: 'health',
    },
    {
      id: 'mock-6',
      title: 'Entertainment Industry Embraces Streaming Revolution',
      description: 'Major studios are adapting to changing consumer preferences with new streaming strategies.',
      content: 'The shift to digital platforms continues to reshape how content is produced and distributed...',
      url: 'https://example.com/entertainment-news-1',
      urlToImage: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: { id: 'variety', name: 'Variety' },
      author: 'Robert Davis',
      category: 'entertainment',
    },
  ];

  // Filter by category if not 'general'
  const filteredArticles = category === 'general'
    ? mockArticles
    : mockArticles.filter(a => a.category === category);

  return {
    status: 'ok',
    totalResults: filteredArticles.length,
    articles: filteredArticles,
  };
}
