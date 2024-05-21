// Libs React
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Button from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { inputClassName } from './FormSignup.component';

// Hooks
import { useLocalStorage } from '@/hooks/useLocalStorage.hooks';
import { FormSigninProps } from '@/interfaces/modal.interface';

export default function FormSignin({ onSuccess }: FormSigninProps) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [pseudo, setPseudo] = useLocalStorage<string | null>('pseudo', null);

  const handleMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', { mail, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, pseudo } = response.data;
  
      setToken(token);
      setPseudo(pseudo);
  
      console.log('Token:', token, pseudo);
      toast.success('Connexion réussie');
      onSuccess();
    } catch (error: any) {
      console.error(error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 401) {
          toast.error("E-mail ou mot de passe incorrect.");
        } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez vérifier votre connexion internet.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitSignin} className="space-y-6 w-[90%]">
        <p className="text-tertiary text-xl">Connexion</p>
        <label className={inputClassName}>
          <IoMdMail />
          <Input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={handleMailChange}
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
        <Button>Se connecter</Button>
       {/*  {errorMessage && (
          <p className="text-xs text-center w-full mt-1 text-red-500">
            {errorMessage}
          </p>
        )} */}
      </form>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}