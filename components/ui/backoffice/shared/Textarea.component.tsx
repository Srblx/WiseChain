import { ChangeEvent, FC } from 'react';

interface TextareaProps {
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;   
  rows: number;
}

const Textarea: FC<TextareaProps> = ({ name, placeholder, value, onChange, className, disabled, rows }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`textarea textarea-bordered w-full ${className}`}
      rows={rows}
    />
  );
};

export default Textarea;
