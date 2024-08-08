// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// React Icons
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

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
    <td>{user.country}</td>
    <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
    <td>{user.img ? 'Oui' : 'Non'}</td>
    <td>{user.is_verified ? 'Oui' : 'Non'}</td>
    <td>{user.is_revoice ? 'Oui' : 'Non'}</td>
    <td>{user.roles}</td>
    <td>
      <div className="flex items-center space-x-4 justify-center">
        <BiEditAlt
          color="blue"
          size={'1.3rem'}
          onClick={() => onEdit(user.id)}
        />
        <MdDelete
          color="red"
          size={'1.2rem'}
          onClick={() => onDelete(user.id)}
        />
      </div>
    </td>
  </tr>
);

export default UserTableRow;
