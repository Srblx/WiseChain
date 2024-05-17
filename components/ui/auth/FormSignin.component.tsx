// FormSignin.tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaKey } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { inputClassName } from './FormSignup.component';

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
    <form onSubmit={handleSubmitSignin} className='space-y-6 w-[90%]'>
            <p className='text-tertiary text-xl'>Connexion</p>
            <label className={inputClassName}>
              <IoMdMail />
              <input
                type='text'
                className='w-full'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
                required
              />
            </label>
            <label className={inputClassName}>
              <FaKey />
              <input
                type='password'
                className='w-full'
                placeholder='************'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <button className='btn w-full bg-button hover:!bg-green-500 text-white font-semibold text-lg'>
              Connexion
            </button>
          </form>
  );
}
