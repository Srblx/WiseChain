import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import useModal from '@/hooks/backoffice/useModal.hook';
import useUserAPI from '@/hooks/backoffice/useUserAPI.hook';
import { User } from '@/interfaces/auth/auth.interface';
import dayjs from '@/utils/dayjs';
import { useEffect, useRef, useState } from 'react';
import InputShared from '../shared/InputShared.component';
import Label from '../shared/Label.component';
import LoadingSpinner from '../shared/LoadingSpinner.component';
import CountrySelect from '../ui/backofficetest/shared/CountrySelect.component';
import Pagination from '../ui/backofficetest/shared/Pagination.component';
import RoleSelect from '../ui/backofficetest/shared/RolesSelect.component';
import Modal from './modal/Generic.modal';
import SearchAndActions from './SearchAndAction.component';

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
    setNewUser((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleModalConfirm = async () => {
    await handleSaveUser(newUser);
    closeAllModals();
    handlePageChange(page);
  };

  const handleEditModalConfirm = async () => {
    if (!itemToEdit) return;
    console.log('itemToEdit', itemToEdit);
    const updatedUser = {
      ...itemToEdit,
      ...editedUser,
      date_of_birth: editedUser.date_of_birth ? dayjs(editedUser.date_of_birth).toISOString() : '',
    };
    console.log('updatedUser', updatedUser);
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
        date_of_birth: itemToEdit.date_of_birth ? dayjs(itemToEdit.date_of_birth).format('YYYY-MM-DD') : '',
        roles: itemToEdit.roles,
        profile_img: itemToEdit.profile_img,
        is_verified: itemToEdit.is_verified,
        is_revoice: itemToEdit.is_revoice,
        created_at: itemToEdit.created_at || '',
      });
    }
  }, [isEditModalOpen, itemToEdit]);
  
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
                        <td>{user.lastname} - {user.firstname}</td>
                        <td>{user.pseudo}</td>
                        <td>{user.mail}</td>
                        <td>{dayjs(user.date_of_birth).format('DD MMMM YYYY')}</td>
                        <td>{user.country}</td>
                        <td>{user.profile_img ? user.profile_img : 'Photo de profil par défaut'}</td>
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
        title="Ajouter un utilisateur"
        content={
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastname">Nom</Label>
              <InputShared
                name="lastname"
                value={newUser.lastname}
                onChange={handleInputChange}
                placeholder="Nom de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <InputShared
                name="firstname"
                value={newUser.firstname}
                onChange={handleInputChange}
                placeholder="Prénom de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="pseudo">Pseudo</Label>
              <InputShared
                name="pseudo"
                value={newUser.pseudo}
                onChange={handleInputChange}
                placeholder="Pseudo de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="mail">Email</Label>
              <InputShared
                name="mail"
                value={newUser.mail}
                onChange={handleInputChange}
                placeholder="Email de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <InputShared
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Mot de passe de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="country">Pays</Label>
              <CountrySelect
                value={newUser.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date_of_birth">Date de naissance</Label>
              <InputShared
                type="date"
                name="date_of_birth"
                value={newUser.date_of_birth}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="roles">Rôles</Label>
              <RoleSelect value={newUser.roles} onChange={handleInputChange} />
            </div>
            <div className="col-span-2 flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_verified"
                  name="is_verified"
                  checked={newUser.is_verified}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <Label htmlFor="is_verified">Vérifié</Label>
              </div>
            </div>
          </div>
        }
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={closeAllModals}
        onConfirm={handleEditModalConfirm}
        title="Modifier un utilisateur"
        content={
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastname">Nom</Label>
              <InputShared
                name="lastname"
                value={editedUser.lastname}
                onChange={handleEditInputChange}
                placeholder="Nom de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <InputShared
                name="firstname"
                value={editedUser.firstname}
                onChange={handleEditInputChange}
                placeholder="Prénom de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="pseudo">Pseudo</Label>
              <InputShared
                name="pseudo"
                value={editedUser.pseudo}
                onChange={handleEditInputChange}
                placeholder="Pseudo de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="mail">Email</Label>
              <InputShared
                name="mail"
                value={editedUser.mail}
                onChange={handleEditInputChange}
                placeholder="Email de l'utilisateur"
              />
            </div>
            <div>
              <Label htmlFor="country">Pays</Label>
              <CountrySelect
                value={editedUser.country}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date_of_birth">Date de naissance</Label>
              <InputShared
                type="date"
                name="date_of_birth"
                value={editedUser.date_of_birth}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
              <Label htmlFor="roles">Rôles</Label>
              <RoleSelect
                value={editedUser.roles}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
              <Label htmlFor="profile_img">Image de profil</Label>
              <InputShared
                name="profile_img"
                value={editedUser.profile_img}
                onChange={handleEditInputChange}
                placeholder="URL de l'image de profil"
              />
            </div>
            <div className="col-span-2 flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_verified"
                  name="is_verified"
                  checked={editedUser.is_verified}
                  onChange={handleEditInputChange}
                  className="mr-2"
                />
                <Label htmlFor="is_verified">Vérifié</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_revoice"
                  name="is_revoice"
                  checked={editedUser.is_revoice}
                  onChange={handleEditInputChange}
                  className="mr-2"
                />
                <Label htmlFor="is_revoice">Revoice</Label>
              </div>
            </div>
          </div>
        }
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        onConfirm={handleDeleteConfirm}
        title="Supprimer l'utilisateur"
        content={
          <p>
            Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
            <strong>{itemToDelete?.pseudo}</strong> ?
          </p>
        }
      />
    </div>
  );
};

export default UserTable;