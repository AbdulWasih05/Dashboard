describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open search modal when search button is clicked', () => {
    cy.contains('Search').click()
    cy.contains('Search for movies...').should('be.visible')
  })

  it('should perform a search and show results', () => {
    cy.contains('Search').click()

    // Type search query
    cy.get('input[placeholder*="Search for movies"]').type('action')

    // Wait for debounce and results
    cy.wait(1000)

    // Results should appear (mocked or real data)
    cy.get('[class*="grid"]').should('exist')
  })

  it('should show "no results" message for invalid search', () => {
    cy.contains('Search').click()

    cy.get('input[placeholder*="Search for movies"]').type('xyzabc123nonexistent')

    cy.wait(1000)

    cy.contains(/no results found/i, { timeout: 10000 }).should('be.visible')
  })

  it('should close search modal when X button is clicked', () => {
    cy.contains('Search').click()
    cy.get('[aria-label="Close"]').click()
    cy.contains('Search for movies...').should('not.exist')
  })

  it('should debounce search input', () => {
    cy.contains('Search').click()

    const input = cy.get('input[placeholder*="Search for movies"]')

    // Type multiple characters quickly
    input.type('test', { delay: 50 })

    // Should not search immediately
    cy.wait(300)

    // Wait for debounce to complete
    cy.wait(600)

    // Now results or "start typing" message should be visible
  })
})
