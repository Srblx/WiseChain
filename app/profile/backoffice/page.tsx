'use client';

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
      {/* Ajoutez d'autres tableaux ici selon vos besoins */}
      {/* Exemple: {activeTable === 'sequences' && <SequenceTable token={token!} />} */}

      <div className="btm-nav">
        <button
          className={`bg-blue-700 text-black ${activeTable === 'users' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('users')}
        >
          <span className="btm-nav-label">Utilisateur</span>
        </button>
        <button
          className={`bg-blue-600 text-black ${activeTable === 'courses' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('courses')}
        >
          <span className="btm-nav-label">Cours</span>
        </button>
        <button
          className={`bg-blue-500 text-black ${activeTable === 'sequences' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('sequences')}
        >
          <span className="btm-nav-label">Séquences</span>
        </button>
        <button
          className={`bg-blue-400 text-black ${activeTable === 'tools' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('tools')}
        >
          <span className="btm-nav-label">Outils</span>
        </button>
        <button
          className={`bg-blue-300 text-black ${activeTable === 'questionnaires' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('questionnaires')}
        >
          <span className="btm-nav-label">Questionnaire</span>
        </button>
        <button
          className={`bg-blue-200 text-black ${activeTable === 'articles' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('articles')}
        >
          <span className="btm-nav-label">Articles</span>
        </button>
        <button
          className={`bg-blue-100 text-black ${activeTable === 'anotherSequences' ? `${classNameButtonActive}` : ''}`}
          onClick={() => setActiveTable('anotherSequences')}
        >
          <span className="btm-nav-label">Séquences</span>
        </button>
      </div>
    </>
  );
};

export default BackofficePage;