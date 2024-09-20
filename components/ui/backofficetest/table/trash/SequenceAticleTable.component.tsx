import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import Routes from '@/enums/routes.enum';
import { SequenceArticle } from '@/interfaces/article.interface';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';

import GenericTable, { Column } from '../GenericTable.component';

interface SequenceArticleTableProps {
  token: string;
  articleId: string;
}

const SequenceArticleTable: FC<SequenceArticleTableProps> = ({ token, articleId }) => {
  const [sequences, setSequences] = useState<SequenceArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sequenceToEdit, setSequenceToEdit] = useState<SequenceArticle | null>(null);
  const [itemToDelete, setItemToDelete] = useState<SequenceArticle | null>(null);

  const fetchSequences = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Routes.CRUD_SEQUENCE_ARTICLE}/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSequences(response.data.sequences);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_SEQUENCE_ARTICLE, error);
    } finally {
      setIsLoading(false);
    }
  }, [token, articleId]);

  useEffect(() => {
    fetchSequences();
  }, [fetchSequences]);

  const handleAddOrEditSequence = async (newSequence: SequenceArticle, resetForm: () => void) => {
    try {
      if (sequenceToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_SEQUENCE_ARTICLE}/${sequenceToEdit.id}`,
          newSequence,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          await fetchSequences();
          handleCloseModal();
        }
      } else {
        const response = await axios.post(Routes.CRUD_SEQUENCE_ARTICLE, { ...newSequence, article_id: articleId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 201) {
          await fetchSequences();
          resetForm();
          handleCloseModal();
        }
      }
      toast.success(SUCCESS_MESSAGES.SEQUENCE_ARTICLE_UPDATED);
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_SEQUENCE_ARTICLE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleDeleteSequence = async (sequenceId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_SEQUENCE_ARTICLE}/${sequenceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setSequences((prevSequences) => prevSequences.filter((sequence) => sequence.id !== sequenceId));
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_SEQUENCE_ARTICLE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenModal = () => {
    setSequenceToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (sequence: SequenceArticle) => {
    setSequenceToEdit(sequence);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (sequence: SequenceArticle) => {
    setItemToDelete(sequence);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteSequence(itemToDelete.id);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<SequenceArticle>[] = [
    { 
      header: '#', 
      render: (sequence: SequenceArticle, index?: number) => (index !== undefined ? index + 1 : '')
    },
    { header: 'Index', render: (sequence: SequenceArticle) => sequence.index.toString() },
    { header: 'Titre', render: (sequence: SequenceArticle) => sequence.title },
    { 
      header: 'Contenu', 
      render: (sequence: SequenceArticle) => sequence.containt.slice(0, 100) + (sequence.containt.length > 100 ? '...' : '') 
    },
    { header: 'Image', render: (sequence: SequenceArticle) => sequence.img ? 'Oui' : 'Non' },
    { 
      header: 'Actions', 
      render: (sequence: SequenceArticle) => (
        <EditDeleteButton
          id={sequence.id}
          onEdit={() => handleOpenModalForEdit(sequence)}
          onDelete={() => handleOpenDeleteModal(sequence)}
        />
      )
    },
  ];

  return (
    <>
      <GenericTable
        data={sequences}
        columns={columns}
        onAdd={handleOpenModal}
        addButtonText="Ajouter une séquence d'article"
      />
      {/* <ModalSequenceArticle
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddOrEditSequence}
        sequenceToEdit={sequenceToEdit}
      /> */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.title || ''}
      />
    </>
  );
};

export default SequenceArticleTable;