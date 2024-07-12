import { CypressData } from '../data/data';

describe('Auth', () => {
  it('Should register user', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/');
    cy.get('#btn-user').click();
    cy.contains('Pas de compte ? Créez en un !').click();

    cy.get('.checkbox').check();

    cy.get('input[placeholder="Nom"]').clear().type(CypressData.firstNameError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le nom doit contenir entre 3 et 50 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Nom"]').clear().type(CypressData.firstName);

    cy.get('input[placeholder="Prénom"]')
      .clear()
      .type(CypressData.lastNameError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le prénom doit contenir entre 3 et 80 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Prénom"]').clear().type(CypressData.lastName);

    cy.get('input[placeholder="Pseudo"]').clear().type(CypressData.pseudoError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le pseudo doit contenir au moins 3 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Pseudo"]').clear().type(CypressData.pseudo);

    cy.get('input[placeholder="Email"]').clear().type(CypressData.mailError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', "L'email n'est pas valide");
    cy.wait(5000);
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);

    cy.get('input[placeholder="Mot de passe"]')
      .clear()
      .type(CypressData.passwordLenghtError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le mot de passe doit avoir au moins 12 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Mot de passe"]')
      .clear()
      .type(CypressData.passwordError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and(
        'have.text',
        'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
      );
    cy.wait(5000);
    cy.get('input[placeholder="Mot de passe"]')
      .clear()
      .type(CypressData.password);

    cy.get('input[placeholder="Confirmation mot de passe"]')
      .clear()
      .type(CypressData.confirmPasswordError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error').should('be.visible');
    //   .and('have.text', 'Les mots de passe ne correspondent pas');
    cy.wait(5000);
    cy.get('input[placeholder="Confirmation mot de passe"]')
      .clear()
      .type(CypressData.confirmPassword);

    cy.get('input[placeholder="DD/MM/YYYY"]')
      .clear()
      .type(CypressData.birthDateErrorMore100Years);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and(
        'have.text',
        'Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.'
      );
    cy.wait(5000);
    cy.get('input[placeholder="DD/MM/YYYY"]')
      .clear()
      .type(CypressData.birthDateErrorLess10Years);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and(
        'have.text',
        'Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.'
      );
    cy.wait(5000);
    cy.get('input[placeholder="DD/MM/YYYY"]')
      .clear()
      .type(CypressData.birthDate);

    cy.get('#country').select(CypressData.country);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    cy.get('#btn-user').click();
    cy.wait(2000);
    cy.get('#btn-logout').click();  
    cy.get('#confirm-dialog').click()/* within(() => {
      cy.contains('button', 'Confirmer').click();
    }); */
  });

  it('Should login user', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/');
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]')
      .clear()
      .type(CypressData.mailErrorConn);
    cy.get('input[placeholder="************"]')
      .clear()
      .type(CypressData.password);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Email ou mot de passe invalide');
    cy.wait(5000);
    cy.get('input[placeholder="Email"]').clear().type(CypressData.mail);
    cy.get('input[placeholder="************"]')
      .clear()
      .type(CypressData.password);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('#btn-user').click();
    cy.wait(2000);
    cy.get('#btn-logout').click();
  });

  it('Should send mail for new password', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/');
    cy.get('#btn-user').click();
    cy.contains('Mot de passe oublié ?').click();
    cy.get('input[placeholder="E-mail"]').clear().type(CypressData.mailError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', "Cette adresse e-mail n'est pas enregistrée.");
    cy.wait(3500);
    cy.get('input[placeholder="E-mail"]').clear().type(CypressData.mail);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and(
        'have.text',
        'Un email de réinitialisation de mot de passe a été envoyé'
      );
  });
});
