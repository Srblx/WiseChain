'use client';

// Components
import InputShared from '@/components/shared/Input.component';
import VerifiedCheckbox from './inputForm/Checkbox.component';
import CountrySelect from './inputForm/CountrySelect.component';
import PasswordInput from './inputForm/PasswordInput.component';
import RoleSelect from './inputForm/RolesSelect.component';

// Hooks
import { useUserForm } from '@/hooks/useForm.hook';

// Interfaces
import { User, UserFormData } from '@/interfaces/auth/auth.interface';

// Utils
import { useNewPasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// React libs
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Validators
import { UserFormSchemaBackoffice } from '@/validators/form.validator';

// Helpers
import * as Yup from 'yup';

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: any) => void;
  userToEdit?: User | null;
}

const ModalUser: React.FC<ModalUserProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userToEdit,
}) => {
  const { formData, setFormData, handleInputChange, resetForm, errors } =
    useUserForm({
      firstname: '',
      lastname: '',
      pseudo: '',
      mail: '',
      password: '',
      country: '',
      dateOfBirth: '',
      isVerified: false,
      roles: '',
    });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();
  const maxDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        firstname: userToEdit.firstname || '',
        lastname: userToEdit.lastname || '',
        pseudo: userToEdit.pseudo || '',
        mail: userToEdit.mail || '',
        password: userToEdit.password || '',
        country: userToEdit.country || '',
        dateOfBirth: userToEdit.date_of_birth
          ? new Date(userToEdit.date_of_birth).toISOString().split('T')[0]
          : '',
        isVerified: userToEdit.is_verified || false,
        roles: userToEdit.roles || '',
      });
    } else {
      resetForm();
    }
  }, [userToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await UserFormSchemaBackoffice.validate(formData, { abortEarly: false });
      const userData = {
        ...formData,
        pseudo: formData.pseudo.trim().toLowerCase(),
        mail: formData.mail.trim().toLowerCase(),
        date_of_birth: new Date(formData.dateOfBirth).toISOString(),
        is_verified: formData.isVerified,
      };
      await onSubmit(userData);
      toast.success(SUCCESS_MESSAGES.USER_UPDATED);
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(ERROR_MESSAGES.GENERAL_ERROR);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id="add_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl mb-4 text-center">
          {userToEdit ? 'Modifier l’utilisateur' : 'Ajouter un utilisateur'}
        </h3>
        <form onSubmit={handleSubmit}>
          {['firstname', 'lastname', 'pseudo', 'mail'].map((field) => (
            <div key={field} className="mb-2">
              <InputShared
                type={field === 'mail' ? 'email' : 'text'}
                name={field}
                value={formData[field as keyof UserFormData]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input input-bordered w-full"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="mb-2">
            <PasswordInput
              value={formData.password}
              onChange={handleInputChange}
              showPassword={showNewPassword}
              toggleVisibility={toggleNewPasswordVisibility}
              disabled={!!userToEdit}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-2">
            <CountrySelect
              value={formData.country}
              onChange={handleInputChange}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <div className="mb-2">
            <InputShared
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Date de naissance"
              className="input input-bordered w-full"
              max={maxDate}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="mb-2">
            <RoleSelect value={formData.roles} onChange={handleInputChange} />
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">{errors.roles}</p>
            )}
          </div>
          <div className="mb-2">
            <VerifiedCheckbox
              checked={formData.isVerified}
              onChange={handleInputChange}
            />
            {errors.isVerified && (
              <p className="text-red-500 text-sm mt-1">{errors.isVerified}</p>
            )}
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn bg-button text-white hover:bg-black"
            >
              {userToEdit ? 'Modifier' : 'Ajouter'}
            </button>
            <button
              type="button"
              className="btn hover:bg-black"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalUser;
