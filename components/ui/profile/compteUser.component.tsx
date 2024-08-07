'use client';

// Components
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import Label from '@/components/shared/Label.component';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Interfaces
import { UserInfo } from '@/interfaces/auth/auth.interface';

// Validators
import {
  useConfirmPasswordVisibility,
  useNewPasswordVisibility,
  usePasswordVisibility,
} from '@/utils/auth/usePasswordVisibility.utils';
import { passwordResetSchema } from '@/validators/auth.validator';

// Helpers
import dayjs from '@/utils/dayjs';
import axios from 'axios';
import * as Yup from 'yup';

// Utils
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// React Libs
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Icons
import InputShared from '@/components/shared/Input.component';
import { FaTrashAlt } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineEdit } from 'react-icons/md';

// CSS classes
const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-md';
const classNameFaEyes =
  'absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-lg bg-white p-1 rounded-lg';

type UserInfoKeys =
  | 'firstname'
  | 'lastname'
  | 'pseudo'
  | 'country'
  | 'birthOfDate';

export const UserProfile = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    pseudo: '',
    country: '',
    birthOfDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('***********');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  // Hooks
  const { user, login, token, logout } = useAuth();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();
  const { showConfirmPassword, toggleConfirmPasswordVisibility } =
    useConfirmPasswordVisibility();

  useEffect(() => {
    if (user) {
      setUserInfo({
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        country: user.country,
        birthOfDate: dayjs(user.date_of_birth).format('DD/MM/YYYY'),
      });
      setEmail(user.mail);
      setRole(user.roles);
      setIsVerified(user.is_verified);
      setCreatedAt(user.created_at);
    }
  }, [user]);

  const handleEditInfoUser = () => setEditInfoUser(!editInfoUser);

  const handleInputChange =
    (
      field:
        | UserInfoKeys
        | 'email'
        | 'oldPassword'
        | 'newPassword'
        | 'confirmPassword'
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (field in userInfo) {
        setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
      } else {
        switch (field) {
          case 'email':
            setEmail(e.target.value);
            break;
          case 'oldPassword':
            setOldPassword(e.target.value);
            break;
          case 'newPassword':
            setNewPassword(e.target.value);
            break;
          case 'confirmPassword':
            setConfirmPassword(e.target.value);
            break;
        }
      }
    };

  const handleCancelEdit = () => {
    setEditInfoUser(false);
    if (user) {
      setUserInfo({
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        country: user.country,
        birthOfDate: dayjs(user.date_of_birth).format('DD/MM/YYYY'),
      });
    }
    setOldPassword('***********');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmitProfile = async () => {
    setIsSubmitting(true);
    try {
      const response = await ApiAxios.put(Routes.UPDATE_PROFIL_USER, {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        pseudo: userInfo.pseudo,
      });
      if (response.status === 200) {
        toast.success(SUCCESS_MESSAGES.UPDATE_PROFILE);
        setEditInfoUser(false);
        setIsDialogOpen(false);
        if (user) {
          const updatedUser = {
            ...user,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            pseudo: userInfo.pseudo,
          };
          login(updatedUser, token!);
        }
      } else {
        toast.error(ERROR_MESSAGES.UPDATE_PROFILE);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.UPDATE_PROFILE);
    }
    setIsSubmitting(false);
  };

  const handleSubmitPassword = async () => {
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
        setOldPassword('***********');
        setNewPassword('');
        setConfirmPassword('');
        setIsPasswordDialogOpen(false);
      } else if (response.status === 400) {
        toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => toast.error(err.message));
      } else if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
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
    } catch {
      toast.error('Erreur lors de la suppression du compte');
    }
  };

  const cancelDeleteAccount = () => setShowDeleteConfirm(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-8 mt-6 items-center justify-center">
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <p className={classNameLabel}>Nom: {userInfo.lastname}</p>
            <p className={classNameLabel}>Prenom: {userInfo.firstname}</p>
            <p className={classNameLabel}>Pseudo: {userInfo.pseudo}</p>
            {/* <p className={classNameLabel}>Roles: {role}</p> */}
            <p className={classNameLabel}>
              Anniversaire le {userInfo.birthOfDate}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-auto">
              <DialogHeader>
                <DialogTitle>Modifier le profil</DialogTitle>
                <DialogDescription>
                  Faites des modifications à votre profil ici. Cliquez sur
                  enregistrer lorsque vous avez terminé.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {[
                  'firstname',
                  'lastname',
                  'pseudo',
                  'birthOfDate',
                  'country',
                ].map((field) => (
                  <div
                    key={field}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor={field} className="text-right">
                      {field === 'firstname'
                        ? 'Prénom'
                        : field === 'lastname'
                          ? 'Nom'
                          : field === 'pseudo'
                            ? 'Pseudo'
                            : field === 'birthOfDate'
                              ? 'Date de naissance'
                              : 'Pays'}
                    </Label>
                    <InputShared
                      id={field}
                      value={userInfo[field as UserInfoKeys]}
                      onChange={handleInputChange(field as UserInfoKeys)}
                      className={`col-span-3 p-2 ${field === 'birthOfDate' || field === 'country' ? 'bg-gray-950 text-white' : 'bg-white text-gray-950'}`}
                      placeholder={field}
                      disabled={field === 'birthOfDate' || field === 'country'}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={handleSubmitProfile} disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Enregistrement...'
                    : 'Enregistrer les modifications'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="flex flex-col lg:items-start space-y-2 items-center lg:mt-0 mt-6">
            <p className={classNameLabel}>
              Inscrit depuis le {dayjs(createdAt).format('DD MMMM YYYY')}
            </p>
            <p className={classNameLabel}>Role : {role}</p>
            <p className={classNameLabel}>
              Compte vérifié : {isVerified ? 'Oui' : 'Non'}
            </p>
            <p className={classNameLabel}>Email : {email}</p>
          </div>

          <Dialog
            open={isPasswordDialogOpen}
            onOpenChange={setIsPasswordDialogOpen}
          >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-auto">
              <DialogHeader>
                <DialogTitle>Modifier le mot de passe</DialogTitle>
                <DialogDescription>
                  Entrez votre ancien mot de passe, puis votre nouveau mot de
                  passe et confirmez-le.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="relative">
                  <Label htmlFor="old-password">Ancien mot de passe</Label>
                  <InputShared
                    id="old-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ancien" //mot de passe"
                    value={oldPassword}
                    onChange={handleInputChange('oldPassword')}
                    className={classNameInputProfile}
                  >
                    <Button
                      onClick={togglePasswordVisibility}
                      className={classNameFaEyes}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Button>
                  </InputShared>
                </div>
                <div className="relative">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <InputShared
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Nouveau"// mot de passe"
                    value={newPassword}
                    onChange={handleInputChange('newPassword')}
                    className={classNameInputProfile}
                  >
                    <Button
                      onClick={toggleNewPasswordVisibility}
                      className={classNameFaEyes}
                    >
                      {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Button>
                  </InputShared>
                </div>
                <div className="relative">
                  <Label htmlFor="confirm-password">
                    Confirmation du mot de passe
                  </Label>
                  <InputShared
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmation"// mot de passe"
                    value={confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    className={classNameInputProfile}
                  >
                    <Button
                      onClick={toggleConfirmPasswordVisibility}
                      className={classNameFaEyes}
                    >
                      {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Button>
                  </InputShared>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmitPassword}
                  disabled={isSubmitting}
                  className="bg-button rounded-md p-2"
                >
                  {isSubmitting
                    ? 'Enregistrement...'
                    : 'Enregistrer le mot de passe'}
                </Button>
                <Button
                  onClick={() => setIsPasswordDialogOpen(false)}
                  className="bg-red-600 rounded-md p-2 mb-3 sm:mb-0"
                >
                  Annuler
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4 items-center md:items-start mt-10 md:mt-20">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="text-gray-400 underline flex items-center"
          id="btn-edit-profile"
        >
          <MdOutlineEdit className="mr-2" size={'1.2rem'} />
          <p className="underline">Modifier mon profil</p>
        </Button>
        <Button
          onClick={() => setIsPasswordDialogOpen(true)}
          className="text-gray-400 underline flex items-center"
          id='update-password'
        >
          <MdOutlineEdit className="mr-2" size={'1.2rem'} />
          <p className="underline">Modifier mon mot de passe</p>
        </Button>
        <Button
          onClick={() =>
            (
              document.getElementById('delete-account') as HTMLDialogElement
            )?.showModal()
          }
          id="delete-account-button"
          className="text-red-600 flex items-center"
        >
          <FaTrashAlt className="mr-3" size={'1rem'} />
          <p className="underline">Supprimer mon compte</p>
        </Button>
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
        message="Êtes-vous sûr de vouloir supprimer votre compte ?"
        infoMessage="Toute votre progression sera perdue."
        onConfirm={handleDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </>
  );
};

export default UserProfile;
