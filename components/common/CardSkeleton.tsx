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
    <div className="overflow-hidden rounded-lg bg-card border border-border">
      <div className="aspect-video skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-1/4" />
        <div className="h-5 skeleton-shimmer rounded" />
        <div className="h-5 skeleton-shimmer rounded w-5/6" />
        <div className="h-4 skeleton-shimmer rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 skeleton-shimmer rounded w-1/3" />
          <div className="h-3 skeleton-shimmer rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function SocialCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card border border-border p-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 skeleton-shimmer rounded w-1/3" />
          <div className="h-3 skeleton-shimmer rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 skeleton-shimmer rounded" />
        <div className="h-4 skeleton-shimmer rounded w-5/6" />
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="h-4 skeleton-shimmer rounded w-16" />
        <div className="h-4 skeleton-shimmer rounded w-16" />
        <div className="h-4 skeleton-shimmer rounded w-16" />
      </div>
    </div>
  );
}

export function WeatherCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-6 skeleton-shimmer rounded w-32" />
          <div className="h-4 skeleton-shimmer rounded w-24" />
        </div>
        <div className="h-16 w-16 rounded-full skeleton-shimmer" />
      </div>
      <div className="h-12 skeleton-shimmer rounded w-1/2 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-16 skeleton-shimmer rounded" />
        <div className="h-16 skeleton-shimmer rounded" />
        <div className="h-16 skeleton-shimmer rounded" />
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
