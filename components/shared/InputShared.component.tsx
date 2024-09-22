// Lib React
import React from 'react';

// Interfaces
import { InputProfileProps } from '@/interfaces/auth/input.interface';

const InputShared: React.FC<InputProfileProps> = ({
  type,
  placeholder,
  value,
  className,
  onChange,
  name,
  onClick,
  disabled,
  children,
  max,
}) => {
  const inputValue = typeof value === 'boolean' ? value.toString() : value;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        className={`input w-full input-bordered rounded-lg mb-2 ${className}`}
        disabled={disabled}
        max={max}
      />
      {children}
    </div>
  );
};

export default InputShared;
