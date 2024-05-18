// Libs React
import { ChangeEvent, FormEvent, useState } from 'react';

// Components
import { inputClassName } from './FormSignup.component';

// Icons
import Button from '@/components/shared/auth/btn-submit.component';
import Input from '@/components/shared/auth/input.component';
import { FaKey } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

export default function FormSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email :', email);
    console.log('Mot de passe :', password);
  };

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm);
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
          type="password"
          placeholder="************"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <Button>Se connecter</Button>
    </form>
  );
}
