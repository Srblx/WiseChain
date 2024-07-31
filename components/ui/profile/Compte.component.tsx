'use client';

// Components
import { Button } from '@/components/shared/Button.components';
import Input from '@/components/shared/Input.component';
import Label from '@/components/shared/Label.component';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Icons
import { FaTrashAlt } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Hooks
import useAuth from '@/hooks/useAuth.hook';
import { useConfirmPasswordVisibility, useNewPasswordVisibility, usePasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';

// Enums
import Routes from '@/enums/routes.enum';

// Utils
import dayjs from '@/utils/dayjs';
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Lib React
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Validators
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import { passwordResetSchema } from '@/validators/auth.validator';

//Helpers
import * as Yup from 'yup';

// CSS classes
const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';
const classNameFaEyes = 'absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-lg bg-white p-1 rounded-lg';

const CompteUser = () => {
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
  const { showNewPassword, toggleNewPasswordVisibility } = useNewPasswordVisibility();
  const { showConfirmPassword, toggleConfirmPasswordVisibility } = useConfirmPasswordVisibility();
  const { user, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.mail);
      setRole(user.roles);
      setIsVerified(user.is_verified);
      setCreatedAt(user.created_at);
    }
  }, [user]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditInfoUser(false);
    setOldPassword('***********');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await passwordResetSchema.validate({ newPassword, confirmNewPassword: confirmPassword }, { abortEarly: false });

      const response = await ApiAxios.post(Routes.UPDATE_PASSWORD, { oldPassword, newPassword, confirmPassword });

      if (response.status === 200) {
        toast.success(SUCCESS_MESSAGES.UPDATE_PASSWORD);
        setEditInfoUser(false);
        setOldPassword('***********');
        setNewPassword('');
        setConfirmPassword('');
        setIsDialogOpen(false);
      } else if (response.status === 400) {
        toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => toast.error(err.message));
      } else if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error(ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT);
      } else {
        toast.error(ERROR_MESSAGES.UPDATE_PASSWORD);
      }
    } finally {
      setIsSubmitting(false);
    }
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

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-4 mt-6 xs:flex xs:flex-col">
      <div className="space-y-8">
        <div className="flex flex-col lg:items-start space-y-6 items-center">
          <label className="text-md text-gray-300">
            Inscrit depuis le {dayjs(user?.created_at).format('DD MMMM YYYY')}
          </label>
          <label className="text-md text-gray-300 capitalize">
            Role : {role}
          </label>
          <label className="text-md text-gray-300">
            Compte vérifié : {isVerified ? 'Oui' : 'Non'}
          </label>
          <label className={classNameLabel}>
            Email
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="w-full bg-gray-500 text-white py-1 px-2 rounded-lg"
              disabled
            />
          </label>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              Modifier mon mot de passe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier le mot de passe</DialogTitle>
              <DialogDescription>
                Entrez votre ancien mot de passe, puis votre nouveau mot de passe et confirmez-le.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="relative">
                <Label htmlFor="old-password">Ancien mot de passe</Label>
                <Input
                  id="old-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={handleInputChange(setOldPassword)}
                  className={classNameInputProfile}
                />
                <Button onClick={togglePasswordVisibility} className={classNameFaEyes}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
              <div className="relative">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={handleInputChange(setNewPassword)}
                  className={classNameInputProfile}
                />
                <Button onClick={toggleNewPasswordVisibility} className={classNameFaEyes}>
                  {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
              <div className="relative">
                <Label htmlFor="confirm-password">Confirmation du mot de passe</Label>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmation mot de passe"
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword)}
                  className={classNameInputProfile}
                />
                <Button onClick={toggleConfirmPasswordVisibility} className={classNameFaEyes}>
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} /* variant="outline" */>
                Annuler
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div
          className="flex lg:justify-start items-center hover:cursor-pointer mt-60 justify-center"
          onClick={() => (document.getElementById('delete-account') as HTMLDialogElement)?.showModal()}
          id="delete-account-button"
        >
          <FaTrashAlt className="inline-block mr-2 text-red-600" />
          <p className="text-red-600 underline inline-block">Supprimer mon compte</p>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-50"
      />

      <ConfirmDialog
        id="delete-account"
        title="Confirmation de suppression de compte"
        message="Êtes-vous sûr de vouloir supprimer votre compte ?"
        infoMessage="Toute votre progression sera perdue."
        onConfirm={handleDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </div>
  );
};

export default CompteUser;
