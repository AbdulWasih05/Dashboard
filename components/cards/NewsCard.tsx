'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink, FiClock, FiUser, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/types';
import { formatDate, isFavorited } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewsFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { cacheArticle } from '@/store/slices/newsSlice';
import toast from 'react-hot-toast';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const [imageError, setImageError] = useState(false);

  const isFav = isFavorited(article.id, favorites);

  // Use proxy for external images to bypass hotlink protection
  const getProxiedImageUrl = (url: string) => {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFav) {
      dispatch(removeFavorite(article.id));
      toast.success('Removed from favorites');
    } else {
      dispatch(addNewsFavorite(article));
      toast.success('Added to favorites');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-lg bg-card border border-border shadow-lg transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        {article.urlToImage && !imageError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getProxiedImageUrl(article.urlToImage)}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl">📰</span>
          </div>
        )}

        {/* Source badge */}
        <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
          <span className="text-xs font-medium text-white">
            {article.source.name}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? (
            <FaHeart className="h-4 w-4 text-red-500" />
          ) : (
            <FiHeart className="h-4 w-4 text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-foreground line-clamp-2 leading-tight" title={article.title}>
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-foreground/70 line-clamp-3">
            {article.description}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-foreground/60 pt-2 border-t border-border">
          <div className="flex items-center space-x-3">
            {article.author && (
              <div className="flex items-center space-x-1">
                <FiUser className="h-3 w-3" />
                <span className="line-clamp-1 max-w-[100px]">{article.author}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <FiClock className="h-3 w-3" />
              <span>{formatDate(article.publishedAt, 'MMM dd')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* External link */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-foreground/60 hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="Open original article"
            >
              <FiExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Read more link */}
            <Link
              href={`/news/${encodeURIComponent(article.id)}`}
              className="text-primary-500 hover:text-primary-600 transition-colors font-medium"
              onClick={() => dispatch(cacheArticle(article))}
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
