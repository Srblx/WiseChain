import { Glossary } from '@/components/ui/glossary/GlossaryList.component';
import Routes from '@/enums/routes.enum';
import axios from 'axios';
import { useEffect, useState } from 'react';


const useGlossaryAPI = (token: string) => {
  const [glossaryItems, setGlossaryItems] = useState<Glossary[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 15;

  const fetchGlossaryItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_GLOSSARY, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });
      setGlossaryItems(response.data.glossaryItems);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Erreur lors de la récupération des termes du glossaire', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTerm = async (newTerm: { title: string; definition: string }) => {
    try {
      await axios.post(Routes.CRUD_GLOSSARY, newTerm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGlossaryItems(); // Fetch updated glossary items
    } catch (error) {
      console.error('Error adding new term:', error);
    }
  };

  const handleUpdateTerm = async (term: Glossary) => {
    try {
      if (!term.id) throw new Error('Term ID is required for update');
      await axios.put(`${Routes.CRUD_GLOSSARY}/${term.id}`, term, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGlossaryItems(); // Fetch updated glossary items
    } catch (error) {
      console.error('Erreur lors de la mise à jour du terme:', error);
    }
  };

  const handleDeleteTerm = async (id: string) => {
    try {
      await axios.delete(Routes.CRUD_GLOSSARY, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id },
      });
      fetchGlossaryItems(); // Fetch updated glossary items
    } catch (error) {
      console.error('Error deleting term:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchGlossaryItems();
  }, [page]);

  return {
    glossaryItems,
    totalPages,
    page,
    isLoading,
    fetchGlossaryItems,
    handleSaveTerm,
    handleUpdateTerm,
    handleDeleteTerm,
    handlePageChange,
  };
};

export default useGlossaryAPI;
