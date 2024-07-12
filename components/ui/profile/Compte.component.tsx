'use client';

// Lib React
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Icons
import { FaTrashAlt } from 'react-icons/fa';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Enums
import Routes from '@/enums/routes.enum';

// Utils
import usePasswordVisibility, {
  useConfirmPasswordVisibility,
  useNewPasswordVisibility,
} from '@/utils/auth/usePasswordVisibility.utils';
import dayjs from '@/utils/dayjs';
import ApiAxios from '@/utils/interceptorAxios.utils';

// Validators
import { passwordResetSchema } from '@/validators/auth.validator';

// Components
import InputProfile from '@/components/shared/Input.component';

// Helpers
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import * as Yup from 'yup';

const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';
const classNameFaEyes =
  'absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-lg bg-white p-1 rounded-lg';

export const CompteUser = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('***********');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();
  const { showConfirmPassword, toggleConfirmPasswordVisibility } =
    useConfirmPasswordVisibility();
  const { user, logout } = useAuth();
  const [showConfirm, toggleConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setEmail(user.mail);
      setRole(user.roles);
      setIsVerified(user.is_verified);
      setCreatedAt(user.created_at);
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
    setOldPassword(oldPassword);
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
        toast.success(SUCCESS_MESSAGES.UPDATE_PASSWORD);
        setEditInfoUser(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else if (response.status === 400) {
        toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.map((err) => err.message);
        if (
          errorMessages.includes(
            ERROR_MESSAGES.NEW_PASSWORD_CONFIRM_PASSWORD_NOT_MATCH
          )
        ) {
          toast.error(ERROR_MESSAGES.NEW_PASSWORD_CONFIRM_PASSWORD_NOT_MATCH);
        } else {
          errorMessages.forEach((message) => {
            toast.error(message);
          });
        }
      } else if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
        }
      } else {
        toast.error(ERROR_MESSAGES.UPDATE_PASSWORD);
      }
    }

    setIsSubmitting(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await ApiAxios.delete(Routes.DELETE_ACCOUNT);

      if (response.status === 200) {
        toast.success('Compte supprimé avec succès');
        logout();
        cancelDeleteAccount();
        window.location.href = '/';
      } else {
        toast.error('Échec de la suppression du compte');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression du compte');
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-4 mt-6 xs:flex xs:flex-col">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col lg:items-start space-y-6 items-center">
          <label className={'text-md text-gray-300'}>
            Inscrit depuis le {dayjs(user?.created_at).format('DD MMMM YYYY')}
          </label>
          <label className={'text-md text-gray-300 capitalize'}>
            Role : {role}
          </label>
          <label className={'text-md text-gray-300'}>
            Compte vérifié : {isVerified ? 'Oui' : 'Non'}
          </label>
          <label className={`${classNameLabel}`}>
            Email
            <InputProfile
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full bg-gray-500 text-white py-1 px-2 rounded-lg "
              disabled={true}
            />
          </label>
          {editInfoUser && (
            <>
              <label className={`${classNameLabel}`}>
                Ancien mot de passe
                <InputProfile
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  className={`${classNameInputProfile}`}
                >
                  <Button
                    onClick={togglePasswordVisibility}
                    className={`${classNameFaEyes}`}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </InputProfile>
              </label>
              <label className={`${classNameLabel}`}>
                Nouveau mot de passe
                <InputProfile
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={`${classNameInputProfile}`}
                >
                  <Button
                    onClick={toggleNewPasswordVisibility}
                    className={`${classNameFaEyes}`}
                  >
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />} 
                  </Button>
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
                  <Button
                    onClick={toggleConfirmPasswordVisibility}
                    className={`${classNameFaEyes}`}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />} 
                  </Button>
                </InputProfile>
              </label>
            </>
          )}
        </div>
        <div className="flex lg:justify-start items-center space-x-4 justify-center">
          <Button
            onClick={
              editInfoUser ? handleCancelEdit : () => setEditInfoUser(true)
            }
            className={`${
              editInfoUser ? 'bg-red-500' : 'bg-button'
            }  rounded-lg py-2 px-3`}
          >
            {editInfoUser ? 'Annuler' : 'Modifier mon mot de passe'}
          </Button>
          {editInfoUser && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-button rounded-lg py-2 px-3 text-md"
              id='register-new-password'
            >
              {isSubmitting
                ? 'Enregistrement...'
                : 'Enregistrer le mot de passe'}
            </button>
          )}
        </div>
      </form>
      <div
        className="flex lg:justify-start items-center hover:cursor-pointer mt-60 justify-center"
        onClick={() =>
          (
            document.getElementById('delete-account') as HTMLDialogElement
          )?.showModal()
        }
      >
        <FaTrashAlt className="inline-block mr-2 text-red-600" />
        <p className="text-red-600 underline inline-block ">
          Supprimer mon compte
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={'z-50'}
      />
      <ConfirmDialog
        id="delete-account"
        title="Confirmation de suppression de compte"
        message={'Êtes-vous sûr de vouloir supprimer votre compte ?'}
        infoMessage={'Toute votre progression sera perdue.'}
        onConfirm={handleDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </div>
  );
};
