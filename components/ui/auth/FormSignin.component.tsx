// Libs React
import { ChangeEvent, FormEvent, useState } from 'react';

// Components
import { inputClassName } from './FormSignup.component';

// Icons
import Button from '@/components/shared/auth/btn-submit.component';
import Input from '@/components/shared/auth/input.component';
import { notifyLogin } from '@/validators/auth.validator';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

export default function FormSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmitSignin} className="space-y-6 w-[90%]">
      <p className="text-tertiary text-xl">Connexion</p>
      <label className={inputClassName}>
        <IoMdMail />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className={inputClassName}>
        <FaKey />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="************"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      <button type="button" onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
      </label>
      <Button onClick={() => notifyLogin({ email, password })}>
        Se connecter
      </Button>
    </form>
  );
}
