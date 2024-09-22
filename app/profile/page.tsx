'use client';

// Components
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import MinioImage from '@/components/shared/ImgMinio.component';
import Modal from '@/components/shared/Modal.component';
import ModalContent from '@/components/ui/auth/ModalContent.component';
import UserProfile from '@/components/ui/profile/CompteUser.component';
import { DashboardUser } from '@/components/ui/profile/Dashboard.component';
import { RecompenseUser } from '@/components/ui/profile/Recompense.component';

// Enums
import Roles from '@/enums/roles.enum';
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES_FR } from '@/utils/messages.utils';

// Libs Next
import { useRouter } from 'next/navigation';

// libs React
import { useEffect, useState } from 'react';

const classNameLink = 'cursor-pointer hover:text-tertiary';

const Profile = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [showConfirm, toggleConfirm] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const { logout, user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState('/img/noDB/pfp.png');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user?.profile_img) {
      setProfileImage(user.profile_img);
    }
  }, [user]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardUser />;
      case 'profile':
        return <UserProfile />;
      case 'recompense':
        return <RecompenseUser />;
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

  const handleLogout = () => {
    logout();
    toggleConfirm(false);
    router.push(Routes.HOME);
  };

  const cancelLogout = () => {
    toggleConfirm(false);
  };

  const handleNavigateBackoffice = () => {
    router.push(Routes.BACKOFFICE);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('token');

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('mimetype', file.type);

    try {
      const response = await ApiAxios.post(
        Routes.ADD_PFP,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        const imageKey = response.data.imageKey;
        
        setProfileImage(imageKey);
        if (user) {
          setUser({ ...user, profile_img: imageKey });
        }
      } else {
        console.error(ERROR_MESSAGES_FR.ERROR_UPDATE_PICTURES);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsUploading(false);
    }
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
            className="bg-red-600 p-3 rounded-lg"
            onClick={() =>
              (
                document.getElementById('logout-account') as HTMLDialogElement
              )?.showModal()
            }
          >
            Se Déconnecter
          </Button>
          {user?.roles === Roles.ADMIN && user?.is_verified === true && (
            <Button onClick={handleNavigateBackoffice}>Backoffice</Button>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col lg:flex-row w-full flex-grow">
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <MinioImage
            imageKey={user?.profile_img || profileImage}
            alt="Profile"
            width={200}
            height={150}
            className="blur-sm hover:blur-none duration-300 transition-all"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
          <ul className="space-y-4 mt-5">
            <Button
              onClick={() =>
                document.getElementById('profile-image-upload')?.click()
              }
              disabled={isUploading}
            >
              <p className='text-sm'>{isUploading ? 'Chargement...' : 'Changer la photo de profil'}</p>
            </Button>
            <li>
              <a
                onClick={() => setActiveComponent('dashboard')}
                className={classNameLink}
                id="dashboard-link"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('profile')}
                className={classNameLink}
                id="profile-link"
              >
                Profile utilisateur
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('recompense')}
                className={classNameLink}
                id="recompense-link"
              >
                Récompense
              </a>
            </li>
          </ul>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex-grow lg:w-2/3">
          <h3 className="text-start text-lg underline flex lg:justify-start justify-center">
            Mon Profil
          </h3>
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
