// React libs
import { useState } from 'react';

type ModalType<T, U> = {
  isOpen: boolean;
  itemToEdit: T | null;
  itemToDelete: U | null;
};

const useModal = <T, U extends { id: string; title?: string; pseudo?: string }>() => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);
  const [itemToDelete, setItemToDelete] = useState<U | null>(null);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: T) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item: U) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const closeAllModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setItemToEdit(null);
    setItemToDelete(null);
  };

  return {
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    itemToEdit,
    itemToDelete,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeAllModals,
  } as const;
};

export default useModal;
