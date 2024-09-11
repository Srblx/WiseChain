// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// Components
import EditDeleteButton from '@/components/shared/EditDeleteButton.component';

interface UserTableRowProps {
  user: User;
  index: number;
  onDelete: (userId: string) => void;
  onEdit: (userId: string) => void;
}

const UserTableRow = ({ user, index, onDelete, onEdit }: UserTableRowProps) => (
  <tr key={user.id} className="text-center">
    <th>{index + 1}</th>
    <td>{`${user.firstname} ${user.lastname}`}</td>
    <td>{user.pseudo}</td>
    <td>{user.mail}</td>
    <td>
      {user.profile_img
        ? user.profile_img
        : 'Photo de profil par défaut'}
    </td>
    <td>{user.country}</td>
    <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
    <td>{user.profile_img ? 'Oui' : 'Non'}</td>
    <td>{user.is_verified ? 'Oui' : 'Non'}</td>
    <td>{user.is_revoice ? 'Oui' : 'Non'}</td>
    <td>{user.roles}</td>
    <td>
      <EditDeleteButton
        id={user.id}
        onEdit={() => onEdit(user.id)}
        onDelete={() => onDelete(user.id)}
      />
    </td>
  </tr>
);

export default UserTableRow;
