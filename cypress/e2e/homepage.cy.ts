describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.contains('Welcome to Your Dashboard').should('be.visible')
  })

  it('should display the header with navigation', () => {
    cy.contains('Content Dashboard').should('be.visible')
  })

  it('should display sidebar navigation', () => {
    // Check for sidebar items (may need to open on mobile)
    cy.get('aside').should('exist')
  })

  it('should show weather widget', () => {
    cy.contains('Weather', { timeout: 10000 }).should('be.visible')
  })

  it('should show trending movies section', () => {
    cy.contains('Trending Movies').should('be.visible')
  })

  it('should show latest news section', () => {
    cy.contains('Latest News').should('be.visible')
  })

  it('should show social feed section', () => {
    cy.contains('Social Feed').should('be.visible')
  })

  it('should have working navigation links', () => {
    // Test navigation to movies page
    cy.contains('View All', { timeout: 10000 }).first().click()
    cy.url().should('include', '/movies')

    // Go back to home
    cy.visit('/')
  })
})
