// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
import ModalUser from '../modal/ModalUser.composent';

// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';

// React Libs
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Interfaces
import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import { User } from '@/interfaces/auth/auth.interface';
import GenericTable, { Column } from '../GenericTable.component';

interface UserTableProps {
  token: string;
}

const UserTable: FC<UserTableProps> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenForAddUser, setIsModalOpenForAddUser] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [itemToDelete, setItemToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_USER, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleAddOrEditUser = async (newUser: User, resetForm: () => void) => {
    try {
      if (userToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_USERS}/${userToEdit.id}`,
          newUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userToEdit.id ? response.data : user
            )
          );
          handleCloseModalForAddUser();
        }
      } else {
        const response = await axios.post(Routes.CRUD_USERS, newUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 201) {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          resetForm();
          handleCloseModalForAddUser();
        }
      }
      toast.success(SUCCESS_MESSAGES.USER_UPDATED);
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_USER_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_USERS}?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_USER_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenModalForAddUser = () => {
    setUserToEdit(null);
    setIsModalOpenForAddUser(true);
  };

  const handleOpenModalForEditUser = (user: User) => {
    setUserToEdit(user);
    setIsModalOpenForAddUser(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setItemToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteUser(itemToDelete.id);
      handleCloseDeleteModal();
    }
  };

  const handleCloseModalForAddUser = () => setIsModalOpenForAddUser(false);

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<User>[] = [
    {
      header: '#',
      render: (user: User, index?: number) =>
        index !== undefined ? index + 1 : '',
    },
    {
      header: 'Nom et Prénom',
      render: (user: User) => `${user.firstname} ${user.lastname}`,
    },
    {
      header: 'Pseudo',
      render: (user: User) => user.pseudo,
    },
    {
      header: 'Email',
      render: (user: User) => user.mail,
    },
    {
      header: 'Photo de profil',
      render: (user: User) =>
        user.profile_img ? user.profile_img : 'Photo de profil par défaut',
      className: 'min-w-[250px]',
    },
    {
      header: 'Pays',
      render: (user: User) => user.country,
    },
    {
      header: "Date d'anniversaire",
      render: (user: User) => new Date(user.date_of_birth).toLocaleDateString(),
    },
    {
      header: 'Compte vérifié',
      render: (user: User) => (user.is_verified ? 'Oui' : 'Non'),
      className: 'min-w-[50px]',
    },
    {
      header: 'Compte restreint',
      render: (user: User) => (user.is_revoice ? 'Oui' : 'Non'),
      className: 'min-w-[50px]',
    },
    {
      header: 'Rôle',
      render: (user: User) => user.roles,
    },
    {
      header: 'Actions',
      render: (user: User) => (
        <EditDeleteButton
          id={user.id}
          onEdit={() => handleOpenModalForEditUser(user)}
          onDelete={() => handleOpenDeleteModal(user)}
        />
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <GenericTable
        data={users}
        columns={columns}
        onAdd={handleOpenModalForAddUser}
        addButtonText="Ajouter un utilisateur"
      />
      <ModalUser
        isOpen={isModalOpenForAddUser}
        onClose={handleCloseModalForAddUser}
        onSubmit={handleAddOrEditUser}
        userToEdit={userToEdit}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        firstname={itemToDelete?.firstname || ''}
        lastname={itemToDelete?.lastname || ''}
      />
    </>
  );
};

export default UserTable;
