interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-primary-500 border-t-transparent ${sizes[size]} ${className}`}
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-foreground/60">Loading...</p>
      </div>
    </div>
  );
}
