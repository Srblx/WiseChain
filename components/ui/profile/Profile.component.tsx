'use client';

// Lib React
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Utils
import ApiAxios from '@/_utils/interceptorAxios.utils';

// Components
import InputProfile from '../../shared/Input.component';

const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';

export const ProfileUser = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setPseudo(user.pseudo);
      setCountry(user.country);
    }
  }, [user]);

  const handleEditInfoUser = () => {
    setEditInfoUser(!editInfoUser);
  };

  const handlefirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handlePseudoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditInfoUser(false);
    setFirstname('');
    setLastname('');
    setPseudo('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await ApiAxios.put('/api/userProfile/updateUserData', {
        firstname,
        lastname,
        pseudo,
      });
      
      if (response.status === 200) {
        toast.success('Profil modifié avec succès');
        setEditInfoUser(false);
      } else {
        toast.error(
          'Une erreur est survenue lors de la modification du profil'
        );
      }
    } catch (error) {
      console.error('Erreur lors de la modification du profil :', error);
      toast.error('Une erreur est survenue lors de la modification du profil');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 mt-6">
      <div className=" space-y-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col space-y-6"
        >
          <label className={`${classNameLabel}`}>
            {' '}
            Nom
            <InputProfile
              type="text"
              placeholder="firstname"
              value={firstname}
              onChange={handlefirstnameChange}
              className={`${classNameInputProfile}`}
              disabled={!editInfoUser}
            />
          </label>
          <label className={`${classNameLabel}`}>
            Prénom
            <InputProfile
              type="text"
              placeholder="lastname"
              value={lastname}
              onChange={handleLastnameChange}
              className={`${classNameInputProfile}`}
              disabled={!editInfoUser}
            />
          </label>
          <label className={`${classNameLabel}`}>
            Pseudo
            <InputProfile
              type="text"
              placeholder="pseudo"
              value={pseudo}
              onChange={handlePseudoChange}
              className={`${classNameInputProfile}`}
              disabled={!editInfoUser}
            />
          </label>
          <label className={`${classNameLabel}`}>
            Pays
            <InputProfile
              type="text"
              placeholder="country"
              value={country}
              className={'w-full bg-gray-500 text-white py-1 px-2 rounded-lg'}
              disabled={true}
            />
          </label>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={
            editInfoUser ? handleCancelEdit : () => setEditInfoUser(true)
          }
          className={`${editInfoUser ? 'bg-red-500' : 'bg-button'} border-2 rounded py-1 px-2`}
        >
          {editInfoUser ? 'Annuler' : 'Modifier mon profil'}
        </button>
        {editInfoUser && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-button border-2 rounded py-1 px-2"
          >
            {isSubmitting
              ? 'Enregistrement...'
              : 'Enregistrer le nouveau mot de passe'}
          </button>
        )}
      </div>
    </div>
  );
};
