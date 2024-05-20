// Lib React
import React from 'react';

// Interfaces
import { InputProps } from '@/interfaces/inputAuth.interface';

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  // required = false,
}) => {
  return (
    <input
      type={type}
      className="w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      // required={required}
    />
  );
};

export default Input;
