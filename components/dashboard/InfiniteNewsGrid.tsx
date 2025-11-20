'use client';

import { useState } from 'react';
import { useGetTopHeadlinesQuery } from '@/store/api/newsApi';
import NewsCard from '../cards/NewsCard';
import InfiniteScroll from '../common/InfiniteScroll';
import { NewsArticle } from '@/types';

interface InfiniteNewsGridProps {
  category?: string;
}

export default function InfiniteNewsGrid({ category = 'general' }: InfiniteNewsGridProps) {
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);

  const { data, isLoading, isFetching } = useGetTopHeadlinesQuery({
    category,
    page,
  });

  // Merge new articles with existing ones
  useState(() => {
    if (data && data.articles) {
      setAllArticles((prev) => {
        const existing = prev.map(a => a.id);
        const newArticles = data.articles.filter(a => !existing.includes(a.id));
        return [...prev, ...newArticles];
      });
    }
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = data ? data.articles.length >= 20 : false;

  if (isLoading && page === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-secondary skeleton rounded-lg" />
        ))}
      </div>
    );
  }

  const displayArticles = allArticles.length > 0 ? allArticles : (data?.articles || []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {displayArticles.length > 0 && (
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isFetching}
        />
      )}

      {!isLoading && displayArticles.length === 0 && (
        <p className="text-center text-foreground/60 py-12">
          No news articles found for this category
        </p>
      )}
    </>
  );
}
