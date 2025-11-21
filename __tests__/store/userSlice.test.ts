import userReducer, {
  setTheme,
  setCategories,
  setLocation,
  setOnboarded,
  resetPreferences,
} from '@/store/slices/userSlice'

describe('userSlice', () => {
  const initialState = {
    preferences: {
      categories: ['popular', 'top_rated', 'upcoming'],
      newsCategories: ['general', 'technology'],
      temperatureUnit: 'celsius' as const,
      language: 'en',
      theme: 'light' as const,
    },
    isOnboarded: false,
  }

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setTheme', () => {
    const actual = userReducer(initialState, setTheme('dark'))
    expect(actual.preferences.theme).toEqual('dark')
  })

  it('should handle setCategories', () => {
    const newCategories = ['trending', 'popular']
    const actual = userReducer(initialState, setCategories(newCategories))
    expect(actual.preferences.categories).toEqual(newCategories)
  })

  it('should handle setLocation', () => {
    const location = {
      latitude: 12.9716,
      longitude: 77.5946,
      city: 'Bangalore',
    }
    const actual = userReducer(initialState, setLocation(location))
    expect(actual.preferences.location).toEqual(location)
  })

  it('should handle setOnboarded', () => {
    const actual = userReducer(initialState, setOnboarded(true))
    expect(actual.isOnboarded).toBe(true)
  })

  it('should handle resetPreferences', () => {
    const modifiedState = {
      ...initialState,
      preferences: {
        ...initialState.preferences,
        theme: 'dark' as const,
        categories: ['trending'],
      },
    }
    const actual = userReducer(modifiedState, resetPreferences())
    expect(actual.preferences).toEqual(initialState.preferences)
  })
})
