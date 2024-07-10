'use client';

// Components
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import Modal from '@/components/shared/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';
import { CompteUser } from '@/components/ui/profile/Compte.component';
import { DashboardUser } from '@/components/ui/profile/Dashboard.component';
import { ProfileUser } from '@/components/ui/profile/Profile.component';
import { RecompenseUser } from '@/components/ui/profile/Recompense.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Libs Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// libs React
import { useState } from 'react';

const classNameLink = 'cursor-pointer hover:text-tertiary';

const Profile = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [showConfirm, toggleConfirm] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const { logout } = useAuth();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardUser />;
      case 'profile':
        return <ProfileUser />;
      case 'recompense':
        return <RecompenseUser />;
      case 'compte':
        return <CompteUser />;
      default:
        return null;
    }
  };

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

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full">
        <h1 className="text-lg font-black underline uppercase">
          Informations et Paramètres
        </h1>
        <div className="flex space-x-2 mt-4 lg:mt-0">
          <Button
            id="btn-logout"
            className="bg-red-600 p-1 rounded-lg"
            onClick={() =>
              (
                document.getElementById('logout-account') as HTMLDialogElement
              )?.showModal()
            }
          >
            Se Déconnecter
          </Button>
          <Button onClick={() => console.log('click')}>Backoffice</Button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col lg:flex-row w-full flex-grow">
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <Image
            src="/img/pfp.png"
            alt="logo"
            width={150}
            height={100}
            className="blur-sm hover:blur-none duration-300 transition-all"
          />
          <ul className="space-y-4 mt-5">
            <li>
              <a
                onClick={() => setActiveComponent('dashboard')}
                className={classNameLink}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('profile')}
                className={classNameLink}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('recompense')}
                className={classNameLink}
              >
                Récompense
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('compte')}
                className={classNameLink}
              >
                Compte
              </a>
            </li>
          </ul>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex-grow lg:w-2/3">
          <h3 className="text-start text-lg underline flex lg:justify-start justify-center">Mon Profil</h3>
          {renderComponent()}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        >
          <ModalContent onSuccess={handleModalSuccess} />
        </Modal>
        <ConfirmDialog
          id="logout-account"
          title="Confirmation de déconnexion"
          message="Êtes-vous sûr de vouloir vous déconnecter ?"
          onConfirm={handleLogout}
          onCancel={cancelLogout}
        />
      </div>
    </div>
  );
};

export default Profile;
