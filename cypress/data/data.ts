export class CypressData {
  constructor() {}

  static firstName = 'Cypress';
  static lastName = 'Test';
  static pseudo = 'CypressTest';
  static mail = 'cypress.test@gmail.com';
  static password = 'CypressTest1234@';
  static confirmPassword = 'CypressTest1234@';
  static birthDate = '1990-01-01';
  static country = 'France';
  static firstNameError = 'Cy';
  static lastNameError = 'Cy';
  static pseudoError = 'Cy';
  static mailError = 'Cypress.test.com';
  static mailErrorConn = 'Cypress.test.error@gmail.com';
  static passwordError = 'cypresstest1234';
  static passwordLenghtError = 'cypress';
  static confirmPasswordError = 'CypressTest1234@';
  static birthDateErrorMore100Years = '1900-01-01';
  static birthDateErrorLess10Years = '2020-01-01';
  static countryError = 'France';
}
