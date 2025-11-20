import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  // If no API key, redirect to top-headlines with category
  if (!NEWS_API_KEY) {
    const mockResponse = await fetch(
      `${request.nextUrl.origin}/api/news/top-headlines?category=${category}&page=${page}`
    );
    return NextResponse.json(await mockResponse.json());
  }

  try {
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=20&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      const mockResponse = await fetch(
        `${request.nextUrl.origin}/api/news/top-headlines?category=${category}&page=${page}`
      );
      return NextResponse.json(await mockResponse.json());
    }

    const data = await response.json();

    const articlesWithIds = data.articles.map((article: any, index: number) => ({
      ...article,
      id: article.url ? btoa(article.url).substring(0, 16) : `news-cat-${Date.now()}-${index}`,
    }));

    return NextResponse.json({
      ...data,
      articles: articlesWithIds,
    });
  } catch (error) {
    console.error('News Category Error:', error);
    const mockResponse = await fetch(
      `${request.nextUrl.origin}/api/news/top-headlines?category=${category}&page=${page}`
    );
    return NextResponse.json(await mockResponse.json());
  }
}
