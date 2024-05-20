// Lib React
import React from 'react';

// Interfaces
import { ButtonProps } from '@/interfaces/buttonSubmit.interface';

const ButtonSubmit: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      className={`btn w-full bg-button hover:!bg-green-500 text-white font-semibold text-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
