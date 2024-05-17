'use client';

import Image from 'next/image';
import { useState } from 'react';
import iconUserRed from '../../public/svg/icon-user.svg';
import Modal from '../ui/Modal.component';
import FormLogin from '../ui/auth/ModalContent.component';

const ButtonUserUnlogged = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <nav>
        <button
          className='rounded-full p-1 mr-4 border-2 border-white bg-black'
          onClick={openModal}
        >
          <Image src={iconUserRed} alt='Icon utilisateur non connecté' />
        </button>
      </nav>
      <div className='flex justify-center items-center'>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <FormLogin />
        </Modal>
      </div>
    </div>
  );
};

export default ButtonUserUnlogged;
