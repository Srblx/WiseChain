import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import Routes from '@/enums/routes.enum';
import { Articles } from '@/interfaces/article.interface';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
// import ModalArticle from '../modal/ModalArticle.component';
import GenericTable, { Column } from '../GenericTable.component';

interface ArticleTableProps {
  token: string;
}

const ArticleTable: FC<ArticleTableProps> = ({ token }) => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<Articles | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Articles | null>(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_ARTICLE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_ARTICLE, error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleAddOrEditArticle = async (newArticle: Articles, resetForm: () => void) => {
    try {
      if (articleToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_ARTICLE}/${articleToEdit.id}`,
          newArticle,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          await fetchArticles();
          handleCloseModal();
        }
      } else {
        const response = await axios.post(Routes.CRUD_ARTICLE, newArticle, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 201) {
          await fetchArticles();
          resetForm();
          handleCloseModal();
        }
      }
      toast.success(SUCCESS_MESSAGES.ARTICLE_UPDATED);
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_ARTICLE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_ARTICLE}/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_ARTICLE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenModal = () => {
    setArticleToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (article: Articles) => {
    setArticleToEdit(article);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (article: Articles) => {
    setItemToDelete(article);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteArticle(itemToDelete.id);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<Articles>[] = [
    { 
      header: '#', 
      render: (article: Articles, index?: number) => (index !== undefined ? index + 1 : '')
    },
    { header: 'Titre', render: (article: Article) => article.title },
    { 
      header: 'Résumé', 
      render: (article: Articles) => article.summary.slice(0, 100) + (article.summary.length > 100 ? '...' : '') 
    },
    { header: 'Image', render: (article: Articles) => article.img ? 'Oui' : 'Non' },
    { header: 'Date de création', render: (article: Articles) => new Date(article.created_at).toLocaleDateString() },
    { header: 'Auteur', render: (article: Articles) => `${article.user.firstname} ${article.user.lastname}` },
    { header: 'Catégorie', render: (article: Articles) => article.category.name },
    { 
      header: 'Actions', 
      render: (article: Articles) => (
        <EditDeleteButton
          id={article.id}
          onEdit={() => handleOpenModalForEdit(article)}
          onDelete={() => handleOpenDeleteModal(article)}
        />
      )
    },
  ];

  return (
    <>
      <GenericTable
        data={articles}
        columns={columns}
        onAdd={handleOpenModal}
        addButtonText="Ajouter un article"
      />
      {/* <ModalArticle
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddOrEditArticle}
        articleToEdit={articleToEdit} */}
      {/* /> */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.title || ''}
      />
    </>
  );
};

export default ArticleTable;