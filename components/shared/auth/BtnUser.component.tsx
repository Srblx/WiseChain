'use client';
import { FaUser } from 'react-icons/fa';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { useState } from 'react';

// Icons

// Components
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import Modal from '@/components/ui/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';
import Routes from '@/enums/routes.enum';
import useAuth from '@/hooks/useAuth.hook';
// import dynamic from 'next/dynamic';

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
    router.push(Routes.HOME);
  };

  const cancelLogout = () => {
    toggleConfirm(false);
  };

  const handleUserIconClick = () => {
    if (isLogged) {
      router.push(Routes.PROFILE);
    } else {
      toggleModal(true);
    }
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center space-x-1">
          <div className="ml-4">
            <button
              id="btn-user"
              className="rounded-full p-1 mr-4 border-2 border-white bg-black"
              onClick={handleUserIconClick}
            >
              <FaUser
                color={isLogged ? '#48f309' : 'red'}
                size={'30px'}
                className="p-1"
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
