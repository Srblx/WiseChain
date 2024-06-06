'use client';

import { Button } from '@/components/shared/Button.components';
import { CompteUser } from '@/components/shared/profile/Compte.component';
import { ConditionOfUse } from '@/components/shared/profile/Condition.component';
import { DashboardUser } from '@/components/shared/profile/Dashboard.component';
import { ProfileUser } from '@/components/shared/profile/Profile.component';
import { RecompenseUser } from '@/components/shared/profile/Recompense.component';
import Image from 'next/image';
import { useState } from 'react';

const classNameLink = 'cursor-pointer hover:text-tertiary';

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardUser />;
      case 'profile':
        return <ProfileUser />;
      case 'recompense':
        return <RecompenseUser />;
      case 'condition':
        return <ConditionOfUse />;
      case 'compte':
        return <CompteUser />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-96 z-0">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-black underline uppercase">
            Informations et Paramètres 
          </h1>
          <Button
            
            onClick={() => console.log('click')}
          >
            Backoffice
          </Button>
        </div>
        <div className="divider"></div>
      </div>
      <div className="flex w-full">
        <div className="grid flex-grow place-items-center">
          <Image src="/img/pfp.png" alt="logo" width={150} height={100} />
          <ul className="space-y-4 mt-5">
            <li>
              <a onClick={() => setActiveComponent('dashboard')} className={`${classNameLink}`}>Dashboard</a>
            </li>
            <li>
              <a onClick={() => setActiveComponent('profile')} className={`${classNameLink}`}>Profile</a>
            </li>
            <li>
              <a onClick={() => setActiveComponent('recompense')} className={`${classNameLink}`}>Récompense</a>
            </li>
            <li>
              <a onClick={() => setActiveComponent('condition')} className={`${classNameLink}`}>
                Condition d'utilisation
              </a>
            </li>
            <li>
              <a onClick={() => setActiveComponent('compte')} className={`${classNameLink}`}>Compte</a>
            </li>
          </ul>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow w-[50%]">
          <h3 className="text-start text-lg underline">Mon Profil</h3>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
