'use client';

// Libs React
import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helpers
import axios from 'axios';
import * as Yup from 'yup';

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
import { ButtonIcon } from '@/components/shared/ButtonIcon.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Utils
import { usePasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Validators
import { LoginSchema } from '@/validators/auth.validator';

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

  const handleSubmitSignin = async (e: FormEvent<HTMLFormElement> | null, isAutoSubmit = false) => {
    if (e && !isAutoSubmit) {
      e.preventDefault();
    }

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

      const { token, user } = response.data;
      login(user, token);
      onSuccess();
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        if (error.response) {
          const { status } = error.response;

          if (status === 401) {
            toast.error(ERROR_MESSAGES.INVALID_EMAIL_PASSWORD);
          } else {
            toast.error(ERROR_MESSAGES.ERROR_UNKNOWN);
          }
        } else {
          toast.error(ERROR_MESSAGES.ERROR_CONNECTION);
        }
      }
    }
  };

  const autoFillAndSubmit = () => {
    setMail('example@test.fr');
    setPassword('Motdepasse123@');
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmitSignin(e)} className="space-y-6 w-[90%]">
        <p className="text-tertiary text-xl cursor-pointer" onClick={autoFillAndSubmit}>
          Connexion
        </p>
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
          <ButtonIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </ButtonIcon>
        </label>
        <Button>Se connecter</Button>
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