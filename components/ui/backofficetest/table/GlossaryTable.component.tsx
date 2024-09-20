import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import Routes from '@/enums/routes.enum';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import { Glossary } from '../../glossary/GlossaryList.component';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';

import axios from 'axios';
import GenericTable, { Column } from '../GenericTable.component';
import ModalGlossary from '../modal/ModalGlossary.component';

interface GlossaryTableProps {
  token: string;
}

const GlossaryTable: FC<GlossaryTableProps> = ({ token }) => {
  const [glossaryItems, setGlossaryItems] = useState<Glossary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [glossaryItemToEdit, setGlossaryItemToEdit] = useState<Glossary | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Glossary | null>(null);

  const fetchGlossaryItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_GLOSSARY, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGlossaryItems(response.data.glossaryItems);
      return response.data.glossaryItems;
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_GLOSSARY, error);
      toast.error('Erreur lors du chargement des données du glossaire.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGlossaryItems();
  }, [fetchGlossaryItems]);

  const handleAddOrEditGlossaryItem = async (newGlossaryItem: Glossary, resetForm: () => void) => {
    try {
      if (!newGlossaryItem.title || !newGlossaryItem.definition) {
        toast.error("Le titre et la définition sont requis.");
        return;
      }

      let response;
      if (glossaryItemToEdit) {
        // PUT request (update existing glossary item)
        response = await axios.put(
          `${Routes.CRUD_GLOSSARY}/${glossaryItemToEdit.id}`,
          newGlossaryItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // POST request (add new glossary item)
        response = await axios.post(
          Routes.CRUD_GLOSSARY,
          newGlossaryItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response && response.data) {
        const { title, definition } = response.data;

        if (title && definition) {
          console.log('Glossaire ajouté/mis à jour:', title, definition);
          
          const updatedGlossaryItems = await fetchGlossaryItems();
          setGlossaryItems(updatedGlossaryItems);

          if (!glossaryItemToEdit) {
            resetForm();
          }

          handleCloseModal();
          toast.success(SUCCESS_MESSAGES.GLOSSARY_UPDATED);
        } else {
          console.error('Données manquantes dans la réponse:', response.data);
          toast.error('Erreur : Les données retournées par le serveur sont incomplètes.');
        }
      } else {
        console.error('Erreur : Aucune donnée retournée.');
        toast.error('Erreur : Aucune donnée retournée par le serveur.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du glossaire:', error);
      toast.error('Une erreur est survenue lors de la soumission.');
    }
  };

  const handleDeleteGlossaryItem = async (glossaryItemId: string) => {
    try {
      const response = await axios.delete(
        `${Routes.CRUD_GLOSSARY}?id=${glossaryItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setGlossaryItems((prevItems) =>
          prevItems.filter((item) => item.id !== glossaryItemId)
        );
        handleCloseDeleteModal();
        toast.success('Définition supprimée avec succès');
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_GLOSSARY_ERROR, error);
      toast.error('Une erreur est survenue lors de la suppression.');
    }
  };

  const handleOpenModal = () => {
    setGlossaryItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (glossaryItem: Glossary) => {
    setGlossaryItemToEdit(glossaryItem);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (glossaryItem: Glossary) => {
    setItemToDelete(glossaryItem);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteGlossaryItem(itemToDelete.id || '');
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<Glossary>[] = [
    {
      header: '#',
      render: (glossaryItem: Glossary, index?: number) =>
        index !== undefined ? index + 1 : '',
    },
    { header: 'Terme', render: (glossaryItem: Glossary) => glossaryItem.title },
    { header: 'Définition', render: (glossaryItem: Glossary) => glossaryItem.definition },
    {
      header: 'Actions',
      render: (glossaryItem: Glossary) => (
        <EditDeleteButton
          id={glossaryItem.id || ''}
          onEdit={() => handleOpenModalForEdit(glossaryItem)}
          onDelete={() => handleOpenDeleteModal(glossaryItem)}
        />
      ),
    },
  ];

  return (
    <>
      <GenericTable
        data={glossaryItems}
        columns={columns}
        onAdd={handleOpenModal}
        addButtonText="Ajouter une définition"
      />
      <ModalGlossary
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddOrEditGlossaryItem}
        glossaryItemToEdit={glossaryItemToEdit}
        // token={token}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.title || ''}
      />
    </>
  );
};

export default GlossaryTable;
