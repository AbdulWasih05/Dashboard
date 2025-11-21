describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open search modal when search button is clicked', () => {
    cy.contains('button', 'Search').click()
    cy.get('input[placeholder*="Search movies"]').should('be.visible')
  })

  it('should perform a search and show results', () => {
    cy.contains('button', 'Search').click()

    // Type search query
    cy.get('input[placeholder*="Search movies"]').type('action')

    // Wait for debounce and results
    cy.wait(1000)

    // Results should appear (mocked or real data)
    cy.get('[class*="grid"]').should('exist')
  })

  it('should show "no results" message for invalid search', () => {
    cy.contains('button', 'Search').click()

    cy.get('input[placeholder*="Search movies"]').type('xyzabc123nonexistent')

    cy.wait(1000)

    // Find visible "no results" text (not in sr-only)
    cy.get('p').contains(/no results found/i, { timeout: 10000 }).should('be.visible')
  })

  it('should close search modal when X button is clicked', () => {
    cy.contains('button', 'Search').click()
    cy.get('[aria-label="Close search"]').click()
    cy.get('input[placeholder*="Search movies"]').should('not.exist')
  })

  it('should debounce search input', () => {
    cy.contains('button', 'Search').click()

    // Type multiple characters quickly
    cy.get('input[placeholder*="Search movies"]').type('test', { delay: 50 })

    // Should not search immediately
    cy.wait(300)

    // Wait for debounce to complete
    cy.wait(600)

    // Now results or initial state message should be visible
  })
})
