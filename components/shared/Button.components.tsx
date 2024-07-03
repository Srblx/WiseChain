'use client';

// Lib React
import { FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  id?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  className = 'bg-button border-2 rounded py-1 px-2',
  onClick,
  id,
}) => {
  return (
    <button type="button" className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
