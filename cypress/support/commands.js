
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Daniel');
    cy.get('#lastName').type('Almeida');
    cy.get('#email').type('laura.undc@hotmail.com');
    cy.get('#phone').type('999053389');
    cy.get('#email-checkbox').click();
    cy.get('#phone-checkbox').click();
    cy.get('#open-text-area').type('saboroso');
    cy.get('.button').click();
}) 


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Daniel').should('be.visible');
    cy.get('#lastName').type('Almeida').should('be.visible');
    cy.get('#email').type('laura.undc@hotmail.com').should('be.visible');
    cy.get('#phone').type('999053389').should('be.visible');
    cy.get('#email-checkbox').click();
    cy.get('#phone-checkbox').click();
    cy.get('#open-text-area').type('saboroso').should('be.visible');
    cy.contains('button','Enviar').click();// <-- metodo contains
})  
