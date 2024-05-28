
import { useState } from 'react';

const usePasswordVisibility = () => {
    "use client";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, togglePasswordVisibility };
};

export default usePasswordVisibility;

export const useConfirmPasswordVisibility = () => {
    "use client";
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return { showConfirmPassword, toggleConfirmPasswordVisibility };
}
