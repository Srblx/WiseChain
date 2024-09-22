import { CypressData } from '../data/data';

describe('Profile', () => {
  before(() => {
    // Gérer les exceptions non capturées
    Cypress.on('uncaught:exception', () => false);
  });

  const login = (email: string, password: string) => {
    cy.visit('/');
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="************"]').clear().type(password);
    cy.get('button[type="submit"]').click();
  };

  const openProfile = () => {
    cy.get('#btn-user').click({ force: true });
    cy.get('#profile-link').click();
  };

  const updateProfile = (firstname: string, lastname: string, pseudo: string) => {
    cy.get('#btn-edit-profile').click();
    cy.get('input[placeholder="firstname"]').clear().type(firstname);
    cy.get('input[placeholder="lastname"]').clear().type(lastname);
    cy.get('input[placeholder="pseudo"]').clear().type(pseudo);
    cy.get('button').contains('Enregistrer les modifications').click();
  };

  const updatePassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
    cy.get('#update-password').click();
    cy.get('input[placeholder="Ancien"]').clear().type(oldPassword);
    cy.get('input[placeholder="Nouveau"]').clear().type(newPassword);
    cy.get('input[placeholder="Confirmation"]').clear().type(confirmPassword);
    cy.get('button').contains('Enregistrer le mot de passe').click();
  };

  it('Should update user profile', () => {
    login(CypressData.mail, CypressData.password);
    cy.wait(2000);
    openProfile();
    updateProfile('John', 'Doe', 'johndoe_test');
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Profil utilisateur modifié avec succès'
    );
  });

  it('Should update password failed length', () => {
    login(CypressData.mail, CypressData.password);
    cy.wait(2000);
    openProfile();
    updatePassword(CypressData.password, CypressData.passwordLenghtError, CypressData.passwordLenghtError);
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Le mot de passe doit avoir au moins 12 caractères'
    );
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    );
  });

  it('Should update password correspondence failed', () => {
    login(CypressData.mail, CypressData.password);
    cy.wait(2000);
    openProfile();
    updatePassword(CypressData.password, CypressData.password, CypressData.passwordError);
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Les mots de passe ne correspondent pas'
    );
  });

  it('Should update password success', () => {
    login(CypressData.mail, CypressData.password);
    cy.wait(2000);
    openProfile();
    updatePassword(CypressData.password, 'Motdepasse123@', 'Motdepasse123@');
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Mot de passe mis à jour avec succès'
    );
  });
});
