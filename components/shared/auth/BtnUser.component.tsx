'use client';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { useState } from 'react';

// Icons
import { FaUser } from 'react-icons/fa';

// Components
import Modal from '@/components/ui/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';
import { Button } from '../Button.components';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth.hook';


const ButtonUserUnlogged = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useState(false);
  const [showConfirm, toggleConfirm] = useState(false);
  const { token, logout, user } = useAuth();
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

  const avatarSrc = isLogged && user?.img ? user.img : 'https://github.com/shadcn.png';

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center space-x-1">
          <div className="ml-4">
          <Button
              id="btn-user"
              className="rounded-full p-2 mr-6 border-2 border-white bg-black"
              onClick={handleUserIconClick}
            >
              {isLogged ? (
                <Avatar>
                  <AvatarImage src={avatarSrc} alt="@shadcn" />
                </Avatar>
              ) : (
                <FaUser color="red" size={'30px'} className="p-1" />
              )}
            </Button>
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
      </div>
    </div>
  );
};

export default ButtonUserUnlogged;
