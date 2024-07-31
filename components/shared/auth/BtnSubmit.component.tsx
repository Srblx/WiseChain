// Lib React
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonSubmit: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      type="submit"
      className={`btn w-full bg-button hover:!bg-green-500 text-white font-semibold text-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
