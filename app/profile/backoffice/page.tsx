"use client";

// Components
import GlossaryTable from '@/components/ui/backoffice/GlossaryTable.component';
import NavBackoffice from '@/components/ui/backoffice/NavBackoffice.component';
import UserTable from '@/components/ui/backoffice/UserTable.component';

// Enums
import Roles from '@/enums/roles.enum';
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { useState } from 'react';

const BackofficePage = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('users');

  if (!user || user.roles !== Roles.ADMIN || !token) {
    router.push(Routes.HOME);
    return null;
  }

  return (
    <div className="drawer lg:drawer-open h-screen w-full absolute top-0 left-0">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center mt-3">
        <div className="w-full h-full p-4">
          {currentPage === 'users' && <UserTable token={token} isAuthorized={true} />}
          {currentPage === 'glossary' && <GlossaryTable token={token} isAuthorized={true} />}
        </div>
      </div>
      <NavBackoffice setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default BackofficePage;
