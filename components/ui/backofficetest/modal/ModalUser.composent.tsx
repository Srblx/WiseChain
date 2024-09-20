import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import { useUserForm } from '@/hooks/useForm.hook';
import { User, UserFormData } from '@/interfaces/auth/auth.interface';
import { useNewPasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';
import { UserFormSchemaBackoffice } from '@/validators/form.validator';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import VerifiedCheckbox from '../shared/Checkbox.component';
import { CloseButton } from '../shared/CloseButton.component';
import CountrySelect from '../shared/CountrySelect.component';
import PasswordInput from '../shared/PasswordInput.component';
import RoleSelect from '../shared/RolesSelect.component';

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: any, resetForm: () => void) => void;
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
      isRevoice: false,
      profileImg: '',
      createdAt: '',
      id: '',
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
        isRevoice: userToEdit.is_revoice || false,
        profileImg: userToEdit.profile_img || '',
        createdAt: userToEdit.created_at || '',
        id: userToEdit.id || '',
      });
    } else {
      resetForm();
    }
  }, [userToEdit]);

  const handleSubmit = async () => {
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
      await onSubmit(userData, resetForm);
      toast.success('Utilisateur ajouté avec succès');
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Une erreur est survenue');
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
        <form onSubmit={(e) => e.preventDefault()}>
          {['firstname', 'lastname', 'pseudo', 'mail'].map((field) => (
            <div key={field} className="mb-2">
              <InputShared
                type={field === 'mail' ? 'email' : 'text'}
                name={field}
                value={formData[field as keyof UserFormData]}
                onChange={handleInputChange}
                placeholder={
                  field === 'firstname'
                    ? 'Prénom'
                    : field === 'lastname'
                      ? 'Nom'
                      : field.charAt(0).toUpperCase() + field.slice(1)
                }
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
            <CloseButton onClick={onClose} />
            <Button
              className="bg-green-500 rounded-lg py-2 px-3"
              onClick={handleSubmit}
            >
              {userToEdit ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalUser;
