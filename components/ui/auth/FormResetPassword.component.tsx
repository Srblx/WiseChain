'use client';

//Libs React
import { ChangeEvent, useState } from 'react';

// Components
import ButtonSubmit from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { inputClassName } from './FormSignup.component';

// Icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Utils
import usePasswordVisibility from "@/_utils/usePasswordVisibility.utils";

const FormResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

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
    await console.log('submit');
    // router.push('/');
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
