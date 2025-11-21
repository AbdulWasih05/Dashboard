describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to Movies page', () => {
    cy.contains('Movies').click()
    cy.url().should('include', '/movies')
    cy.contains('Discover trending, popular').should('be.visible')
  })

  it('should navigate to News page', () => {
    cy.contains('News').click()
    cy.url().should('include', '/news')
    cy.contains('Latest News').should('be.visible')
  })

  it('should navigate to Social page', () => {
    cy.contains('Social Feed').click()
    cy.url().should('include', '/social')
    cy.contains('Social Feed').should('be.visible')
  })

  it('should navigate to Weather page', () => {
    cy.contains('Weather').click()
    cy.url().should('include', '/weather')
  })

  it('should navigate to Trending page', () => {
    cy.contains('Trending').click()
    cy.url().should('include', '/trending')
  })

  it('should navigate to Favorites page', () => {
    cy.contains('Favorites').click()
    cy.url().should('include', '/favorites')
  })

  it('should navigate back to Dashboard', () => {
    cy.contains('Movies').click()
    cy.url().should('include', '/movies')

    cy.contains('Dashboard').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should highlight active page in sidebar', () => {
    cy.contains('News').click()

    cy.get('aside').within(() => {
      cy.contains('News')
        .parent()
        .should('have.class', 'bg-primary-500')
    })
  })
})
