import Routes from '@/enums/routes.enum';
import { User } from '@/interfaces/auth/auth.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useUserAPI = (token: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 15;

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_USERS, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveUser = async (newUser: Omit<User, 'id' | 'created_at'>) => {
    try {
      const userWithCreatedAt = {
        ...newUser,
        created_at: new Date().toISOString(),
      };

      const response = await axios.post(Routes.CRUD_USERS, userWithCreatedAt, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Utilisateur créé avec succès:', response.data);
      fetchUsers();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erreur lors de la création de l'utilisateur:",
          error.response?.data
        );
      } else {
        console.error('Erreur inattendue:', error);
      }
      throw error;
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await axios.put(`${Routes.CRUD_USERS}/${updatedUser.id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`${Routes.CRUD_USERS}?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return {
    users,
    totalPages,
    page,
    isLoading,
    fetchUsers,
    handleSaveUser,
    handleUpdateUser,
    handleDeleteUser,
    handlePageChange,
  };
};

export default useUserAPI;
