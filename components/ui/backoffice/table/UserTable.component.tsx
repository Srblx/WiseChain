// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
import ModalUser from '../modal/ModalUser.composent';
import AddButton from './AddButton.component';
import UserTableHeaderFooter from './users/UserTableHeaderFooter.component';
import UserTableRow from './users/UserTableRow.component';

// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';

// React Libs
import { FC, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

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

  return (
    <>
      <AddButton
        onClick={handleOpenModalForAddUser}
        text={'Ajouter un utilisateur'}
      />
      <div className="overflow-x-auto  h-[730px]">
        <table className="table table-sm table-pin-rows table-pin-cols bg-gray-600">
          <UserTableHeaderFooter>
            {users.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                onDelete={() => handleOpenDeleteModal(user)}
                onEdit={() => handleOpenModalForEditUser(user)}
              />
            ))}
          </UserTableHeaderFooter>
        </table>
      </div>
      <ModalUser
        isOpen={isModalOpenForAddUser}
        onClose={handleCloseModalForAddUser}
        onSubmit={(userData, resetForm) =>
          handleAddOrEditUser(userData, resetForm)
        }
        userToEdit={userToEdit}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        firstname={itemToDelete?.firstname || ''}
        lastname={itemToDelete?.lastname || ''}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default UserTable;
