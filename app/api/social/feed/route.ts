import { NextRequest, NextResponse } from 'next/server';
import { SocialPost } from '@/types';

// Mock social media posts generator
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const hashtag = searchParams.get('hashtag');

  const posts = generateMockPosts(page, hashtag);

  return NextResponse.json({
    posts,
    hasMore: page < 3,
    nextCursor: page < 3 ? `page-${page + 1}` : undefined,
  });
}

function generateMockPosts(page: number, hashtag?: string | null): SocialPost[] {
  const allPosts: SocialPost[] = [
    {
      id: 'social-1',
      username: '@techguru',
      displayName: 'Tech Guru',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techguru',
      content: 'Just finished building an amazing new AI-powered dashboard! The future of content aggregation is here. 🚀 #technology #AI #webdev',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      likes: 1243,
      comments: 87,
      shares: 234,
      hashtags: ['technology', 'AI', 'webdev'],
      verified: true,
    },
    {
      id: 'social-2',
      username: '@movielover',
      displayName: 'Cinema Enthusiast',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=movielover',
      content: 'Can\'t wait for the new releases this weekend! The lineup looks absolutely incredible. What\'s everyone watching? 🎬 #movies #cinema',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 892,
      comments: 156,
      shares: 67,
      hashtags: ['movies', 'cinema'],
      verified: false,
    },
    {
      id: 'social-3',
      username: '@weatherwatcher',
      displayName: 'Weather Watch',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weatherwatcher',
      content: 'Beautiful sunny day today! Perfect weather for outdoor activities. Don\'t forget your sunscreen! ☀️ #weather #sunshine',
      image: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 654,
      comments: 43,
      shares: 89,
      hashtags: ['weather', 'sunshine'],
      verified: true,
    },
    {
      id: 'social-4',
      username: '@newsbreaker',
      displayName: 'Breaking News Now',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newsbreaker',
      content: 'BREAKING: Major developments in the tech industry. Sources confirm new partnerships forming. More details to follow. #news #breaking',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 2341,
      comments: 543,
      shares: 1234,
      hashtags: ['news', 'breaking'],
      verified: true,
    },
    {
      id: 'social-5',
      username: '@designinspire',
      displayName: 'Design Inspiration',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designinspire',
      content: 'Clean UI designs are timeless. Here\'s a showcase of minimal dashboard concepts that prioritize user experience. 🎨 #design #UI #UX',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: 1876,
      comments: 234,
      shares: 456,
      hashtags: ['design', 'UI', 'UX'],
      verified: false,
    },
    {
      id: 'social-6',
      username: '@sportsfanatic',
      displayName: 'Sports Central',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportsfanatic',
      content: 'What an incredible game last night! That final quarter had me on the edge of my seat. Championship vibes! 🏀 #sports #basketball',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      likes: 3421,
      comments: 789,
      shares: 567,
      hashtags: ['sports', 'basketball'],
      verified: true,
    },
    {
      id: 'social-7',
      username: '@foodielife',
      displayName: 'Foodie Adventures',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodielife',
      content: 'Tried this amazing new restaurant downtown. The fusion cuisine is absolutely mind-blowing! 🍜 Highly recommend! #food #foodie',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      likes: 1567,
      comments: 312,
      shares: 178,
      hashtags: ['food', 'foodie'],
      verified: false,
    },
    {
      id: 'social-8',
      username: '@travelbug',
      displayName: 'Travel Diaries',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travelbug',
      content: 'Just landed in an incredible destination! The views are absolutely breathtaking. Can\'t wait to explore more. ✈️ #travel #adventure',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      likes: 2789,
      comments: 445,
      shares: 892,
      hashtags: ['travel', 'adventure'],
      verified: true,
    },
  ];

  // Filter by hashtag if provided
  const filtered = hashtag
    ? allPosts.filter(post =>
        post.hashtags.some(tag => tag.toLowerCase() === hashtag.toLowerCase())
      )
    : allPosts;

  // Paginate results
  const pageSize = 4;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return filtered.slice(start, end);
}
