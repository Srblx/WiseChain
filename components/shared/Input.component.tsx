// Lib React
import { InputProfileProps } from '@/interfaces/auth/input.interface';
import React from 'react';

const InputProfile: React.FC<InputProfileProps> = ({
  type,
  placeholder,
  value,
  className,
  onChange,
  name,
  onClick,
  disabled,
  children,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default InputProfile;
