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
  mail: string;
  subject: string;
  name: string;
  message: string;
}

export interface LoginData {
  mail: string;
  password: string;
}

export interface User {
  id: string;
  lastname: string;
  firstname: string;
  pseudo: string;
  mail: string;
  password: string;
  roles: string;
  img: string;
  country: string;
  date_of_birth: string;
  is_verified: boolean;
  is_revoice: boolean;
  created_at: string;
}

export interface UserInfo {
  firstname: string;
  lastname: string;
  pseudo: string;
  country: string;
  dateOfBirth: string;
}

export interface UserFormData {
  firstname: string;
  lastname: string;
  pseudo: string;
  mail: string;
  password: string;
  country: string;
  dateOfBirth: string;
  isVerified: boolean;
  roles: string;
}
