# [À faire]

Faire un composant pour les boutons outils 

Faire une nouvelle table sequence articles pour affiche de la meilleur maniere visuel les articles 

voir animation dev slack 

# [Dependancies]

<!--? Front dependancies -> -->

### npx create-next-app@latest wisechain --typescript --eslint

### npm i -D autoprefixer

### npm i @tailwindcss/typography daisyui -D

### npm install --save-dev prettier

### npm i -D daisyui@latest

### npx shadcn-ui@latest init

### npm i react-icons --save

npm i yup
npm i react-icons --save

npm install jsonwebtoken dotenv
npm install --save-dev @types/jsonwebtoken

npm install react-daisyui

<!--* Back dependancies ->  -->

npm i next-auth
npm i prisma --save-dev
npm i @prisma/client
npm i @next-auth/prisma-adapter  
npm migrate dev
npx prisma migrate dev --name sync-schema 
npx prisma generate
npm studio  
npm install --save-dev cypress
npm run cypress:open
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest

<!--^  Config -->

npm install --save-dev eslint-config-airbnb-typescript  
npm install --save-dev eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
npm install prettier --save-dev  
npm uninstall eslint-plugin-prettier prettier
npm install eslint-plugin-prettier prettier --save-dev



'use client';

import { Button } from '@/components/shared/Button.components';
import Input from '@/components/shared/Input.component';
import Label from '@/components/shared/Label.component';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Routes from '@/enums/routes.enum';
import useAuth from '@/hooks/useAuth.hook';
import dayjs from '@/utils/dayjs';
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        setIsDialogOpen(false);
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <p>Nom: {user?.lastname}</p>
          <p>Prenom: {user?.firstname}</p>
          <p>Pseudo: {user?.pseudo}</p>
          <p>Anniversaire le {user?.date_of_birth}</p>
          <Button onClick={() => setIsDialogOpen(true)}>Modifier mon profil</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Faites des modifications à votre profil ici. Cliquez sur enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input id="name" value={firstname} onChange={handlefirstnameChange} className="col-span-3" placeholder="firstname"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Prénom
              </Label>
              <Input id="lastname" value={lastname} onChange={handleLastnameChange} className="col-span-3" placeholder="lastname"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Pseudo
              </Label>
              <Input id="username" value={pseudo} onChange={handlePseudoChange} className="col-span-3" placeholder="pseudo"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthOfDate" className="text-right">
                Date de naissance
              </Label>
              <Input id="birthOfDate" value={birthOfDate} className="col-span-3" disabled placeholder="date de naissance"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Pays
              </Label>
              <Input id="country" value={country} className="col-span-3" disabled placeholder="pays"/>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  );
};