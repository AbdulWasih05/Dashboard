import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import MovieCard from '@/components/cards/MovieCard'
import favoritesReducer from '@/store/slices/favoritesSlice'
import { Movie } from '@/types'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
  popularity: 100,
  adult: false,
  original_language: 'en',
}

const createMockStore = (favorites = []) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites,
    },
  })
}

describe('MovieCard Component', () => {
  it('renders movie title and overview', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText(/This is a test movie overview/)).toBeInTheDocument()
  })

  it('displays movie rating', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  it('displays release year', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('shows favorite button', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Add to favorites')
    expect(favoriteButton).toBeInTheDocument()
  })

  it('adds movie to favorites on click', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Add to favorites')
    fireEvent.click(favoriteButton)

    const state = store.getState()
    expect(state.favorites).toHaveLength(1)
    expect(state.favorites[0].data.id).toBe(mockMovie.id)
  })

  it('shows filled heart when movie is favorited', () => {
    const favorites = [
      {
        id: '1',
        type: 'movie' as const,
        data: mockMovie,
        addedAt: Date.now(),
      },
    ]
    const store = createMockStore(favorites)

    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Remove from favorites')
    expect(favoriteButton).toBeInTheDocument()
  })

  it('shows placeholder when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null }
    const store = createMockStore()

    render(
      <Provider store={store}>
        <MovieCard movie={movieWithoutPoster} />
      </Provider>
    )

    expect(screen.getByText('🎬')).toBeInTheDocument()
  })
})
