'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiFilm, FiCloud, FiTrendingUp, FiHeart, FiMessageCircle, FiFileText, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const favorites = useAppSelector((state) => state.favorites);
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

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

  return (
    <aside
      className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] border-r border-border bg-card transition-all duration-300 hidden md:block ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <nav className="h-full overflow-y-auto overflow-x-hidden p-2 flex flex-col">
        <div className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-3 transition-colors relative group ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-foreground hover:bg-accent'
                } ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : ''}`}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </div>

                {item.badge && item.badge > 0 && (
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-white text-primary-500'
                        : 'bg-primary-500 text-white'
                    } ${isSidebarOpen ? '' : 'absolute -top-1 -right-1'}`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        {isSidebarOpen && (
          <div className="mt-4 border-t border-border pt-4">
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
        )}

        {/* Toggle Button */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="mt-2 flex items-center justify-center p-2 rounded-lg hover:bg-accent text-foreground/70 hover:text-foreground transition-colors border-t border-border pt-3"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? (
            <>
              <FiChevronLeft className="h-5 w-5" />
              <span className="ml-2 text-sm">Collapse</span>
            </>
          ) : (
            <FiChevronRight className="h-5 w-5" />
          )}
        </button>
      </nav>
    </aside>
  );
}
