/// <reference types="cypress" />

// Custom command to get element by data-testid
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-testid=${selector}]`)
})

// Example of other useful custom commands:

// Command to login (if authentication is implemented)
// Cypress.Commands.add('login', (email, password) => {
//   cy.session([email, password], () => {
//     cy.visit('/login')
//     cy.get('input[name=email]').type(email)
//     cy.get('input[name=password]').type(password)
//     cy.get('button[type=submit]').click()
//     cy.url().should('not.include', '/login')
//   })
// })

export {}
