'use client';

import { useState, useCallback } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setFavorites } from '@/store/slices/favoritesSlice';
import DraggableMovieCard from '../cards/DraggableMovieCard';
import { Movie } from '@/types';

export default function DraggableFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const [cards, setCards] = useState(favorites.map(fav => fav.data));

  // Update local state when Redux state changes
  useState(() => {
    setCards(favorites.map(fav => fav.data));
  });

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const draggedCard = newCards[dragIndex];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, draggedCard);

      // Update Redux state with new order
      const newFavorites = newCards.map((movie, index) => ({
        id: String(movie.id),
        type: 'movie' as const,
        data: movie,
        addedAt: favorites[index]?.addedAt || Date.now(),
      }));
      dispatch(setFavorites(newFavorites));

      return newCards;
    });
  }, [dispatch, favorites]);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center space-x-2 mb-6">
        <FiHeart className="h-6 w-6 text-red-500" />
        <h2 className="text-2xl font-bold text-foreground">
          Your Favorites
          <span className="ml-2 text-sm font-normal text-foreground/60">
            ({favorites.length}) - Drag to reorder
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cards.slice(0, 10).map((movie, index) => (
          <DraggableMovieCard
            key={movie.id}
            movie={movie}
            index={index}
            moveCard={moveCard}
          />
        ))}
      </div>
    </section>
  );
}
