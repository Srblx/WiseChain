import { CypressData } from '../data/data';

describe('Profile', () => {
  it('Should update user profile', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/');
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);
    cy.get('input[placeholder="************"]')
      .clear()
      .type(CypressData.password);
    cy.get('button[type="submit"]').click();

    cy.reload();
    cy.get('#btn-user').click();
    cy.get('a').contains('Profile').click();
    cy.get('button').contains('Modifier mon profil').click();
    cy.get('input[placeholder="firstname"]').clear().type('John test');
    cy.get('button[type="button"]')
      .contains('Enregistrer le nouveau mot de passe')
      .click();
    cy.get('input[placeholder="firstname"]').should('have.value', 'John test');
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Profil modifié avec succès'
    );
  });

  it("met à jour le prénom de l'utilisateur", () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.get('a').contains('Profile').click();
    cy.get('button').contains('Modifier mon profil').click();
    cy.get('input[placeholder="lastname"]').clear().type('Doe test');
    cy.get('button[type="button"]')
      .contains('Enregistrer le nouveau mot de passe')
      .click();
    cy.get('input[placeholder="lastname"]').should('have.value', 'Doe test');
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Profil modifié avec succès'
    );
  });

  it("met à jour le pseudo de l'utilisateur", () => {
    cy.get('a').contains('Profile').click();
    cy.get('button').contains('Modifier mon profil').click();
    cy.get('input[placeholder="pseudo"]').clear().type('johndoe_test');
    cy.get('button[type="button"]')
      .contains('Enregistrer le nouveau mot de passe')
      .click();
    cy.get('input[placeholder="pseudo"]').should('have.value', 'johndoe_test');
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Profil modifié avec succès'
    );
  });

  it('annule la modification du profil', () => {
    cy.get('a').contains('Profile').click();
    cy.get('button').contains('Modifier mon profil').click();

    cy.get('input[placeholder="firstname"]').clear().type('New name');
    cy.get('input[placeholder="lastname"]').clear().type('New lastname');
    cy.get('input[placeholder="pseudo"]').clear().type('New pseudo');

    cy.get('button').contains('Annuler').click();

    cy.get('input[placeholder="firstname"]').should(
      'not.have.value',
      'New name'
    );
    cy.get('input[placeholder="lastname"]').should(
      'not.have.value',
      'New lastname'
    );
    cy.get('input[placeholder="pseudo"]').should(
      'not.have.value',
      'New pseudo'
    );
  });
});
