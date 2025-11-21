import {
  getWeatherInfo,
  formatRating,
  truncateText,
  isFavorited,
} from '@/utils/helpers'

describe('Utility Functions', () => {
  describe('getWeatherInfo', () => {
    it('returns correct weather info for clear sky', () => {
      const result = getWeatherInfo(0)
      expect(result.description).toBe('Clear sky')
      expect(result.icon).toBe('☀️')
    })

    it('returns unknown for invalid weather code', () => {
      const result = getWeatherInfo(999)
      expect(result.description).toBe('Unknown')
      expect(result.icon).toBe('❓')
    })

    it('returns correct info for rain', () => {
      const result = getWeatherInfo(61)
      expect(result.description).toBe('Slight rain')
      expect(result.icon).toBe('🌧️')
    })
  })

  describe('formatRating', () => {
    it('formats rating to one decimal place', () => {
      expect(formatRating(7.654)).toBe('7.7')
      expect(formatRating(8.2)).toBe('8.2')
      expect(formatRating(10)).toBe('10.0')
    })
  })

  describe('truncateText', () => {
    it('returns original text if shorter than maxLength', () => {
      const text = 'Short text'
      expect(truncateText(text, 20)).toBe(text)
    })

    it('truncates text and adds ellipsis', () => {
      const text = 'This is a very long text that needs to be truncated'
      const result = truncateText(text, 20)
      expect(result).toBe('This is a very long...')
      expect(result.length).toBeLessThanOrEqual(23) // 20 + '...'
    })

    it('handles exact maxLength', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe(text)
    })
  })

  describe('isFavorited', () => {
    const favorites = [
      { id: '1', data: {}, type: 'movie' as const, addedAt: Date.now() },
      { id: '2', data: {}, type: 'movie' as const, addedAt: Date.now() },
      { id: '3', data: {}, type: 'movie' as const, addedAt: Date.now() },
    ]

    it('returns true if item is in favorites', () => {
      expect(isFavorited('2', favorites)).toBe(true)
    })

    it('returns false if item is not in favorites', () => {
      expect(isFavorited('99', favorites)).toBe(false)
    })

    it('handles empty favorites array', () => {
      expect(isFavorited('1', [])).toBe(false)
    })
  })
})
