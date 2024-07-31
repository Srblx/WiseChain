describe('Auth', () => {
  it('Should navigate on web site', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });
  });

  it('Should navigate on login page', () => {
    cy.visit('/');
    cy.wait(3500);
    cy.visit('/courses/Investissement');
    cy.url().should('include', '/courses/Investissement');
    cy.wait(3500);
    cy.visit('/courses/Crypto-monnaie');
    cy.url().should('include', '/courses/Crypto-monnaie');
    cy.wait(3500);
    cy.visit('/courses/Blockchain');
    cy.url().should('include', '/courses/Blockchain');
    cy.wait(3500);
    cy.visit('/courses/NFT');
    cy.url().should('include', '/courses/NFT');
    cy.wait(3500);
    cy.get('#logo').click();
    cy.get('footer').contains('FAQ').click();
    cy.url().should('include', '/faq');
    cy.get('footer').contains('À Propos').click();
    cy.url().should('include', '/about');
    cy.get('footer').contains("Condition d'utilisation").click();
    cy.url().should('include', '/terms');
    cy.get('footer').contains('Politique de confidentialité').click();
    cy.url().should('include', '/privacy');
  });
});
