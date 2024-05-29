'use client';

// Libs Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Libs React
import { useState } from 'react';

// Icons
import iconUserGreen from '@/public/svg/icon-user-logged.svg';
import iconUserRed from '@/public/svg/icon-user-unlogged.svg';
import { MdOutlineLogout } from 'react-icons/md';

// Components
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import Modal from '@/components/ui/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';
import useAuth from '@/hooks/useAuth.hooks';

const ButtonUserUnlogged = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useState(false);
  const [showConfirm, toggleConfirm] = useState(false);
  const { token, logout } = useAuth();
  const isLogged = token !== null;

  const handleModalClose = () => {
    toggleModal(false);
  };

  const handleModalSuccess = () => {
    toggleModal(false);
  };

  const confirmLogout = () => {
    toggleConfirm(true);
  };

  const handleLogout = () => {
    logout();
    toggleConfirm(false);
    router.push('/');
  };

  const cancelLogout = () => {
    toggleConfirm(false);
  };

  const handleUserIconClick = () => {
    if (isLogged) {
      router.push('/profile');
    } else {
      toggleModal(true);
    }
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center space-x-1">
          {isLogged && <MdOutlineLogout onClick={confirmLogout} size="1.5em" />}
          <div className="ml-4">
            <button
              className="rounded-full p-1 mr-4 border-2 border-white bg-black"
              onClick={handleUserIconClick}
            >
              <Image
                src={isLogged ? iconUserGreen : iconUserRed}
                alt={
                  isLogged
                    ? 'Icône utilisateur connecté'
                    : 'Icône utilisateur non connecté'
                }
              />
            </button>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center">
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        >
          <ModalContent onSuccess={handleModalSuccess} />
        </Modal>
        <ConfirmDialog
          isOpen={showConfirm}
          title="Confirmation de déconnexion"
          message="Êtes-vous sûr de vouloir vous déconnecter ?"
          onConfirm={handleLogout}
          onCancel={cancelLogout}
        />
      </div>
    </div>
  );
};

export default ButtonUserUnlogged;
