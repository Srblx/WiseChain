// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import GlossaryForm from '@/components/ui/backoffice/form/Glossary.form';
import Modal from '@/components/ui/backoffice/modal/Generic.modal';
import EditDeleteButton from '@/components/ui/backoffice/shared/EditDeleteButton.component';
import Pagination from '@/components/ui/backoffice/shared/Pagination.component';
import SearchAndActions from '@/components/ui/backoffice/shared/SearchAndAction.component';
import { Glossary } from '@/components/ui/glossary/GlossaryList.component';

// Hooks
import useGlossaryAPI from '@/hooks/backoffice/useGlossaryAPI.hook';
import useModal from '@/hooks/backoffice/useModal.hook';

// Helpers
import dayjs from '@/utils/dayjs';

// React libs
import { useEffect, useRef, useState } from 'react';

interface GlossaryTableProps {
  token: string;
  isAuthorized: boolean;
}

const GlossaryTable: React.FC<GlossaryTableProps> = ({
  token,
  isAuthorized,
}) => {
  const {
    glossaryItems,
    totalPages,
    page,
    isLoading,
    fetchGlossaryItems,
    handlePageChange,
    handleSaveTerm,
    handleUpdateTerm,
    handleDeleteTerm,
  } = useGlossaryAPI(token);

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
  } = useModal<Glossary, { id: string; title: string }>();

  const [newTerm, setNewTerm] = useState({ title: '', definition: '' });
  const [editedTerm, setEditedTerm] = useState({ title: '', definition: '' });
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthorized) fetchGlossaryItems();
  }, [isAuthorized, page]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTerm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTerm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalConfirm = async () => {
    await handleSaveTerm(newTerm);
    closeAllModals();
    fetchGlossaryItems();
  };

  const handleEditModalConfirm = async () => {
    if (!itemToEdit) return;
    await handleUpdateTerm({ ...itemToEdit, ...editedTerm });
    closeAllModals();
    fetchGlossaryItems();
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    await handleDeleteTerm(itemToDelete.id);
    closeAllModals();
    fetchGlossaryItems();
  };

  useEffect(() => {
    if (isEditModalOpen && itemToEdit) {
      setEditedTerm({
        title: itemToEdit.title,
        definition: itemToEdit.definition,
      });
    }
  }, [isEditModalOpen, itemToEdit]);

  if (!isAuthorized) return null;

  return (
    <div className="w-full h-full p-2">
      <div className="overflow-x-auto mr-4">
        <SearchAndActions
          placeholder="Recherche par terme"
          onAddClick={openAddModal}
          addButtonText="Ajouter un terme"
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
                    <th>Titre</th>
                    <th>Définition</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  {glossaryItems.length > 0 ? (
                    glossaryItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.definition}</td>
                        <td>{dayjs(item.createdAt).format('DD MMMM YYYY')}</td>
                        <td>
                          <EditDeleteButton
                            id={item.id!}
                            onEdit={() => openEditModal(item)}
                            onDelete={() =>
                              openDeleteModal({
                                id: item.id,
                                title: item.title,
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        Aucun terme trouvé
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
        title="Ajouter un terme"
        content={
          <GlossaryForm
            title={newTerm.title}
            definition={newTerm.definition}
            onChange={handleInputChange}
          />
        }
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={closeAllModals}
        onConfirm={handleEditModalConfirm}
        title="Modifier un terme"
        content={
          <GlossaryForm
            title={editedTerm.title}
            definition={editedTerm.definition}
            onChange={handleEditInputChange}
          />
        }
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le terme"
        content={
          <p>
            Êtes-vous sûr de vouloir supprimer le terme{' '}
            <strong>{itemToDelete?.title}</strong> ?
          </p>
        }
      />
    </div>
  );
};

export default GlossaryTable;
