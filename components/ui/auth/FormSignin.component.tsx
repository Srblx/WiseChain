// Libs React
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Button from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';

// Icons
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { inputClassName } from './FormSignup.component';

// Hooks
import { FormSigninProps } from '@/interfaces/modal.interface';

// Validators
import usePasswordVisibility from '@/_utils/usePasswordVisibility.utils';
import Routes from '@/enums/routes.enum';
import useAuth from '@/hooks/useAuth.hooks';
import { LoginSchema } from '@/validators/auth.validator';
import * as Yup from 'yup';

export default function FormSignin({ onSuccess }: FormSigninProps) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await LoginSchema.validate({ mail, password }, { abortEarly: false });
      const response = await axios.post(
        Routes.SIGNIN,
        { mail, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token } = response.data;
      login(token);

      toast.success('Connexion réussie');
      onSuccess();
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error(error);
        if (error.response) {
          const { status } = error.response;

          if (status === 401) {
            toast.error('E-mail ou mot de passe incorrect.');
          } else {
            toast.error(
              'Une erreur est survenue. Veuillez réessayer plus tard.'
            );
          }
        } else {
          toast.error(
            'Une erreur est survenue. Veuillez vérifier votre connexion internet.'
          );
        }
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
