
describe('Navigation', () => {
  before(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  const pages = [
    { path: '/', wait: 3500 },
    { path: '/courses/Investissement', wait: 3500 },
    { path: '/courses/Crypto-monnaie', wait: 3500 },
    { path: '/courses/Blockchain', wait: 3500 },
    { path: '/courses/NFT', wait: 3500 },
    { path: '/glossary', wait: 3500 },
    { path: '/market', wait: 3500 },
  ];

  const footerLinks = [
    { text: 'FAQ', path: '/faq' },
    { text: 'À Propos', path: '/about' },
    { text: "Condition d'utilisation", path: '/terms' },
    { text: 'Politique de confidentialité', path: '/privacy' },
  ];

  const visitAndCheck = (path: string, wait: number) => {
    cy.visit(path);
    if (path !== '/') {
      cy.url().should('include', path);
    }
    cy.wait(wait);
  };

  it('Should navigate through main pages', () => {
    pages.forEach(page => visitAndCheck(page.path, page.wait));
  });

  it('Should navigate through footer links', () => {
    cy.visit('/');
    cy.get('#logo').click();
    
    footerLinks.forEach(link => {
      cy.get('footer').contains(link.text).click();
      cy.url().should('include', link.path);
    });
    cy.visit('/');
  });
});
