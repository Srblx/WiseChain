export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
