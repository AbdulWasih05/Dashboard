describe('Settings', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should open settings modal', () => {
    cy.get('[aria-label="Settings"]').click()
    cy.contains('Settings').should('be.visible')
    cy.contains('Content Preferences').should('be.visible')
  })

  it('should allow toggling content categories', () => {
    cy.get('[aria-label="Settings"]').click()

    // Uncheck a category
    cy.contains('Popular').parent().find('input[type="checkbox"]').uncheck()

    cy.contains('Done').click()

    // Verify toast or updated preferences
    cy.contains(/preferences updated/i, { timeout: 3000 })
  })

  it('should prevent unchecking all categories', () => {
    cy.get('[aria-label="Settings"]').click()

    // Try to uncheck all categories
    cy.get('input[type="checkbox"]').each(($checkbox, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($checkbox).uncheck()
      }
    })

    // Try to uncheck the last one
    cy.get('input[type="checkbox"]:checked').last().click()

    // Should show error message
    cy.contains(/select at least one category/i, { timeout: 3000 })
  })

  it('should clear all favorites with confirmation', () => {
    // Add some favorites first
    cy.contains('Trending Movies', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Add to favorites"]').first().click()
    cy.wait(1000)

    // Open settings
    cy.get('[aria-label="Settings"]').click()

    // Click clear favorites
    cy.contains('Clear All').click()

    // Handle browser confirmation (stub it for testing)
    cy.on('window:confirm', () => true)
  })

  it('should close settings modal', () => {
    cy.get('[aria-label="Settings"]').click()
    cy.contains('Settings').should('be.visible')

    cy.get('[aria-label="Close"]').click()
    cy.contains('Content Preferences').should('not.exist')
  })
})
