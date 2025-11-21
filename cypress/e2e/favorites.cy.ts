describe('Favorites Functionality', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should add a movie to favorites', () => {
    // Wait for movies to load
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')

    // Click first favorite button
    cy.get('[aria-label="Add to favorites"]').first().click()

    // Toast notification should appear
    cy.contains(/added to favorites/i, { timeout: 5000 }).should('be.visible')

    // Favorites count should update in header
    cy.get('header').within(() => {
      cy.contains('1').should('be.visible')
    })
  })

  it('should remove a movie from favorites', () => {
    // Add a favorite first
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Add to favorites"]').first().click()
    cy.wait(1000)

    // Click to remove
    cy.get('[aria-label="Remove from favorites"]').first().click()

    // Toast notification
    cy.contains(/removed from favorites/i, { timeout: 5000 }).should('be.visible')
  })

  it('should navigate to favorites page', () => {
    // Add some favorites first
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Add to favorites"]').first().click()
    cy.wait(500)

    // Navigate to favorites via sidebar or header
    cy.visit('/favorites')

    cy.contains('Your Favorites').should('be.visible')
    cy.contains(/1 item/i).should('be.visible')
  })

  it('should persist favorites after page reload', () => {
    // Add favorite
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Add to favorites"]').first().click()
    cy.wait(1000)

    // Reload page
    cy.reload()

    // Favorites should still be there
    cy.get('header').within(() => {
      cy.contains('1', { timeout: 5000 }).should('be.visible')
    })
  })

  it('should show empty state when no favorites', () => {
    cy.visit('/favorites')

    cy.contains('No favorites yet').should('be.visible')
    cy.contains('Browse Movies').should('be.visible')
  })
})
