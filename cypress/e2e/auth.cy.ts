const mail = 'cypress.test@gmail.com';
const password = 'CypressTest1234@';


describe('Auth', () => {
    it('Should login', () => {
        cy.visit('/login');
        cy.get('input[name=email]').type(`${mail}`);
        cy.get('input[name=password]').type(`${password}`);
        cy.get('button[type=submit]').click();
    });
});
