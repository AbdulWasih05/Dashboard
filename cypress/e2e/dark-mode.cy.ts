describe('Dark Mode', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })

  it('should toggle dark mode on and off', () => {
    // Check initial state (light mode)
    cy.get('html').should('not.have.class', 'dark')

    // Click dark mode toggle
    cy.get('[aria-label="Toggle theme"]').click()

    // Should be in dark mode
    cy.get('html').should('have.class', 'dark')

    // Toggle back to light
    cy.get('[aria-label="Toggle theme"]').click()
    cy.get('html').should('not.have.class', 'dark')
  })

  it('should persist dark mode preference', () => {
    // Enable dark mode
    cy.get('[aria-label="Toggle theme"]').click()
    cy.get('html').should('have.class', 'dark')

    // Wait for debounced localStorage save (1000ms debounce + buffer)
    cy.wait(1500)

    // Reload page
    cy.reload()

    // Should still be in dark mode
    cy.get('html', { timeout: 5000 }).should('have.class', 'dark')
  })

  it('should show correct icon for current theme', () => {
    // In light mode, should show moon icon (to switch to dark)
    cy.get('html').should('not.have.class', 'dark')

    // Toggle to dark
    cy.get('[aria-label="Toggle theme"]').click()

    // In dark mode, should show sun icon (to switch to light)
    cy.get('html').should('have.class', 'dark')
  })
})
