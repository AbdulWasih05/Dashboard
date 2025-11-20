'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiHeart, FiExternalLink, FiCalendar, FiUser } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewsFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { formatDate, isFavorited } from '@/utils/helpers';
import { NewsArticle } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import toast from 'react-hot-toast';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = use(params);
  const decodedId = decodeURIComponent(id);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const cachedArticles = useAppSelector((state) => state.news.cachedArticles);

  // Find the article in cache or favorites
  const cachedArticle = cachedArticles[decodedId];
  const favoriteItem = favorites.find((fav) => fav.id === decodedId && fav.type === 'news');
  const article = cachedArticle || (favoriteItem?.data as NewsArticle | undefined);

  const isFav = article ? isFavorited(article.id, favorites) : false;

  // Use proxy for external images to bypass hotlink protection
  const getProxiedImageUrl = (url: string) => {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  };

  const handleFavoriteToggle = () => {
    if (!article) return;

    if (isFav) {
      dispatch(removeFavorite(article.id));
      toast.success('Removed from favorites');
    } else {
      dispatch(addNewsFavorite(article));
      toast.success('Added to favorites');
    }
  };

  if (!article) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-xl text-foreground/60 mb-2">Article not found</p>
          <p className="text-sm text-foreground/40 mb-4 text-center max-w-md">
            This article may have expired from cache. Please go back to the news page and click &quot;Read More&quot; again.
          </p>
          <Link
            href="/news"
            className="text-primary-500 hover:text-primary-600 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to News
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          {/* Source Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium">
            {article.source.name}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            {article.author && (
              <div className="flex items-center space-x-1">
                <FiUser className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <FiCalendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt, 'MMMM dd, yyyy')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleFavoriteToggle}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isFav
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              {isFav ? (
                <>
                  <FaHeart className="mr-2 h-4 w-4" />
                  Remove from Favorites
                </>
              ) : (
                <>
                  <FiHeart className="mr-2 h-4 w-4" />
                  Add to Favorites
                </>
              )}
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-accent text-foreground hover:bg-accent/80 transition-colors"
            >
              <FiExternalLink className="mr-2 h-4 w-4" />
              Read Original
            </a>
          </div>
        </div>

        {/* Featured Image */}
        {article.urlToImage && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
            <Image
              src={getProxiedImageUrl(article.urlToImage)}
              alt={article.title}
              fill
              unoptimized
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Description */}
        {article.description && (
          <div className="bg-accent/30 rounded-lg p-4 md:p-6">
            <p className="text-lg text-foreground/80 leading-relaxed italic">
              {article.description}
            </p>
          </div>
        )}

        {/* Content */}
        {article.content && (
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article Content</h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </p>
          </div>
        )}

        {/* CTA to Original */}
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-foreground/60 mb-3">
            Want to read the full article?
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            <FiExternalLink className="mr-2 h-4 w-4" />
            Visit {article.source.name}
          </a>
        </div>
      </motion.div>
    </MainLayout>
  );
}
