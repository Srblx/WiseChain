// Components
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import Checkbox from '@/components/ui/backoffice/shared/Checkbox.component';
import CountrySelect from '@/components/ui/backoffice/shared/CountrySelect.component';
import InputPassword from '@/components/ui/backoffice/shared/PasswordInput.component';
import RoleSelect from '@/components/ui/backoffice/shared/RolesSelect.component';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// Utils
import { useNewPasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';

// Helpers
import dayjs from '@/utils/dayjs';

// React libs
import React from 'react';

interface UserFormProps {
  user: Partial<User>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isEditMode: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onChange, isEditMode }) => {
  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="lastname">Nom</Label>
        <InputShared
          name="lastname"
          value={user.lastname || ''}
          onChange={onChange}
          placeholder="Nom de l'utilisateur"
        />
      </div>
      <div>
        <Label htmlFor="firstname">Prénom</Label>
        <InputShared
          name="firstname"
          value={user.firstname || ''}
          onChange={onChange}
          placeholder="Prénom de l'utilisateur"
        />
      </div>
      <div>
        <Label htmlFor="pseudo">Pseudo</Label>
        <InputShared
          name="pseudo"
          value={user.pseudo || ''}
          onChange={onChange}
          placeholder="Pseudo de l'utilisateur"
        />
      </div>
      <div>
        <Label htmlFor="mail">Email</Label>
        <InputShared
          name="mail"
          value={user.mail || ''}
          onChange={onChange}
          placeholder="Email de l'utilisateur"
        />
      </div>
      {!isEditMode && (
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <InputPassword
            value={user.password || ''}
            onChange={onChange}
            showPassword={showNewPassword}
            toggleVisibility={toggleNewPasswordVisibility}
          />
        </div>
      )}
      <div>
        <Label htmlFor="country">Pays</Label>
        <CountrySelect value={user.country || ''} onChange={onChange} />
      </div>
      <div>
        <Label htmlFor="date_of_birth">Date de naissance</Label>
        <InputShared
          type="date"
          name="date_of_birth"
          value={
            user.date_of_birth
              ? dayjs(user.date_of_birth).format('YYYY-MM-DD')
              : ''
          }
          onChange={onChange}
        />
      </div>
      <div>
        <Label htmlFor="roles">Rôles</Label>
        <RoleSelect value={user.roles || ''} onChange={onChange} />
      </div>
      {isEditMode && (
        <div>
          <Label htmlFor="profile_img">Image de profil</Label>
          <InputShared
            name="profile_img"
            value={user.profile_img || ''}
            onChange={onChange}
            placeholder="URL de l'image de profil"
          />
        </div>
      )}
      <div className="col-span-2 flex items-center space-x-1">
        <Checkbox
          name="is_verified"
          checked={user.is_verified || false}
          onChange={onChange}
        />
        <Label htmlFor="is_verified">Profil Vérifié</Label>
        <span className="text-xl">|</span>
        {isEditMode && (
          <>
            <Checkbox
              name="is_revoice"
              checked={user.is_revoice || false}
              onChange={onChange}
            />
            <Label htmlFor="is_revoice">Profil Restreint</Label>
          </>
        )}
      </div>
    </div>
  );
};

export default UserForm;
