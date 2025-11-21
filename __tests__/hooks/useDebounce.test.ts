import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

// Mock timers
jest.useFakeTimers()

describe('useDebounce Hook', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })

    // Value should not update immediately
    expect(result.current).toBe('initial')

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now value should be updated
    expect(result.current).toBe('updated')
  })

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'v1' },
      }
    )

    // Rapid updates
    rerender({ value: 'v2' })
    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ value: 'v3' })
    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ value: 'v4' })

    // Should still be initial value
    expect(result.current).toBe('v1')

    // Complete the delay
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should be last value
    expect(result.current).toBe('v4')
  })

  it('works with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 1000 },
      }
    )

    rerender({ value: 'updated', delay: 1000 })

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('test')

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('updated')
  })

  it('handles non-string values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 123 },
      }
    )

    expect(result.current).toBe(123)

    rerender({ value: 456 })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe(456)
  })
})
