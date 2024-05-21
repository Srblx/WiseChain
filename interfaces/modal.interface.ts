// Lib React
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  children: ReactNode;
}

export interface FormSigninProps {
  onSuccess: () => void;
}


export interface ModalContentProps {
  onSuccess: () => void;
}

export interface FormSignupProps {
  onSuccess: () => void;
}