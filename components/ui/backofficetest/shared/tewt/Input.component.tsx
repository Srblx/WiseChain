import { ChangeEvent, FC } from 'react';

interface InputSharedProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputShared: FC<InputSharedProps> = ({ name, type = 'text', placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input input-bordered ${className}`}
    />
  );
};

export default InputShared;
