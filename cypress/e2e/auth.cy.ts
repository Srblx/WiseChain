import {
  birthDate,
  birthDateErrorLess10Years,
  birthDateErrorMore100Years,
  confirmPassword,
  confirmPasswordError,
  country,
  firstName,
  firstNameError,
  lastName,
  lastNameError,
  mail,
  mailError,
  password,
  passwordError,
  passwordLenghtError,
  pseudo,
  pseudoError,
} from '../data/data';

describe('Auth', () => {
  it('Should register user', () => {
    cy.visit('/');
    cy.get('#btn-user').click();
    cy.contains('Pas de compte ? Créez en un !').click();

    cy.get('.checkbox').check();

    cy.get('input[placeholder="Nom"]').clear().type(firstNameError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le nom doit contenir entre 3 et 50 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Nom"]').clear().type(firstName);

    cy.get('input[placeholder="Prénom"]').clear().type(lastNameError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le prénom doit contenir entre 3 et 80 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Prénom"]').clear().type(lastName);

    cy.get('input[placeholder="Pseudo"]').clear().type(pseudoError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le pseudo doit contenir au moins 3 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Pseudo"]').clear().type(pseudo);

    cy.get('input[placeholder="Email"]').clear().type(mailError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', "L'email n'est pas valide");
    cy.wait(5000);
    cy.get('input[placeholder="Email"]').clear().type(mail);

    cy.get('input[placeholder="Mot de passe"]')
      .clear()
      .type(passwordLenghtError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', 'Le mot de passe doit avoir au moins 12 caractères');
    cy.wait(5000);
    cy.get('input[placeholder="Mot de passe"]').clear().type(passwordError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and(
        'have.text',
        'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
      );
    cy.wait(5000);
    cy.get('input[placeholder="Mot de passe"]').clear().type(password);

    cy.get('input[placeholder="Confirmation mot de passe"]')
      .clear()
      .type(confirmPasswordError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error').should('be.visible');
    //   .and('have.text', 'Les mots de passe ne correspondent pas');
    cy.wait(5000);
    cy.get('input[placeholder="Confirmation mot de passe"]')
      .clear()
      .type(confirmPassword);

    cy.get('input[placeholder="DD/MM/YYYY"]')
      .clear()
      .type(birthDateErrorMore100Years);
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
      .type(birthDateErrorLess10Years);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and(
        'have.text',
        'Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.'
      );
    cy.wait(5000);
    cy.get('input[placeholder="DD/MM/YYYY"]').clear().type(birthDate);

    cy.get('#country').select(country);
    cy.get('button[type="submit"]').click();

    cy.get('#logout').click();
    cy.get('#btn-confirm-logout').click();
  });

  it('Should login user', () => {
    cy.visit('/');
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]').clear().type(mail);
    cy.get('input[placeholder="************"]').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('#logout').click();
    cy.wait(2000);
    cy.get('#btn-confirm-logout').click();
  });

  it('Should send mail for new password', () => {
    cy.visit('/');
    cy.get('#btn-user').click();
    cy.contains('Mot de passe oublié ?').click();
    cy.get('input[placeholder="E-mail"]').clear().type(mailError);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('have.text', "Cette adresse e-mail n'est pas enregistrée.");
    cy.wait(3500);
    cy.get('input[placeholder="E-mail"]').clear().type(mail);
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('have.text', 'E-mail envoyé avec succès');
  });
});
