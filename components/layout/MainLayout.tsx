'use client';

import { useAppSelector } from '@/store/hooks';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MobileNav />
      <div className="flex">
        <Sidebar />
        <main
          id="main-content"
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
          }`}
          tabIndex={-1}
        >
          <div className="mx-auto px-4 py-4 mt-8 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
