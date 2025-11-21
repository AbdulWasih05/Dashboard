export default function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card border border-border">
      <div className="aspect-[2/3] skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-5 skeleton-shimmer rounded" />
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-4 skeleton-shimmer rounded w-1/2" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card border border-border shadow-lg">
      {/* Image area - h-48 to match NewsCard */}
      <div className="h-48 skeleton-shimmer" />
      <div className="p-4 space-y-3">
        {/* Title - min-h-[2.5rem] to match NewsCard */}
        <div className="h-5 skeleton-shimmer rounded min-h-[2.5rem]" />
        {/* Description - min-h-[3.75rem] to match NewsCard */}
        <div className="space-y-1 min-h-[3.75rem]">
          <div className="h-4 skeleton-shimmer rounded" />
          <div className="h-4 skeleton-shimmer rounded w-5/6" />
          <div className="h-4 skeleton-shimmer rounded w-3/4" />
        </div>
        {/* Meta info */}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div className="h-3 skeleton-shimmer rounded w-1/3" />
          <div className="h-3 skeleton-shimmer rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function SocialCardSkeleton() {
  return (
    <div className="rounded-lg bg-card border border-border p-4 shadow-md">
      {/* Header with avatar - matches SocialCard */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="h-12 w-12 rounded-full skeleton-shimmer flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 skeleton-shimmer rounded w-1/3" />
          <div className="h-3 skeleton-shimmer rounded w-1/4" />
        </div>
      </div>
      {/* Content */}
      <div className="space-y-2 mb-3">
        <div className="h-4 skeleton-shimmer rounded" />
        <div className="h-4 skeleton-shimmer rounded w-5/6" />
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
      </div>
      {/* Actions */}
      <div className="flex items-center justify-around border-t border-border pt-3">
        <div className="h-5 skeleton-shimmer rounded w-12" />
        <div className="h-5 skeleton-shimmer rounded w-12" />
        <div className="h-5 skeleton-shimmer rounded w-12" />
      </div>
    </div>
  );
}

export function WeatherCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 p-4 md:p-6 min-h-[280px] md:min-h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded w-24" />
          <div className="h-3 bg-white/20 rounded w-16" />
        </div>
        <div className="h-8 bg-white/20 rounded w-12" />
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="h-3 bg-white/20 rounded w-20" />
          <div className="h-12 bg-white/20 rounded w-24" />
        </div>
        <div className="text-right space-y-2">
          <div className="h-12 w-12 bg-white/20 rounded" />
          <div className="h-3 bg-white/20 rounded w-16" />
        </div>
      </div>
      <div className="border-t border-white/20 pt-3">
        <div className="flex justify-between">
          <div className="h-6 bg-white/20 rounded w-16" />
          <div className="h-6 bg-white/20 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8, variant = 'movie' }: { count?: number; variant?: 'movie' | 'news' | 'social' }) {
  const gridClasses = {
    movie: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    news: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    social: 'grid-cols-1 md:grid-cols-2',
  };

  const SkeletonComponent = {
    movie: CardSkeleton,
    news: NewsCardSkeleton,
    social: SocialCardSkeleton,
  }[variant];

  return (
    <div className={`grid ${gridClasses[variant]} gap-4`} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

// Inline skeleton for text content
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`} aria-busy="true" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 skeleton-shimmer rounded ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}
