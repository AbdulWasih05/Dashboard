import { NextResponse } from 'next/server';
import { SocialPost } from '@/types';

export async function GET() {
  const trendingPosts: SocialPost[] = [
    {
      id: 'trending-1',
      username: '@viraltech',
      displayName: 'Viral Tech News',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viraltech',
      content: '🔥 TRENDING: Revolutionary new framework just dropped! The developer community is going wild. This changes everything! #trending #technology',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      likes: 15243,
      comments: 2341,
      shares: 5678,
      hashtags: ['trending', 'technology'],
      verified: true,
    },
    {
      id: 'trending-2',
      username: '@popculture',
      displayName: 'Pop Culture Daily',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=popculture',
      content: 'Everyone is talking about this! The most viral moment of the day. You have to see this to believe it! 🚀 #viral #trending',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      likes: 23456,
      comments: 4567,
      shares: 8901,
      hashtags: ['viral', 'trending'],
      verified: true,
    },
    {
      id: 'trending-3',
      username: '@breakingnow',
      displayName: 'Breaking Now',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=breakingnow',
      content: '🚨 BREAKING: This is the story everyone\'s sharing right now. Unprecedented developments unfolding. Stay tuned for updates! #breaking #news',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      likes: 34567,
      comments: 6789,
      shares: 12345,
      hashtags: ['breaking', 'news'],
      verified: true,
    },
  ];

  return NextResponse.json({
    posts: trendingPosts,
    hasMore: false,
  });
}
