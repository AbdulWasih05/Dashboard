'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageCircle, FiShare2, FiCheckCircle } from 'react-icons/fi';
import { SocialPost } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface SocialCardProps {
  post: SocialPost;
}

export default function SocialCard({ post }: SocialCardProps) {
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <div
      className="card-animate rounded-lg bg-card border border-border p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        {/* Avatar */}
        <div className="relative h-12 w-12 flex-shrink-0">
          {post.avatar ? (
            <Image
              src={post.avatar}
              alt={post.displayName}
              fill
              className="rounded-full object-cover"
              sizes="48px"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
              {post.displayName[0]}
            </div>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-foreground truncate">
              {post.displayName}
            </span>
            {post.verified && (
              <FiCheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-foreground/60">
            <span className="truncate">{post.username}</span>
            <span>·</span>
            <span className="flex-shrink-0">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-foreground whitespace-pre-wrap break-words">
          {post.content.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
              return (
                <span key={i} className="text-primary-500 hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              );
            }
            if (word.startsWith('@')) {
              return (
                <span key={i} className="text-primary-500 hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              );
            }
            return <span key={i}>{word} </span>;
          })}
        </p>
      </div>

      {/* Image */}
      {post.image && !imageError && (
        <div className="relative mb-3 rounded-lg overflow-hidden border border-border">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-around border-t border-border pt-3">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center space-x-2 transition-colors ${
            liked ? 'text-red-500' : 'text-foreground/60 hover:text-red-500'
          }`}
        >
          <FiHeart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">
            {formatNumber(post.likes + (liked ? 1 : 0))}
          </span>
        </button>

        <button className="flex items-center space-x-2 text-foreground/60 hover:text-primary-500 transition-colors">
          <FiMessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
        </button>

        <button className="flex items-center space-x-2 text-foreground/60 hover:text-green-500 transition-colors">
          <FiShare2 className="h-5 w-5" />
          <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
        </button>
      </div>
    </div>
  );
}
