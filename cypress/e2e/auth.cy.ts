import { CypressData } from '../data/data';

describe('Auth', () => {
  before(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  const visitAndOpenUserMenu = () => {
    cy.visit('/');
    cy.get('#btn-user').click({ force: true });
  };

  const checkErrorMessage = (message: string) => {
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', message);
    cy.wait(5000);
  };

  it('Should register user', () => {
    visitAndOpenUserMenu();
    cy.contains('Pas de compte ? Créez en un !').click();
    cy.get('.checkbox').check();

    cy.get('input[placeholder="Nom"]').clear().type(CypressData.firstNameError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Le nom doit contenir entre 3 et 50 caractères');
    cy.get('input[placeholder="Nom"]').clear().type(CypressData.firstName);

    cy.get('input[placeholder="Prénom"]').clear().type(CypressData.lastNameError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Le prénom doit contenir entre 3 et 80 caractères');
    cy.get('input[placeholder="Prénom"]').clear().type(CypressData.lastName);

    cy.get('input[placeholder="Pseudo"]').clear().type(CypressData.pseudoError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Le pseudo doit contenir au moins 3 caractères');
    cy.get('input[placeholder="Pseudo"]').clear().type(CypressData.pseudo);

    cy.get('input[placeholder="Email"]').clear().type(CypressData.mailError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage("L'email n'est pas valide");
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);

    cy.get('input[placeholder="Mot de passe"]').clear().type(CypressData.passwordLenghtError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Le mot de passe doit avoir au moins 12 caractères');
    cy.get('input[placeholder="Mot de passe"]').clear().type(CypressData.passwordError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial');
    cy.get('input[placeholder="Mot de passe"]').clear().type(CypressData.password);

    cy.get('input[placeholder="Confirmation mot de passe"]').clear().type(CypressData.confirmPasswordError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error').should('be.visible');
    cy.wait(5000);
    cy.get('input[placeholder="Confirmation mot de passe"]').clear().type(CypressData.confirmPassword);

    cy.get('input[placeholder="DD/MM/YYYY"]').clear().type(CypressData.birthDateErrorMore100Years);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.');
    cy.get('input[placeholder="DD/MM/YYYY"]').clear().type(CypressData.birthDateErrorLess10Years);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.');
    cy.get('input[placeholder="DD/MM/YYYY"]').clear().type(CypressData.birthDate);

    cy.get('#country').select(CypressData.country);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    cy.get('#btn-user').click({ force: true });
  });

  it('Should login user', () => {
    visitAndOpenUserMenu();
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mailErrorConn);
    cy.get('input[placeholder="************"]').clear().type(CypressData.password);
    cy.get('button[type="submit"]').click();
    checkErrorMessage('Email ou mot de passe invalide');
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);
    cy.get('input[placeholder="************"]').clear().type(CypressData.password);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('#btn-user').click({ force: true });
  });

  it('Should send mail for new password', () => {
    visitAndOpenUserMenu();
    cy.contains('Mot de passe oublié ?').click();
    cy.get('input[placeholder="E-mail"]').clear().type(CypressData.mailError);
    cy.get('button[type="submit"]').click();
    checkErrorMessage("Cette adresse e-mail n'est pas enregistrée.");
    cy.get('input[placeholder="E-mail"]').clear().type(CypressData.mail);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('have.text', 'Un email de réinitialisation de mot de passe a été envoyé');
  });
});
