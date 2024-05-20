export interface LoginValidator {
    email: string;
    password: string;
  }
  
  export interface SignupValidator {
    firstname: string;
    lastname: string;
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    country: string;
    isTermsAccepted: boolean;
    errorMessage: string;
  }
  