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

<!--! Arborencense  -->

nextjs-project/
├── app/
│ ├── (admin)/
│ │ ├── users/
│ │ │ ├── page.tsx
│ │ │ └── [...slug]/page.tsx
│ │ └── ...
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── ...
│ └── ...
├── components/
│ ├── auth/
│ │ ├── LoginForm.tsx
│ │ └── ...
│ ├── ui/
│ │ ├── Button.tsx
│ │ └── ...
│ └── ...
├── hooks/
│ ├── useAuth.ts
│ └── ...
├── \_services/
│ ├── authService.ts
│ └── ...
├── \_lib/
│ ├── utils.ts
│ └── ...
├── styles/
│ ├── globals.css
│ └── ...
├── utils/
│ ├── helpers.ts
│ └── ...
└── ...


'use client';

import { Button } from '@/components/shared/Button.components';
import { CompteUser } from '@/components/ui/profile/Compte.component';
import { DashboardUser } from '@/components/ui/profile/Dashboard.component';
import { ProfileUser } from '@/components/ui/profile/Profile.component';
import { RecompenseUser } from '@/components/ui/profile/Recompense.component';
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
      case 'compte':
        return <CompteUser />;
      default:
        return null;
    }
  };

  return (
    <div className="z-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-black underline uppercase">
            Informations et Paramètres
          </h1>
          <Button onClick={() => console.log('click')}>Backoffice</Button>
        </div>
        <div className="divider"></div>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <Image src="/img/pfp.png" alt="logo" width={150} height={100} />
          <ul className="space-y-4 mt-5">
            <li>
              <a
                onClick={() => setActiveComponent('dashboard')}
                className={`${classNameLink}`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('profile')}
                className={`${classNameLink}`}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('recompense')}
                className={`${classNameLink}`}
              >
                Récompense
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent('compte')}
                className={`${classNameLink}`}
              >
                Compte
              </a>
            </li>
          </ul>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex-grow lg:w-2/3">
          <h3 className="text-start text-lg underline">Mon Profil</h3>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
