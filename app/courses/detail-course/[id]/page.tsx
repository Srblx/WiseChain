'use client';

// Interfaces
import { Course, Tool } from '@/interfaces/course.interface';

// Libs Next
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Components
import CourseCarousel from '@/components/carousel/CourseCarousel.component';
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Helpers
import axios from 'axios';

const CourseDetailPage = () => {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [courseRelatedCategory, setCourseRelatedCategory] = useState<Course[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (courseId) {
      const fetchCourseAndRelated = async () => {
        try {
          const [courseResponse, relatedResponse] = await Promise.all([
            axios.get(Routes.GET_ONE_COURSE, {
              params: { id: courseId },
            }),
            axios.get(Routes.GET_RELATED_COURSES, {
              params: { id: courseId },
            }),
          ]);
          if (
            courseResponse.data &&
            courseResponse.data.course &&
            relatedResponse.data &&
            relatedResponse.data.courses
          ) {
            setCourse(courseResponse.data.course);
            setTools(courseResponse.data.tools || []);
            setCourseRelatedCategory(relatedResponse.data.courses || []);
          }
        } catch (error) {
          console.error('Error fetching course data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourseAndRelated();
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center">Aucun cours trouvé</div>
    );
  }

  const handleNavigation = () => {
    if (token) {
      router.push(Routes.QUESTIONARY);
    } else {
      const modal = document.getElementById(
        'login-required'
      ) as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  const getDifficultyClass = (difficulty: String) => {
    switch (difficulty) {
      case 'Facile':
        return 'text-green-600';
      case 'Technique':
        return 'text-orange-600';
      case 'Complexe':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.main_title}</h1>
      <Image
        src={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
        alt={course.main_title}
        width={1500}
        height={700}
        className="rounded-lg mb-4 shadow-xs-light"
      />
      <div className="text-lg">
        <p>{course.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400 text-sm md:text-base">
            {course.sequences.length} min de lecture
          </p>
          <div className="space-x-2 flex">
            <div className="badge badge-info badge-outline text-sm md:text-base">
              {course.category.name}
            </div>
            <div
              className={`badge badge-outline text-sm md:text-base ${getDifficultyClass(course.difficulty)}`}
            >
              {course.difficulty}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blueDark p-3 rounded-lg mt-6 mb-10">
        <h2 className="text-xl font-bold mb-4 pl-4 underline underline-offset-4">
          Sommaire
        </h2>
        <ul className="pl-4 list-none">
          {course.sequences.map((sequence) => (
            <li key={sequence.id} className="mb-2">
              <span className="text-secondary">-</span>{' '}
              <a
                href={`#${sequence.id}`}
                className="text-blue-300 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(sequence.id);
                  if (element) {
                    const offset = -100;
                    const elementPosition =
                      element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: elementPosition + offset,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {sequence.title}
              </a>
            </li>
          ))}
          <li>
            <span className="text-secondary">-</span>{' '}
            <a
              href="#conclusion"
              className="text-blue-300 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('conclusion');
                if (element) {
                  const offset = -100;
                  const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({
                    top: elementPosition + offset,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Outils utils
            </a>
          </li>
        </ul>
      </div>
      <div>
        {course.sequences.map((sequence) => (
          <div key={sequence.id} id={sequence.id} className="mb-8">
            <h3 className="text-2xl font-bold mb-4">{sequence.title}</h3>
            <p className="text-lg">{sequence.containt}</p>
            {sequence.img && (
              <div className="mt-4 flex justify-center items-center">
                <Image
                  src={sequence.img ? `/img/${sequence.img}` : '/img/logo.jpg'}
                  alt={`Image for sequence: ${sequence.title}`}
                  width={550}
                  height={350}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
        {tools.length > 0 && (
          <div id="conclusion" className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Liste des outils</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  onClick={() => {
                    const newWindow = window.open(
                      tool.link,
                      '_blank',
                      'noopener,noreferrer'
                    );
                    if (newWindow) newWindow.opener = null;
                  }}
                  className="flex flex-col items-center justify-center p-2 h-auto bg-button rounded-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Image
                      src={`/img/${tool.img}`}
                      alt={tool.name}
                      width={30}
                      height={30}
                    />
                    <span className="text-center">{tool.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center w-full mb-6">
          <Button
            onClick={handleNavigation}
            className="bg-secondary rounded-md py-2 px-4 text-black text-lg"
          >
            Tester ma compréhension du cours : {course.main_title}
          </Button>
        </div>
      </div>
      {!isLoading && course && (
        <CourseCarousel
          courses={courseRelatedCategory}
          title={`Plus de cours en ${course.category.name} à découvrir`}
        />
      )}
      <ConfirmDialog
        id="login-required"
        title="Connexion requise"
        message="Vous devez être connecté pour répondre au questionnaire."
        choice="Fermer"
      />
    </div>
  );
};

//! education financier

export default CourseDetailPage;
