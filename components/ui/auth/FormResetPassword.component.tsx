"use client"; 

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

// Components
import ButtonSubmit from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { inputClassName } from './FormSignup.component';

// Icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Utils
import usePasswordVisibility from '@/_utils/usePasswordVisibility.utils';

const FormResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const searchParams = useSearchParams(); 
  const token = searchParams.get('token'); 

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmitNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token) {
      try {
        const response = await fetch('/api/resetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword, token }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          // Rediriger l'utilisateur ou effectuer d'autres actions après la réinitialisation réussie
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
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
    </div>
  );
};

export default FormResetPassword;
