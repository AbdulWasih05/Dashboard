'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useGetTopHeadlinesQuery } from '@/store/api/newsApi';
import NewsCard from '@/components/cards/NewsCard';
import Button from '@/components/common/Button';

const NEWS_CATEGORIES = [
  { id: 'general', label: 'General', icon: '📰' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'health', label: 'Health', icon: '🏥' },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { data, isLoading, error } = useGetTopHeadlinesQuery({
    category: selectedCategory,
  });

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Latest News</h1>
        <p className="text-foreground/60">
          Stay informed with the latest news from around the world
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {NEWS_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* News Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 bg-secondary skeleton rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load news articles</p>
        </div>
      ) : data && data.articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/60 py-12">
          No news articles found for this category
        </p>
      )}
    </MainLayout>
  );
}
