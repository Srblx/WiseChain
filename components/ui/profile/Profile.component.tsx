'use client';

// Lib React
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Utils
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import dayjs from '@/utils/dayjs';

// Components
import { Button } from '@/components/shared/Button.components';
import InputProfile from '@/components/shared/Input.component';

// Enums
import Routes from '@/enums/routes.enum';

const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';

export const ProfileUser = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [country, setCountry] = useState('');
  const [birthOfDate, setBirthOfDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setPseudo(user.pseudo);
      setCountry(user.country);
      const formatDateOfBirth = dayjs(user.date_of_birth).format('DD/MM/YYYY');
      setBirthOfDate(formatDateOfBirth);
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
    setFirstname(firstname);
    setLastname(lastname);
    setPseudo(pseudo);
    setBirthOfDate(birthOfDate);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await ApiAxios.put(Routes.UPDATE_PROFIL_USER, {
        firstname,
        lastname,
        pseudo,
      });

      if (response.status === 200) {
        toast.success(SUCCESS_MESSAGES.UPDATE_PROFILE);
        setEditInfoUser(false);
      } else {
        toast.error(ERROR_MESSAGES.UPDATE_PROFILE);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.UPDATE_PROFILE);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 mt-6">
      <div className=" space-y-6  xs:flex xs:justify-center">
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
            Date de naissance
            <InputProfile
              type="text"
              placeholder="date de naissance"
              value={birthOfDate}
              className={'w-full bg-gray-500 text-white py-1 px-2 rounded-lg'}
              disabled={true}
            />
          </label>
          <label className={`${classNameLabel}`}>
            Pays
            <InputProfile
              type="text"
              placeholder="pays"
              value={country}
              className={'w-full bg-gray-500 text-white py-1 px-2 rounded-lg'}
              disabled={true}
            />
          </label>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className={'z-50'}
        />
      </div>
      <div className="flex justify-start items-center space-x-2 xs:flex xs:justify-center">
        <Button
          onClick={
            editInfoUser ? handleCancelEdit : () => setEditInfoUser(true)
          }
          className={`${editInfoUser ? 'bg-red-500' : 'bg-button'} py-2 px-3 rounded`}
        >
          {editInfoUser ? 'Annuler' : 'Modifier mon profil'}
        </Button>
        {editInfoUser && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-button rounded py-2 px-3"
          >
            {isSubmitting
              ? 'Enregistrement...'
              : 'Enregistrer mes informations'}
          </button>
        )}
      </div>
    </div>
  );
};
