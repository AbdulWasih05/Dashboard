'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useGetFeedQuery, useGetSocialTrendingQuery } from '@/store/api/socialApi';
import SocialCard from '@/components/cards/SocialCard';
import Button from '@/components/common/Button';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';

export default function SocialPage() {
  const [view, setView] = useState<'feed' | 'trending'>('feed');
  const { data: feedData, isLoading: feedLoading } = useGetFeedQuery(
    { page: 1 },
    { skip: view !== 'feed' }
  );
  const { data: trendingData, isLoading: trendingLoading } = useGetSocialTrendingQuery(
    undefined,
    { skip: view !== 'trending' }
  );

  const isLoading = view === 'feed' ? feedLoading : trendingLoading;
  const posts = view === 'feed' ? feedData?.posts : trendingData?.posts;

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Social Feed</h1>
        <p className="text-foreground/60">
          Explore trending posts and engage with the community
        </p>
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex space-x-2">
        <Button
          variant={view === 'feed' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setView('feed')}
        >
          <FiUsers className="mr-2 h-4 w-4" />
          Feed
        </Button>
        <Button
          variant={view === 'trending' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setView('trending')}
        >
          <FiTrendingUp className="mr-2 h-4 w-4" />
          Trending
        </Button>
      </div>

      {/* Social Posts */}
      {isLoading ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-secondary skeleton rounded-lg" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/60 py-12">No posts found</p>
      )}
    </MainLayout>
  );
}
