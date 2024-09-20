// Component
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import UserForm from '@/components/ui/backoffice/form/User.form';
import Modal from '@/components/ui/backoffice/modal/Generic.modal';
import EditDeleteButton from '@/components/ui/backoffice/shared/EditDeleteButton.component';
import Pagination from '@/components/ui/backoffice/shared/Pagination.component';
import SearchAndActions from '@/components/ui/backoffice/shared/SearchAndAction.component';

// Hooks
import useModal from '@/hooks/backoffice/useModal.hook';
import useUserAPI from '@/hooks/backoffice/useUserAPI.hook';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// Utils
import { useNewPasswordVisibility } from '@/utils/auth/usePasswordVisibility.utils';

// Helpers
import dayjs from '@/utils/dayjs';

// React libs
import { useEffect, useRef, useState } from 'react';

interface UserTableProps {
  token: string;
  isAuthorized: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ token, isAuthorized }) => {
  const {
    users,
    page,
    totalPages,
    isLoading,
    handleSaveUser,
    handleUpdateUser,
    handleDeleteUser,
    handlePageChange,
  } = useUserAPI(token);

  const {
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    itemToEdit,
    itemToDelete,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeAllModals,
  } = useModal<User, { id: string; pseudo: string }>();

  const { showNewPassword, toggleNewPasswordVisibility } =
    useNewPasswordVisibility();

  const [showPassword, setShowPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    lastname: '',
    firstname: '',
    pseudo: '',
    mail: '',
    password: '',
    country: '',
    date_of_birth: '',
    roles: '',
    profile_img: '',
    is_verified: false,
    is_revoice: false,
  });

  const [editedUser, setEditedUser] = useState({
    lastname: '',
    firstname: '',
    pseudo: '',
    mail: '',
    country: '',
    date_of_birth: '',
    roles: '',
    profile_img: '',
    is_verified: false,
    is_revoice: false,
    created_at: '',
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthorized) handlePageChange(page);
  }, [isAuthorized]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setNewUser((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setEditedUser((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleModalConfirm = async () => {
    await handleSaveUser(newUser);
    closeAllModals();
    handlePageChange(page);
  };

  const handleEditModalConfirm = async () => {
    if (!itemToEdit) return;
    const updatedUser = {
      ...itemToEdit,
      ...editedUser,
      date_of_birth: editedUser.date_of_birth
        ? dayjs(editedUser.date_of_birth).toISOString()
        : '',
    };
    await handleUpdateUser(updatedUser);
    closeAllModals();
    handlePageChange(page);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    await handleDeleteUser(itemToDelete.id);
    closeAllModals();
    handlePageChange(page);
  };

  useEffect(() => {
    if (isEditModalOpen && itemToEdit) {
      setEditedUser({
        lastname: itemToEdit.lastname,
        firstname: itemToEdit.firstname,
        pseudo: itemToEdit.pseudo,
        mail: itemToEdit.mail,
        country: itemToEdit.country,
        date_of_birth: itemToEdit.date_of_birth
          ? dayjs(itemToEdit.date_of_birth).format('YYYY-MM-DD')
          : '',
        roles: itemToEdit.roles,
        profile_img: itemToEdit.profile_img,
        is_verified: itemToEdit.is_verified,
        is_revoice: itemToEdit.is_revoice,
        created_at: itemToEdit.created_at || '',
      });
    }
  }, [isEditModalOpen, itemToEdit]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isAuthorized) return null;

  return (
    <div className="w-full h-full p-2">
      <div className="overflow-x-auto mr-4">
        <SearchAndActions
          placeholder="Recherche par utilisateur"
          onAddClick={openAddModal}
          addButtonText="Ajouter un utilisateur"
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div
              ref={tableContainerRef}
              className="max-h-[74dvh] overflow-y-auto"
            >
              <table className="table w-full">
                <thead className="sticky top-0 bg-grayDark text-lg font-extrabold text-white">
                  <tr>
                    <th>Nom - Prénom</th>
                    <th>Pseudo</th>
                    <th>Email</th>
                    <th>Date de naissance</th>
                    <th>Pays</th>
                    <th>Image de profil</th>
                    <th>Roles</th>
                    <th>Compte vérifié</th>
                    <th>Compte restraint</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-center">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.lastname} - {user.firstname}
                        </td>
                        <td>{user.pseudo}</td>
                        <td>{user.mail}</td>
                        <td>
                          {dayjs(user.date_of_birth).format('DD MMMM YYYY')}
                        </td>
                        <td>{user.country}</td>
                        <td>
                          {user.profile_img
                            ? user.profile_img
                            : 'Photo de profil par défaut'}
                        </td>
                        <td>{user.roles}</td>
                        <td>{user.is_verified ? 'Oui' : 'Non'}</td>
                        <td>{user.is_revoice ? 'Oui' : 'Non'}</td>
                        <td>{dayjs(user.created_at).format('DD MMMM YYYY')}</td>
                        <td>
                          <EditDeleteButton
                            id={user.id!}
                            onEdit={() => openEditModal(user)}
                            onDelete={() =>
                              openDeleteModal({
                                id: user.id,
                                pseudo: user.pseudo,
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAllModals}
        onConfirm={handleModalConfirm}
        title={'Ajouter un utilisateur'}
        content={
          <UserForm
            user={newUser}
            onChange={handleInputChange}
            isEditMode={false}
          />
        }
      />
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAllModals}
        onConfirm={handleModalConfirm}
        title={'Modifier un utilisateur'}
        content={
          <UserForm
            user={newUser}
            onChange={handleInputChange}
            isEditMode={false}
          />
        }
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeAllModals}
        onConfirm={handleEditModalConfirm}
        title="Modifier un utilisateur"
        content={
          <UserForm
            user={editedUser}
            onChange={handleEditInputChange}
            isEditMode={true}
          />
        }
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        onConfirm={handleDeleteConfirm}
        title="Supprimer un utilisateur"
        content={
          itemToDelete ? (
            <p>
              Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
              <span className="font-bold">{itemToDelete.pseudo}</span> ?
            </p>
          ) : null
        }
      />
    </div>
  );
};

export default UserTable;
