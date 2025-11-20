'use client';

import { useEffect, useCallback } from 'react';
import { FiX, FiRefreshCw } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategories, setNewsCategories, setTemperatureUnit } from '@/store/slices/userSlice';
import { moveWidget, toggleWidgetVisibility, resetLayout } from '@/store/slices/dashboardSlice';
import { clearFavorites } from '@/store/slices/favoritesSlice';
import { MOVIE_CATEGORIES, NEWS_CATEGORIES, TEMPERATURE_UNITS } from '@/utils/constants';
import DraggableWidgetItem from './DraggableWidgetItem';
import Button from '../common/Button';
import toast from 'react-hot-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.user.preferences);
  const widgets = useAppSelector((state) => state.dashboard.widgets);
  const favoritesCount = useAppSelector((state) => state.favorites.length);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMoveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveWidget({ dragIndex, hoverIndex }));
  }, [dispatch]);

  const handleToggleVisibility = useCallback((widgetId: string) => {
    dispatch(toggleWidgetVisibility(widgetId));
    toast.success('Widget visibility updated');
  }, [dispatch]);

  const handleResetLayout = () => {
    dispatch(resetLayout());
    toast.success('Dashboard layout reset to default');
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = preferences.categories.includes(categoryId)
      ? preferences.categories.filter((c) => c !== categoryId)
      : [...preferences.categories, categoryId];

    if (newCategories.length > 0) {
      dispatch(setCategories(newCategories));
      toast.success('Movie preferences updated');
    } else {
      toast.error('Select at least one movie category');
    }
  };

  const handleNewsCategoryToggle = (categoryId: string) => {
    const newCategories = preferences.newsCategories.includes(categoryId)
      ? preferences.newsCategories.filter((c) => c !== categoryId)
      : [...preferences.newsCategories, categoryId];

    if (newCategories.length > 0) {
      dispatch(setNewsCategories(newCategories));
      toast.success('News preferences updated');
    } else {
      toast.error('Select at least one news category');
    }
  };

  const handleTemperatureUnitChange = (unit: 'celsius' | 'fahrenheit') => {
    dispatch(setTemperatureUnit(unit));
    toast.success('Temperature unit updated');
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
      toast.success('Favorites cleared');
    }
  };

  if (!isOpen) return null;

  // Sort widgets by order for display
  const sortedWidgets = [...widgets].sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-gray-50 dark:bg-slate-800 rounded-lg shadow-2xl border border-border max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Dashboard Layout Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Dashboard Layout
            </h3>
            <p className="text-sm text-foreground/60 mb-4">
              Drag to reorder widgets or toggle visibility
            </p>

            <div className="space-y-2">
              {sortedWidgets.map((widget, index) => (
                <DraggableWidgetItem
                  key={widget.id}
                  widget={widget}
                  index={index}
                  moveWidget={handleMoveWidget}
                  onToggleVisibility={handleToggleVisibility}
                />
              ))}
            </div>

            <button
              onClick={handleResetLayout}
              className="mt-3 flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              <FiRefreshCw className="h-3 w-3" />
              Reset to default
            </button>
          </div>

          {/* Movie Categories */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Movie Categories
            </h3>
            <p className="text-sm text-foreground/60 mb-4">
              Select which movie categories to display
            </p>

            <div className="grid grid-cols-2 gap-2">
              {MOVIE_CATEGORIES.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={preferences.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-sm text-foreground">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* News Categories */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              News Categories
            </h3>
            <p className="text-sm text-foreground/60 mb-4">
              Select which news categories to display
            </p>

            <div className="grid grid-cols-2 gap-2">
              {NEWS_CATEGORIES.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={preferences.newsCategories?.includes(category.id) ?? false}
                    onChange={() => handleNewsCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-sm text-foreground">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Temperature Unit */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Temperature Unit
            </h3>
            <p className="text-sm text-foreground/60 mb-4">
              Choose your preferred temperature unit
            </p>

            <div className="flex gap-4">
              {TEMPERATURE_UNITS.map((unit) => (
                <label
                  key={unit.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="temperatureUnit"
                    checked={preferences.temperatureUnit === unit.id}
                    onChange={() => handleTemperatureUnitChange(unit.id as 'celsius' | 'fahrenheit')}
                    className="w-4 h-4 border-border"
                  />
                  <span className="text-foreground">
                    {unit.name} ({unit.label})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Data Management
            </h3>

            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Favorites</p>
                <p className="text-sm text-foreground/60">
                  {favoritesCount} item{favoritesCount !== 1 ? 's' : ''} saved
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearFavorites}
                disabled={favoritesCount === 0}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-border flex-shrink-0">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}
