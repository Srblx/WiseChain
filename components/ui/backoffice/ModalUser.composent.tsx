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
import { UserFormData } from '@/interfaces/auth/auth.interface';

// Utils
import { useNewPasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';

// React libs
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { useEffect, useState } from 'react';

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: any) => void;
}

const ModalUser: React.FC<ModalUserProps> = ({ isOpen, onClose, onSubmit }) => {
  const { formData, handleInputChange, resetForm } = useUserForm({
    firstname: '',
    lastname: '',
    pseudo: '',
    mail: '',
    password: '',
    country: '',
    birthOfDate: '',
    isVerified: false,
    roles: '',
  });

  const [maxDate, setMaxDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();

  useEffect(() => {
    const today = new Date();
    setMaxDate(today.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const userData = {
        ...formData,
        pseudo: formData.pseudo.trim().toLowerCase(),
        mail: formData.mail.trim().toLowerCase(),
        date_of_birth: new Date(formData.birthOfDate).toISOString(),
        is_verified: formData.isVerified,
      };
      await onSubmit(userData);
      onClose();
      resetForm();
    } catch (error) {
      console.error(ERROR_MESSAGES.ADD_USER_ERROR, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id="add_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl mb-4 text-center">
          Ajouter un utilisateur
        </h3>
        <form onSubmit={handleSubmit}>
          {['firstname', 'lastname', 'pseudo', 'mail'].map((field) => (
            <InputShared
              key={field}
              type={field === 'mail' ? 'email' : 'text'}
              name={field}
              value={formData[field as keyof UserFormData]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="input input-bordered w-full mb-2"
            />
          ))}
          <PasswordInput
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showNewPassword}
            toggleVisibility={toggleNewPasswordVisibility}
          />
          <CountrySelect
            value={formData.country}
            onChange={handleInputChange}
          />
          <InputShared
            type="date"
            name="birthOfDate"
            value={formData.birthOfDate}
            onChange={handleInputChange}
            placeholder="Date de naissance"
            className="input input-bordered w-full mb-2"
            max={maxDate}
          />
          <RoleSelect value={formData.roles} onChange={handleInputChange} />
          <VerifiedCheckbox
            checked={formData.isVerified}
            onChange={handleInputChange}
          />
          <div className="modal-action">
            <button
              type="submit"
              className="btn bg-button text-white hover:bg-black"
              disabled={isSubmitting}
            >
              Ajouter
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
