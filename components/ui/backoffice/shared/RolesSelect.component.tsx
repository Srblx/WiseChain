// Components
import { SelectProps } from './CountrySelect.component';

const RoleSelect = ({ value, onChange }: SelectProps) => (
  <select
    name="roles"
    value={value}
    onChange={onChange}
    className="select select-bordered w-full mb-2"
  >
    <option value="">Sélectionnez un rôle</option>
    <option value="user">Utilisateur</option>
    <option value="guest">Invité</option>
    <option value="editor">Rédacteur</option>
    <option value="moderator">Modérateur</option>
    <option value="admin">Administrateur</option>
  </select>
);

export default RoleSelect;
