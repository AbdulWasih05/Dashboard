import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import NewsCard from '@/components/cards/NewsCard'
import { NewsArticle } from '@/types'
import favoritesReducer from '@/store/slices/favoritesSlice'

const createMockStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  })
}

const mockArticle: NewsArticle = {
  id: 'test-1',
  title: 'Breaking News: Test Article',
  description: 'This is a test news article description',
  content: 'Full content of the test article',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2024-01-15T10:00:00Z',
  source: {
    id: 'test-source',
    name: 'Test News',
  },
  author: 'John Doe',
  category: 'technology',
}

describe('NewsCard Component', () => {
  it('renders article title', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <NewsCard article={mockArticle} />
      </Provider>
    )
    expect(screen.getByText('Breaking News: Test Article')).toBeInTheDocument()
  })

  it('renders article description', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <NewsCard article={mockArticle} />
      </Provider>
    )
    expect(screen.getByText(/This is a test news article description/)).toBeInTheDocument()
  })

  it('displays source name', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <NewsCard article={mockArticle} />
      </Provider>
    )
    expect(screen.getByText('Test News')).toBeInTheDocument()
  })

  it('displays author name', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <NewsCard article={mockArticle} />
      </Provider>
    )
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
  })

  it('renders Read link with correct href', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <NewsCard article={mockArticle} />
      </Provider>
    )
    const link = screen.getByRole('link', { name: /Read/i })
    // NewsCard uses internal routing to /news/[id]
    expect(link).toHaveAttribute('href', '/news/test-1')
  })

  it('shows placeholder when urlToImage is null', () => {
    const store = createMockStore()
    const articleWithoutImage = { ...mockArticle, urlToImage: null }
    render(
      <Provider store={store}>
        <NewsCard article={articleWithoutImage} />
      </Provider>
    )
    expect(screen.getByText('📰')).toBeInTheDocument()
  })

  it('handles missing author gracefully', () => {
    const store = createMockStore()
    const articleWithoutAuthor = { ...mockArticle, author: null }
    render(
      <Provider store={store}>
        <NewsCard article={articleWithoutAuthor} />
      </Provider>
    )
    expect(screen.queryByText(/John Doe/)).not.toBeInTheDocument()
  })
})
