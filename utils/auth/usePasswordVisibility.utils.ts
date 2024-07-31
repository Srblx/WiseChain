// Lib React
import { useState } from 'react';

export const usePasswordVisibility = () => {
  'use client';
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, togglePasswordVisibility };
};



export const useConfirmPasswordVisibility = () => {
  'use client';
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return { showConfirmPassword, toggleConfirmPasswordVisibility };
};

export const useNewPasswordVisibility = () => {
  'use client';
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return { showNewPassword, toggleNewPasswordVisibility };
};
