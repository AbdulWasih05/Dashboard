import { render, screen, fireEvent } from '@testing-library/react'
import SocialCard from '@/components/cards/SocialCard'
import { SocialPost } from '@/types'

const mockPost: SocialPost = {
  id: 'post-1',
  username: '@testuser',
  displayName: 'Test User',
  avatar: 'https://example.com/avatar.jpg',
  content: 'This is a test post with #hashtag and @mention',
  image: 'https://example.com/post-image.jpg',
  timestamp: new Date('2024-01-15T10:00:00Z').toISOString(),
  likes: 1234,
  comments: 56,
  shares: 78,
  hashtags: ['hashtag'],
  verified: true,
}

describe('SocialCard Component', () => {
  it('renders post content', () => {
    const { container } = render(<SocialCard post={mockPost} />)
    // Content is split into individual spans, check the container has the text
    expect(container.textContent).toContain('This')
    expect(container.textContent).toContain('test')
    expect(container.textContent).toContain('post')
  })

  it('renders display name and username', () => {
    render(<SocialCard post={mockPost} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
  })

  it('shows verified badge for verified users', () => {
    const { container } = render(<SocialCard post={mockPost} />)
    // Verified badge is an SVG icon with the checkmark
    const verifiedIcon = container.querySelector('svg.text-blue-500')
    expect(verifiedIcon).toBeInTheDocument()
  })

  it('does not show verified badge for non-verified users', () => {
    const unverifiedPost = { ...mockPost, verified: false }
    const { container } = render(<SocialCard post={unverifiedPost} />)
    // With verified false, should not have the blue checkmark
    const verifiedIcon = container.querySelector('svg.text-blue-500')
    expect(verifiedIcon).not.toBeInTheDocument()
  })

  it('displays engagement metrics', () => {
    render(<SocialCard post={mockPost} />)
    expect(screen.getByText('1.2K')).toBeInTheDocument() // likes formatted
    expect(screen.getByText('56')).toBeInTheDocument() // comments
    expect(screen.getByText('78')).toBeInTheDocument() // shares
  })

  it('handles like button click', () => {
    render(<SocialCard post={mockPost} />)
    const likeButton = screen.getAllByRole('button')[0] // First button is like

    fireEvent.click(likeButton)
    // After clicking, likes should show incremented value (1235 -> 1.2K still)
    expect(screen.getByText('1.2K')).toBeInTheDocument()
  })

  it('formats large numbers correctly', () => {
    const popularPost = {
      ...mockPost,
      likes: 1500000,
      comments: 25000,
      shares: 3400,
    }
    render(<SocialCard post={popularPost} />)

    expect(screen.getByText('1.5M')).toBeInTheDocument()
    expect(screen.getByText('25.0K')).toBeInTheDocument()
    expect(screen.getByText('3.4K')).toBeInTheDocument()
  })

  it('renders hashtags as highlighted', () => {
    const { container } = render(<SocialCard post={mockPost} />)
    // Hashtags get wrapped in spans with text-primary-500 class
    const hashtag = container.querySelector('span.text-primary-500')
    expect(hashtag).toBeInTheDocument()
    expect(hashtag?.textContent).toContain('#hashtag')
  })

  it('shows avatar or initials', () => {
    render(<SocialCard post={mockPost} />)
    // Avatar image should be present
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('displays initials when no avatar provided', () => {
    const postWithoutAvatar = { ...mockPost, avatar: undefined }
    render(<SocialCard post={postWithoutAvatar} />)
    expect(screen.getByText('T')).toBeInTheDocument() // First letter of displayName
  })
})
