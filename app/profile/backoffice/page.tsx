'use client';

import { Button } from '@/components/shared/Button.components';
// Components
import CourseTable from '@/components/ui/backoffice/table/CourseTable.component';
import UserTable from '@/components/ui/backoffice/table/UserTable.component';

// Enums
import Roles from '@/enums/roles.enum';
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Next Libs
import { useRouter } from 'next/navigation';

// React Libs
import { useEffect, useState } from 'react';

//CSS class

const classNameButtonActive = 'active border-t-4 border-orange-600';

const BackofficePage = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTable, setActiveTable] = useState('users');

  useEffect(() => {
    if (user) {
      if (user.roles === Roles.ADMIN && user.is_verified) {
        setIsAuthorized(true);
      } else {
        router.push(Routes.HOME);
      }
    } else {
      router.push(Routes.HOME);
    }
  }, [user, router]);

  if (!isAuthorized) return null;

  return (
    <>
      {activeTable === 'users' && <UserTable token={token!} />}
      {activeTable === 'courses' && <CourseTable token={token!} />}
      {/* Ajoutez d'autres tableaux selon les besoins */}

      <div className="btm-nav">
        {[
          { table: 'users', label: 'Utilisateur', bgColor: 'bg-blue-700' },
          { table: 'courses', label: 'Cours', bgColor: 'bg-blue-600' },
          { table: 'sequences', label: 'Séquences Cours', bgColor: 'bg-blue-500' },
          { table: 'tools', label: 'Outils', bgColor: 'bg-blue-400' },
          {
            table: 'questionnaires',
            label: 'Questionnaire',
            bgColor: 'bg-blue-300',
          },
          { table: 'articles', label: 'Articles', bgColor: 'bg-blue-200' },
          {
            table: 'articlesSequences',
            label: 'Séquences Articles',
            bgColor: 'bg-blue-100',
          },
        ].map(({ table, label, bgColor }) => (
          <Button
            key={table}
            className={`${bgColor} text-black ${activeTable === table ? classNameButtonActive : ''}`}
            onClick={() => setActiveTable(table)}
          >
            <span className="btm-nav-label">{label}</span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default BackofficePage;
