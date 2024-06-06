'use client';

// Lib React
import { ChangeEvent, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Enums
import Routes from '@/enums/routes.enum';

// Utils
import ApiAxios from '@/_utils/interceptorAxios.utils';
import usePasswordVisibility, {
  useConfirmPasswordVisibility,
  useNewPasswordVisibility,
} from '@/_utils/usePasswordVisibility.utils';

// Validators
import { passwordResetSchema } from '@/validators/auth.validator';

// Components
import InputProfile from './Input.component';

// Helpers
import axios from 'axios';
import * as Yup from 'yup';

const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';
const classNameFaEyes =
  'absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-lg bg-white p-1 rounded-lg';

export const CompteUser = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();
  const { showConfirmPassword, toggleConfirmPasswordVisibility } =
    useConfirmPasswordVisibility();
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setEmail(user.mail);
      setOldPassword(user.password);
    }
  }, [user]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditInfoUser(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await passwordResetSchema.validate(
        { newPassword, confirmNewPassword: confirmPassword },
        { abortEarly: false }
      );

      const response = await ApiAxios.post(Routes.UPDATE_PASSWORD, {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        toast.success('Mot de passe modifié avec succès');
        setEditInfoUser(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else if (response.status === 400) {
        toast.error('Ancien mot de passe incorrect');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.map((err) => err.message);
        if (errorMessages.includes('Les mots de passe ne correspondent pas')) {
          toast.error('Les mots de passe ne correspondent pas');
        } else {
          errorMessages.forEach((message) => {
            toast.error(message);
          });
        }
      } else if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.error('Ancien mot de passe incorrect');
        }
      } else {
        console.error(
          'Erreur lors de la modification du mot de passe :',
          error
        );
        toast.error('Erreur lors de la modification du mot de passe');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4 mt-6">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col space-y-6">
          <label className={`${classNameLabel}`}>
            Email
            <InputProfile
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              className={`${classNameInputProfile}`}
              disabled={true}
            />
          </label>
          <label className={`${classNameLabel}`}>
            Ancien mot de passe
            <InputProfile
              type={showPassword ? 'text' : 'password'}
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              className={`${classNameInputProfile}`}
              disabled={!editInfoUser}
            >
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`${classNameFaEyes}`}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </InputProfile>
          </label>
          {editInfoUser && (
            <>
              <label className={`${classNameLabel}`}>
                Nouveau mot de passe
                <InputProfile
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={`${classNameInputProfile}`}
                >
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className={`${classNameFaEyes}`}
                  >
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </InputProfile>
              </label>
              <label className={`${classNameLabel}`}>
                Confirmation du mot de passe
                <InputProfile
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmation du mot de passe"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`${classNameInputProfile}`}
                >
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className={`${classNameFaEyes}`}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </InputProfile>
              </label>
            </>
          )}
        </div>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={
              editInfoUser ? handleCancelEdit : () => setEditInfoUser(true)
            }
            className={`${editInfoUser ? 'bg-red-500' : 'bg-button'} border-2 rounded py-1 px-2`}
          >
            {editInfoUser ? 'Annuler' : 'Modifier mon mot de passe'}
          </button>
          {editInfoUser && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-button border-2 rounded py-1 px-2"
            >
              {isSubmitting
                ? 'Enregistrement...'
                : 'Enregistrer le nouveau mot de passe'}
            </button>
          )}
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="flex items-center hover:cursor-pointer"
        onClick={() => console.log('Delete')}
      >
        <FaTrashAlt className="inline-block mr-2 text-red-600" />
        <p className="text-red-600 underline inline-block">
          Supprime mon compte
        </p>
      </div>
    </div>
  );
};
