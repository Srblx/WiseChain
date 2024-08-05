import { CypressData } from '../data/data';

describe('Questionnaire End-to-End Test', () => {
  before(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  const login = (email: string, password: string) => {
    cy.visit('/');
    cy.get('#btn-user').click();
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="************"]').clear().type(password);
    cy.get('button[type="submit"]').click();
  };

  const answerQuestion = () => {
    cy.get('body').then(($body) => {
      if ($body.find('#congratulations').length > 0) {
        return;
      }

      cy.get('#container-questions-answers button').first().click();
      cy.get('#validate-answer').click();
      cy.wait(1000);
      answerQuestion();
    });
  };

  it('should complete the questionnaire for the first Crypto-Monnaie course', () => {
    cy.viewport(550, 750);
    login(CypressData.mail, CypressData.password);
    cy.wait(2000);
    cy.visit('/courses/Crypto-Monnaie');
    cy.wait(5000);  
    cy.get('#37893dd1-3dd6-11ef-b3fd-0242ac140002').first().click();

    cy.url().should(
      'include',
      '/courses/detail-course/37893dd1-3dd6-11ef-b3fd-0242ac140002'
    );
    cy.wait(5000);
    cy.get('#questionnary-button').click();
    cy.url().should('include', '/questionnary?courseId=37893dd1-3dd6-11ef-b3fd-0242ac140002');
    
    answerQuestion();
    
    cy.contains('Votre score est de').should('be.visible').then(($scoreElement) => {
      const scoreText = $scoreElement.text();
      const score = parseInt(scoreText.match(/\d+/)[0]);

      cy.contains('Retourner aux cours').should('be.visible');
      
      if (score < 8) {
        cy.contains('Claim').should('be.visible').and('be.disabled');
      } else {
        cy.contains('Claim').should('be.visible').and('not.be.disabled');
      }
    });

    cy.contains('Retourner aux cours').should('be.visible');
    cy.contains('Claim').should('be.visible');

    cy.get('#back-to-courses-after-questionnary').click();

    cy.url().should('include', '/courses/crypto-monnaie');
  });
});
