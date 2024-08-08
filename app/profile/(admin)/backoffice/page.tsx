'use client';

// Components
import ModalUser from '@/components/ui/backoffice/ModalUser.composent';
import AddButton from '@/components/ui/backoffice/table/AddButton.component';
import UserTableHeader from '@/components/ui/backoffice/table/TableHeader.component';
import UserTableRow from '@/components/ui/backoffice/table/TableRow.component';

// Enums
import Roles from '@/enums/roles.enum';
import Routes from '@/enums/routes.enum';
import TypeTab from '@/enums/typesTab.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Next libs
import { useRouter } from 'next/navigation';

// React libs
import { useCallback, useEffect, useState } from 'react';

// Helpers
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import ConfirmDeleteUserModal from '@/components/ui/backoffice/modal/ConfirmDeleteModal.component';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

type TabType =
  | TypeTab.USER
  | TypeTab.COURS
  | TypeTab.OUTILS
  | TypeTab.QUESTIONNAIRE
  | TypeTab.ARTICLES
  | TypeTab.GLOSSAIRE;

const BackofficePage = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>(TypeTab.USER);
  const [isModalOpenForAddUser, setIsModalOpenForAddUser] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(Routes.CRUD_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
      setIsLoading(false);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_USER, error);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      if (user.roles === Roles.ADMIN && user.is_verified) {
        setIsAuthorized(true);
        setIsLoading(false);
      } else {
        router.push(Routes.HOME);
      }
    } else {
      router.push(Routes.HOME);
    }
  }, [user, router]);

  useEffect(() => {
    if (isAuthorized) {
      fetchUsers();
    }
  }, [isAuthorized, fetchUsers]);

  const handleTabChange = (tab: TabType) => setActiveTab(tab);
  const handleOpenModalForAddUser = () => {
    setUserToEdit(null);
    setIsModalOpenForAddUser(true);
  };

  const handleOpenModalForEditUser = (user: User) => {
    setUserToEdit(user);
    setIsModalOpenForAddUser(true);
  };
  const handleCloseModalForAddUser = () => setIsModalOpenForAddUser(false);

  const handleAddOrEditUser = async (newUser: any) => {
    try {
      if (userToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_USERS}/${userToEdit.id}`,
          newUser,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
          handleCloseModalForAddUser();
        }
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_USER_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;

  const buttonText: Record<TabType, string> = {
    user: 'Ajouter un utilisateur',
    cours: 'Ajouter un cours',
    outils: 'Ajouter un outil',
    questionnaire: 'Ajouter un questionnaire',
    articles: 'Ajouter un article',
    glossaire: 'Ajouter une définition',
  };

  const handleOpenDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id);
      handleCloseDeleteModal();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_USERS}?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

  return (
    <>
      <div className="text-3xl mt-6 mb-6">
        <h1>BackOffice</h1>
      </div>
      <div className="flex justify-end mt-2">
        <AddButton
          onClick={handleOpenModalForAddUser}
          text={buttonText[activeTab]}
        />
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-tab-label"
          aria-label="Utilisateurs"
          defaultChecked
          onChange={() => handleTabChange(TypeTab.USER)}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto"
        >
          <div className="min-w-[1200px]">
            <table className="table table-zebra w-full">
              <UserTableHeader />
              <tbody>
                {users?.map((user, index) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    index={index}
                    onEdit={() => handleOpenModalForEditUser(user)}
                    onDelete={() => handleOpenDeleteModal(user)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalUser
        isOpen={isModalOpenForAddUser}
        onClose={handleCloseModalForAddUser}
        onSubmit={handleAddOrEditUser}
        userToEdit={userToEdit}
      />
      <ConfirmDeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        firstname={userToDelete?.firstname || ''}
        lastname={userToDelete?.lastname || ''}
      />
      <ToastContainer
        position="top-center"
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

export default BackofficePage;
