'use client';

import MainLayout from '@/components/layout/MainLayout';
import TrendingSection from '@/components/dashboard/TrendingSection';

export default function TrendingPage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trending</h1>
        <p className="text-foreground/60">
          Discover what's trending today and this week
        </p>
      </div>
      <TrendingSection />
    </MainLayout>
  );
}
