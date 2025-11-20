'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiFilm, FiCloud, FiTrendingUp, FiHeart, FiMessageCircle, FiFileText, FiX } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeMobileMenu } from '@/store/slices/uiSlice';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

export default function MobileNav() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const favorites = useAppSelector((state) => state.favorites);
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FiHome className="h-5 w-5" />,
      href: '/',
    },
    {
      id: 'movies',
      label: 'Movies',
      icon: <FiFilm className="h-5 w-5" />,
      href: '/movies',
    },
    {
      id: 'news',
      label: 'News',
      icon: <FiFileText className="h-5 w-5" />,
      href: '/news',
    },
    {
      id: 'social',
      label: 'Social Feed',
      icon: <FiMessageCircle className="h-5 w-5" />,
      href: '/social',
    },
    {
      id: 'weather',
      label: 'Weather',
      icon: <FiCloud className="h-5 w-5" />,
      href: '/weather',
    },
    {
      id: 'trending',
      label: 'Trending',
      icon: <FiTrendingUp className="h-5 w-5" />,
      href: '/trending',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <FiHeart className="h-5 w-5" />,
      href: '/favorites',
      badge: favorites.length,
    },
  ];

  // Close menu on route change
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeMobileMenu());
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen, dispatch]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(closeMobileMenu())}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-neutral-50 dark:bg-neutral-900 border-r border-border transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="font-bold text-lg">Menu</span>
          </div>
          <button
            onClick={() => dispatch(closeMobileMenu())}
            className="p-2 rounded-lg hover:bg-accent"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-5rem)]">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-foreground hover:bg-accent'
                  }`}
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                        isActive
                          ? 'bg-white text-primary-500'
                          : 'bg-primary-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 border-t border-border pt-4">
            <div className="rounded-lg bg-accent/50 p-3">
              <h3 className="text-sm font-semibold text-foreground">
                Quick Stats
              </h3>
              <div className="mt-2 space-y-1 text-sm text-foreground/80">
                <div className="flex justify-between">
                  <span>Favorites</span>
                  <span className="font-medium">{favorites.length}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
