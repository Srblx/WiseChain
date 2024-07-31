import { CypressData } from '../data/data';

describe('Profile', () => {
  it('Should update user profile', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/');
    cy.wait(5000);
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);
    cy.get('input[placeholder="************"]')
      .clear()
      .type(CypressData.password);
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.get('#btn-user').click();
    cy.wait(2000);
    cy.get('#profile-link').click();
    cy.get('#btn-edit-profile').click();
    cy.get('input[placeholder="firstname"]').click();
    cy.get('input[placeholder="firstname"]').clear().type('John');
    cy.get('input[placeholder="lastname"]').click();
    cy.get('input[placeholder="lastname"]').clear().type('Doe');
    cy.get('input[placeholder="pseudo"]').click();
    cy.get('input[placeholder="pseudo"]').clear().type('johndoe_test');
    cy.get('#btn-save-profile').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Profil utilisateur modifié avec succès'
    );
  });

  it('Should update password failed length', () => {
    cy.visit('/profile');
    cy.get('#compte-link').click();
    cy.get('#update-password-or-cancel').click();
    cy.wait(2000);
    cy.get('input[placeholder="Ancien mot de passe"]').click();
    cy.get('input[placeholder="Ancien mot de passe"]')
      .clear()
      .type(CypressData.password);
    cy.get('input[placeholder="Nouveau mot de passe"]')
      .click()
      .clear()
      .type(CypressData.passwordLenghtError);

    cy.get('input[placeholder="Confirmation mot de passe"]')
      .click()
      .clear()
      .type(CypressData.passwordLenghtError);
    cy.get('#register-new-password').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Le mot de passe doit avoir au moins 12 caractères'
    );
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    );
  });

  it('Should update password corespondence failed ', () => {
    cy.visit('/profile');
    cy.get('#compte-link').click();
    cy.get('#update-password-or-cancel').click();
    cy.wait(2000);
    cy.get('input[placeholder="Ancien mot de passe"]').click();
    cy.get('input[placeholder="Ancien mot de passe"]')
      .clear()
      .type(CypressData.password);
    cy.get('input[placeholder="Nouveau mot de passe"]')
      .click()
      .clear()
      .type(CypressData.password);
    cy.get('input[placeholder="Confirmation mot de passe"]')
      .click()
      .clear()
      .type(CypressData.passwordError);
    cy.get('#register-new-password').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Les mots de passe ne correspondent pas'
    );
  });

  it('Should update password success', () => {
    cy.visit('/profile');
    cy.get('#compte-link').click();
    cy.get('#update-password-or-cancel').click();
    cy.wait(2000);
    cy.get('input[placeholder="Ancien mot de passe"]').click();
    cy.get('input[placeholder="Ancien mot de passe"]')
      .clear()
      .type(CypressData.password);
    cy.get('input[placeholder="Nouveau mot de passe"]')
      .click()
      .clear()
      .type('Motdepasse123@');
    cy.get('input[placeholder="Confirmation mot de passe"]')
      .click()
      .clear()
      .type('Motdepasse123@');
    cy.get('#register-new-password').click();
    // cy.get('.Toastify__toast-body').should(
    //   'contain',
    //   'Mot de passe mis à jour avec succès'
    // );
    cy.wait(2000);
    cy.get('#delete-account-button').click();
    cy.get('#confirm-dialog').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      'Erreur lors de la suppression du compte'
    );
  });
});
