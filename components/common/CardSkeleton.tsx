export default function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card border border-border animate-pulse">
      <div className="aspect-[2/3] bg-secondary skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-secondary skeleton rounded" />
        <div className="h-4 bg-secondary skeleton rounded w-3/4" />
        <div className="h-4 bg-secondary skeleton rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
