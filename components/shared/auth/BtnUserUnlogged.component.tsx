'use client';

// Libs Next
import Image from 'next/image';

// Libs React
import { useState } from 'react';

// Icons
import iconUserRed from '@/public/svg/icon-user.svg';

// Components
import Modal from '@/components/ui/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';

const ButtonUserUnlogged = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <nav>
        <button
          className="rounded-full p-1 mr-4 border-2 border-white bg-black"
          onClick={openModal}
        >
          <Image src={iconUserRed} alt="Icon utilisateur non connecté" />
        </button>
      </nav>
      <div className="flex justify-center items-center">
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        >
          <ModalContent onSuccess={handleModalSuccess} />
        </Modal>
      </div>
    </div>
  );
};

export default ButtonUserUnlogged;
