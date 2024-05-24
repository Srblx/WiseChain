export interface LoginValidator {
    email: string;
    password: string;
  }

  export interface SignupValidator {
    firstname: string;
    lastname: string;
    pseudo: string;
    mail: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    country: string;
    is_revoice: boolean;
    errorMessage: string;
    isTermsAccepted: boolean;
  }
  
  export interface ValidateRegistration {
    mail: string 
    subject: string;
    name: string;
    message: string;
  }