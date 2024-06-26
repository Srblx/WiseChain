'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

// Components
import ButtonSubmit from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { inputClassName } from './FormSignup.component';

// Icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Utils
import usePasswordVisibility from '@/_utils/usePasswordVisibility.utils';
import Routes from '@/enums/routes.enum';
import { passwordResetSchema } from '@/validators/auth.validator';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

const FormResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmitNewPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (token) {
      try {
        await passwordResetSchema.validate({ newPassword, confirmNewPassword }, { abortEarly: false });
        
        const response = await axios.post(Routes.RESET_PASSWORD, {
          newPassword,
          token
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          toast.error(response.data.error);
          console.error(response.data.error);
        }
      } catch (error: string | any) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            toast.error(err.message);
          });
        } else if (axios.isAxiosError(error)) {
          console.error('Erreur lors de la réinitialisation du mot de passe :', error.message);
        } else {
          console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        }
      }
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmitNewPassword} className="space-y-4">
        <label className={inputClassName}>
          <Input
            placeholder="Nouveau mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <label className={inputClassName}>
          <Input
            placeholder="Nouveau mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <ButtonSubmit>Réinitialiser le mot de passe</ButtonSubmit>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default FormResetPassword;