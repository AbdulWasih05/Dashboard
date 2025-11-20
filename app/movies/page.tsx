'use client';

import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/dashboard/Dashboard';

export default function MoviesPage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Movies</h1>
        <p className="text-foreground/60">
          Discover trending, popular, top-rated, and upcoming movies
        </p>
      </div>
      <Dashboard />
    </MainLayout>
  );
}
