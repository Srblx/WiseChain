// Lib React
import React from 'react';

// Interfaces
import { InputAuthProps } from '@/interfaces/auth/input.interface';

const Input: React.FC<InputAuthProps> = ({
  type,
  placeholder,
  value,
  className,
  onChange,
  name
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
