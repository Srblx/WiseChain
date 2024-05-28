// Lib React
import React from 'react';

// Interfaces
import { InputProps } from '@/interfaces/auth/inputAuth.interface';

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      className="w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
