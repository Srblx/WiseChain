// Components
import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';

// React libs
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleVisibility: () => void;
  disabled?: boolean;
}

const PasswordInput = ({
  value,
  onChange,
  showPassword,
  toggleVisibility,
  disabled,
}: PasswordInputProps) => (
  <div className="relative">
    <InputShared
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={value}
      onChange={onChange}
      placeholder="Mot de passe"
      className="input input-bordered w-full mb-2"
      disabled={disabled}
    />
    <Button
      onClick={toggleVisibility}
      className="absolute right-3 top-6 transform -translate-y-1/2 text-lg text-white"
    >
      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
    </Button>
  </div>
);

export default PasswordInput;
