// Interface
import { SignupValidator } from "@/interfaces/auth/auth.interface";

export type SignupAction =
  | { type: 'SET_FIRSTNAME'; payload: string }
  | { type: 'SET_LASTNAME'; payload: string }
  | { type: 'SET_PSEUDO'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_BIRTHDAY'; payload: string }
  | { type: 'SET_TERMS_ACCEPTED'; payload: boolean }
  | { type: 'SET_COUNTRY'; payload: string }
  | { type: 'SET_ERROR_MESSAGE'; payload: string };

export const initialState: SignupValidator = {
  firstname: '',
  lastname: '',
  pseudo: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
  country: '',
  isTermsAccepted: false,
  errorMessage: '', 
};

export const signupReducer = (state: SignupValidator, action: SignupAction): SignupValidator => {
  switch (action.type) {
    case 'SET_FIRSTNAME':
      return { ...state, firstname: action.payload };
    case 'SET_LASTNAME':
      return { ...state, lastname: action.payload };
    case 'SET_PSEUDO':
      return { ...state, pseudo: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_BIRTHDAY':
        return { ...state, dateOfBirth: action.payload }; 
    case 'SET_COUNTRY':
      return { ...state, country: action.payload };
    case 'SET_TERMS_ACCEPTED':
      return { ...state, isTermsAccepted: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
