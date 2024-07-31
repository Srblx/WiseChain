// Lib React
import React from 'react';

// Interfaces
import { InputProfileProps } from '@/interfaces/auth/input.interface';

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
    <div className="relative w-[25dvh]">
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
