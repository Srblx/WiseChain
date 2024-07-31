'use client';

// Lib React
import { FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void | Promise<void> | undefined;
  id?: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className = 'bg-button rounded-lg py-2 px-3',
  onClick,
  id,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`${className}`}
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
