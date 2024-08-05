'use client';

// Interfaces
import { Course, Tool } from '@/interfaces/course.interface';

// Libs Next
import { useParams, useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Components
import CourseCarousel from '@/components/carousel/CourseCarousel.component';
import { Button } from '@/components/shared/Button.components';
import ConfirmDialog from '@/components/shared/ConfirmDialog.component';
import CourseContent from '@/components/ui/course/CourseContent.component';
import CourseSummary from '@/components/ui/course/CourseSumary.component';

// Enums
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Helpers
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
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
  const [questionnaryExists, setQuestionnaryExists] = useState(false);

  useEffect(() => {
    if (courseId) {
      const fetchCourseAndRelated = async () => {
        try {
          const [courseResponse, relatedResponse] = await Promise.all([
            axios.get(Routes.GET_ONE_COURSE, { params: { id: courseId } }),
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

            try {
              const questionnaryResponse = await axios.get(Routes.QUESTIONNARY_API, {
                params: { courseId },
                headers: { Authorization: `Bearer ${token}` },
              });
              setQuestionnaryExists(!!questionnaryResponse.data.questions);
            } catch (questionnaryError) {
              if (axios.isAxiosError(questionnaryError) && questionnaryError.response?.status === 404) {
                setQuestionnaryExists(false);
              } else {
                console.error(ERROR_MESSAGES.ERROR_FETCHING_QUESTIONNARY, questionnaryError);
              }
            }
          }
        } catch (error) {
          console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourseAndRelated();
    }
  }, [courseId, token]);

  const handleNavigation = () => {
    if (token) {
      router.push(`${Routes.QUESTIONNARY}?courseId=${courseId}`);
    } else {
      const modal = document.getElementById(
        'login-required'
      ) as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center">Aucun cours trouvé</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <CourseSummary course={course} />
      <CourseContent sequences={course.sequences} tools={tools} />
      {questionnaryExists && (
        <div className="flex justify-center items-center w-full mb-6">
          <Button
            onClick={handleNavigation}
            className="bg-secondary rounded-md py-2 px-4 text-black text-lg"
            id='questionnary-button'
          >
            {token !== null 
          ? `Tester ma compréhension du cours : ${course.main_title}`
          : 'Connectez-vous/Inscrivez-vous pour tester votre compréhension du cours en répondant au questionnaire.'}
      
          </Button>
        </div>
      )}
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

export default CourseDetailPage;
