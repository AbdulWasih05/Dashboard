'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiSettings, FiMoon, FiSun, FiHeart, FiCloud, FiCloudRain, FiCloudSnow, FiCloudLightning } from 'react-icons/fi';
import { WiDaySunny, WiCloudy, WiFog } from 'react-icons/wi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleSidebar, toggleMobileMenu } from '@/store/slices/uiSlice';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useGetCurrentWeatherQuery } from '@/store/api/weatherApi';
import Button from '../common/Button';

// Dynamic imports for modals - only loaded when needed
const SearchModal = dynamic(() => import('../search/SearchModal'), {
  ssr: false,
  loading: () => null,
});

const SettingsModal = dynamic(() => import('../settings/SettingsModal'), {
  ssr: false,
  loading: () => null,
});

// Weather code to icon mapping (Open-Meteo WMO codes)
const getWeatherIcon = (code: number) => {
  if (code === 0) return <WiDaySunny className="h-5 w-5" />;
  if (code >= 1 && code <= 3) return <WiCloudy className="h-5 w-5" />;
  if (code >= 45 && code <= 48) return <WiFog className="h-5 w-5" />;
  if (code >= 51 && code <= 67) return <FiCloudRain className="h-5 w-5" />;
  if (code >= 71 && code <= 77) return <FiCloudSnow className="h-5 w-5" />;
  if (code >= 80 && code <= 82) return <FiCloudRain className="h-5 w-5" />;
  if (code >= 85 && code <= 86) return <FiCloudSnow className="h-5 w-5" />;
  if (code >= 95 && code <= 99) return <FiCloudLightning className="h-5 w-5" />;
  return <FiCloud className="h-5 w-5" />;
};

export default function Header() {
  const dispatch = useAppDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const favorites = useAppSelector((state) => state.favorites);
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const location = useAppSelector((state) => state.user.preferences.location);
  const { isDark, toggleTheme } = useDarkMode();

  // Fetch weather data
  const { data: weatherData } = useGetCurrentWeatherQuery(
    { latitude: location?.latitude ?? 0, longitude: location?.longitude ?? 0 },
    { skip: !location }
  );

  // Set initial time on client and update every minute
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-neutral-50 dark:bg-neutral-900">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile hamburger menu button */}
            <div className="md:hidden w-16 flex items-center justify-center">
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="p-2 rounded-lg hover:bg-accent relative w-9 h-9 flex items-center justify-center"
                aria-label="Open menu"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className="block h-[2px] w-5 bg-current" />
                  <span className="block h-[2px] w-5 bg-current" />
                  <span className="block h-[2px] w-5 bg-current" />
                </div>
              </button>
            </div>

            {/* Desktop sidebar toggle button - aligned with collapsed sidebar */}
            <div className="hidden md:flex w-16 items-center justify-center">
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 rounded-lg hover:bg-accent relative w-9 h-9 flex items-center justify-center"
                aria-label="Toggle sidebar"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between relative">
                  <span
                    className={`absolute top-0 left-0 block h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                      isSidebarOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 left-0 block h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                      isSidebarOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 block h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                      isSidebarOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
                    }`}
                  />
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌐</span>
              <h1 className="text-xl font-bold text-foreground">
                Content Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 pr-4">
              {/* Time and Weather Display - fixed dimensions to prevent CLS */}
              <div className="hidden sm:flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-accent/50 text-sm min-w-[180px] h-[36px]">
                <span className="font-medium w-[50px]">
                  {currentTime ? formatTime(currentTime) : '\u00A0'}
                </span>
                <div className="flex items-center space-x-1 border-l border-border pl-3 min-w-[70px]">
                  {weatherData ? (
                    <>
                      {getWeatherIcon(weatherData.current_weather.weathercode)}
                      <span className="font-medium">
                        {Math.round(weatherData.current_weather.temperature)}°C
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-foreground/40">--°C</span>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex"
              >
                <FiSearch className="mr-2" />
                Search
              </Button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-accent"
                aria-label="Search"
              >
                <FiSearch className="h-5 w-5" />
              </button>

              <button
                className="p-2 rounded-lg hover:bg-accent relative"
                aria-label="Favorites"
              >
                <FiHeart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-500 text-xs text-white flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-accent"
                aria-label="Settings"
              >
                <FiSettings className="h-5 w-5" />
              </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
