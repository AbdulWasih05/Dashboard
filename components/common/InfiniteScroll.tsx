'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from './Loader';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
}: InfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  if (!hasMore) {
    return (
      <div className="text-center py-8 text-foreground/60">
        <p>You've reached the end!</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex justify-center py-8">
      {isLoading && <Loader />}
    </div>
  );
}
