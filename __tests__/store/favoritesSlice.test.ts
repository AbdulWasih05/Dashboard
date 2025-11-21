import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
  setFavorites,
} from '@/store/slices/favoritesSlice'
import { Movie } from '@/types'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28],
  popularity: 100,
  adult: false,
  original_language: 'en',
}

describe('favoritesSlice', () => {
  const initialState = []

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addFavorite', () => {
    const actual = favoritesReducer(initialState, addFavorite(mockMovie))

    expect(actual).toHaveLength(1)
    expect(actual[0].id).toBe('1')
    expect(actual[0].type).toBe('movie')
    expect(actual[0].data).toEqual(mockMovie)
    expect(actual[0].addedAt).toBeDefined()
  })

  it('should not add duplicate favorites', () => {
    const stateWithFavorite = [
      {
        id: '1',
        type: 'movie' as const,
        data: mockMovie,
        addedAt: Date.now(),
      },
    ]

    const actual = favoritesReducer(stateWithFavorite, addFavorite(mockMovie))
    expect(actual).toHaveLength(1)
  })

  it('should handle removeFavorite', () => {
    const stateWithFavorites = [
      {
        id: '1',
        type: 'movie' as const,
        data: mockMovie,
        addedAt: Date.now(),
      },
      {
        id: '2',
        type: 'movie' as const,
        data: { ...mockMovie, id: 2 },
        addedAt: Date.now(),
      },
    ]

    const actual = favoritesReducer(stateWithFavorites, removeFavorite('1'))

    expect(actual).toHaveLength(1)
    expect(actual[0].id).toBe('2')
  })

  it('should handle clearFavorites', () => {
    const stateWithFavorites = [
      {
        id: '1',
        type: 'movie' as const,
        data: mockMovie,
        addedAt: Date.now(),
      },
    ]

    const actual = favoritesReducer(stateWithFavorites, clearFavorites())
    expect(actual).toHaveLength(0)
  })

  it('should handle setFavorites', () => {
    const newFavorites = [
      {
        id: '1',
        type: 'movie' as const,
        data: mockMovie,
        addedAt: Date.now(),
      },
      {
        id: '2',
        type: 'movie' as const,
        data: { ...mockMovie, id: 2 },
        addedAt: Date.now(),
      },
    ]

    const actual = favoritesReducer(initialState, setFavorites(newFavorites))
    expect(actual).toEqual(newFavorites)
  })
})
