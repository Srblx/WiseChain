'use client';

// Components
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
} from '@/components/ui/dialog';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Interfaces
import { UserInfo } from '@/interfaces/auth/auth.interface';

// Utils
import dayjs from '@/utils/dayjs';
import ApiAxios from '@/utils/interceptorAxios.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Lib React
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// CSS classes
const classNameInputProfile = 'w-full bg-white text-black py-1 px-2 rounded-lg';
const classNameLabel = 'text-sm text-gray-400';

type UserInfoKeys =
  | 'firstname'
  | 'lastname'
  | 'pseudo'
  | 'country'
  | 'birthOfDate';

export const ProfileUser = () => {
  const [editInfoUser, setEditInfoUser] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    pseudo: '',
    country: '',
    birthOfDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, login, token } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setUserInfo({
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        country: user.country,
        birthOfDate: dayjs(user.date_of_birth).format('DD/MM/YYYY'),
      });
    }
  }, [user]);

  const handleEditInfoUser = () => {
    setEditInfoUser(!editInfoUser);
  };

  const handleInputChange =
    (field: UserInfoKeys) => (e: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCancelEdit = () => {
    setEditInfoUser(false);
    if (user) {
      setUserInfo({
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        country: user.country,
        birthOfDate: dayjs(user.date_of_birth).format('DD/MM/YYYY'),
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await ApiAxios.put(Routes.UPDATE_PROFIL_USER, {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        pseudo: userInfo.pseudo,
      });

      if (response.status === 200) {
        toast.success(SUCCESS_MESSAGES.UPDATE_PROFILE);
        setEditInfoUser(false);
        setIsDialogOpen(false);

        if (user) {
          const updatedUser = {
            ...user,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            pseudo: userInfo.pseudo,
          };
          login(updatedUser, token!);
        }
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
      <div className="space-y-2">
        <p>Nom: {userInfo.lastname}</p>
        <p>Prenom: {userInfo.firstname}</p>
        <p>Pseudo: {userInfo.pseudo}</p>
        <p>Anniversaire le {userInfo.birthOfDate}</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>
            Modifier mon profil
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Faites des modifications à votre profil ici. Cliquez sur
              enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {['firstname', 'lastname', 'pseudo', 'birthOfDate', 'country'].map(
              (field) => (
                <div
                  key={field}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={field} className="text-right">
                    {field === 'firstname'
                      ? 'Prénom'
                      : field === 'lastname'
                        ? 'Nom'
                        : field === 'pseudo'
                          ? 'Pseudo'
                          : field === 'birthOfDate'
                            ? 'Date de naissance'
                            : 'Pays'}
                  </Label>
                  <Input
                    id={field}
                    value={userInfo[field as UserInfoKeys]}
                    onChange={handleInputChange(field as UserInfoKeys)}
                    className={`col-span-3 p-2 ${field === 'birthOfDate' || field === 'country' ? 'bg-gray-950 text-white' : 'bg-white text-gray-950'}`}
                    placeholder={field}
                    disabled={field === 'birthOfDate' || field === 'country'}
                  />
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting
                ? 'Enregistrement...'
                : 'Enregistrer les modifications'}
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
