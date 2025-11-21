describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Helper to click desktop sidebar links (not mobile nav)
  const clickSidebarLink = (text: string) => {
    cy.get('aside[aria-label="Main navigation"]').contains('a', text).click()
  }

  it('should navigate to Movies page', () => {
    clickSidebarLink('Movies')
    cy.url().should('include', '/movies')
    cy.contains('Discover trending, popular').should('be.visible')
  })

  it('should navigate to News page', () => {
    clickSidebarLink('News')
    cy.url().should('include', '/news')
    cy.contains('Latest News').should('be.visible')
  })

  it('should navigate to Social page', () => {
    clickSidebarLink('Social Feed')
    cy.url().should('include', '/social')
    // Check for page heading, not sidebar link text
    cy.get('h1').contains('Social Feed').should('be.visible')
  })

  it('should navigate to Weather page', () => {
    clickSidebarLink('Weather')
    cy.url().should('include', '/weather')
  })

  it('should navigate to Trending page', () => {
    clickSidebarLink('Trending')
    cy.url().should('include', '/trending')
  })

  it('should navigate to Favorites page', () => {
    clickSidebarLink('Favorites')
    cy.url().should('include', '/favorites')
  })

  it('should navigate back to Dashboard', () => {
    clickSidebarLink('Movies')
    cy.url().should('include', '/movies')

    clickSidebarLink('Dashboard')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should highlight active page in sidebar', () => {
    clickSidebarLink('News')

    // Target only the desktop sidebar
    cy.get('aside[aria-label="Main navigation"]').within(() => {
      cy.contains('a', 'News')
        .should('have.class', 'bg-primary-500')
    })
  })
})
