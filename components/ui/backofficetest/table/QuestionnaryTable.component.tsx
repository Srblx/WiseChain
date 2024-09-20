import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/Button.components';
import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import Routes from '@/enums/routes.enum';
import { Question, Questionnary } from '@/interfaces/questionnary.interface';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import GenericTable, { Column } from '../GenericTable.component';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
import QuestionModal from '../modal/ModalQuestionnary.component';

interface QuestionaryTableProps {
  token: string;
}

const QuestionaryTable: FC<QuestionaryTableProps> = ({ token }) => {
  const [questionaries, setQuestionaries] = useState<Questionnary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionaryToEdit, setQuestionaryToEdit] =
    useState<Questionnary | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Questionnary | null>(null);

  const fetchQuestionaries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_QUESTIONARY, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionaries(response.data.questionaries);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_QUESTIONARY, error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchQuestionaries();
  }, [fetchQuestionaries]);

  const handleAddOrEditQuestionary = async (
    newQuestionary: Questionnary,
    resetForm: () => void
  ) => {
    try {
      if (questionaryToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_QUESTIONARY}/${questionaryToEdit.id}`,
          newQuestionary,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          await fetchQuestionaries();
          handleCloseModal();
        }
      } else {
        const response = await axios.post(
          Routes.CRUD_QUESTIONARY,
          newQuestionary,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 201) {
          await fetchQuestionaries();
          resetForm();
          handleCloseModal();
        }
      }
      toast.success(SUCCESS_MESSAGES.QUESTIONARY_UPDATED);
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_QUESTIONARY_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleDeleteQuestionary = async (questionaryId: string) => {
    try {
      const response = await axios.delete(
        `${Routes.CRUD_QUESTIONARY}/${questionaryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setQuestionaries((prevQuestionaries) =>
          prevQuestionaries.filter(
            (questionary) => questionary.id !== questionaryId
          )
        );
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_QUESTIONARY_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenModal = (questions: Question[]) => {
    setSelectedQuestions(questions);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (questionary: Questionnary) => {
    setQuestionaryToEdit(questionary);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (questionary: Questionnary) => {
    setItemToDelete(questionary);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteQuestionary(itemToDelete.id);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<Questionnary>[] = [
    {
      header: '#',
      render: (questionary: Questionnary, index?: number) =>
        index !== undefined ? index + 1 : '',
    },
    {
      header: 'Titre du cours',
      render: (questionary: Questionnary) => questionary.subject,
    },
    {
      header: 'Nbr de questions',
      render: (questionary: Questionnary) =>
        questionary.questions.length.toString(),
    },
    {
      header: 'Détails des Questions',
      render: (questionary: Questionnary) => (
        <Button
          onClick={() => handleOpenModal(questionary.questions)}
          className="bg-button rounded-lg py-2 px-3 shadow-xs-light"
        >
          Voir les questions
        </Button>
      ),
    },
    {
      header: 'Actions',
      render: (questionary: Questionnary) => (
        <EditDeleteButton
          id={questionary.id}
          onEdit={() => handleOpenModalForEdit(questionary)}
          onDelete={() => handleOpenDeleteModal(questionary)}
        />
      ),
    },
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={questionaries}
        onAdd={() => console.log('click')}
        addButtonText="Ajouter un questionnaire"
      />
      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        questions={selectedQuestions}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.subject || ''}
      />
    </>
  );
};

export default QuestionaryTable;
