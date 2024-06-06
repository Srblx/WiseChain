export interface InputAuthProps {
  type: string;
  placeholder: string;
  value: string;
  name?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface InputProfileProps {
  type: string;
  placeholder: string;
  value: string;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
