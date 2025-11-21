describe('Settings', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should open settings modal', () => {
    cy.get('[aria-label="Settings"]').click()
    cy.contains('h2', 'Settings').should('be.visible')
    cy.contains('Dashboard Layout').should('be.visible')
  })

  it('should allow toggling content categories', () => {
    cy.get('[aria-label="Settings"]').click()

    // Wait for DnD to load
    cy.contains('Movie Categories', { timeout: 5000 }).should('be.visible')

    // Click on a category label to toggle it (triggers React onChange properly)
    cy.contains('Movie Categories')
      .parent()
      .find('label')
      .first()
      .click()

    // Verify toast appears immediately after toggle
    cy.contains(/preferences updated/i, { timeout: 3000 })

    cy.contains('Done').click()
  })

  it('should prevent unchecking all categories', () => {
    cy.get('[aria-label="Settings"]').click()

    // Wait for DnD to load
    cy.contains('Movie Categories', { timeout: 5000 }).should('be.visible')

    // Click all checked category labels to uncheck them
    cy.contains('Movie Categories')
      .parent()
      .find('input[type="checkbox"]:checked')
      .each(($checkbox) => {
        cy.wrap($checkbox).parent('label').click()
      })

    // Should show error message when trying to uncheck the last one
    cy.contains(/select at least one/i, { timeout: 3000 })
  })

  it('should clear all favorites with confirmation', () => {
    // Add some favorites first
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Add to favorites"]').first().click()
    cy.wait(1000)

    // Open settings
    cy.get('[aria-label="Settings"]').click()

    // Stub the confirm dialog before clicking
    cy.on('window:confirm', () => true)

    // Click clear favorites
    cy.contains('button', 'Clear All').click()

    // Verify toast
    cy.contains(/favorites cleared/i, { timeout: 3000 })
  })

  it('should close settings modal', () => {
    cy.get('[aria-label="Settings"]').click()
    cy.contains('h2', 'Settings').should('be.visible')

    cy.get('[aria-label="Close settings"]').click()
    cy.contains('h2', 'Settings').should('not.exist')
  })
})
