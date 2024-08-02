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
import axios from 'axios';

const CourseDetailPage = () => {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [courseRelatedCategory, setCourseRelatedCategory] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (courseId) {
      const fetchCourseAndRelated = async () => {
        try {
          const [courseResponse, relatedResponse] = await Promise.all([
            axios.get(Routes.GET_ONE_COURSE, { params: { id: courseId } }),
            axios.get(Routes.GET_RELATED_COURSES, { params: { id: courseId } }),
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

  const handleNavigation = () => {
    if (token) {
      router.push(`${Routes.QUESTIONARY}?courseId=${courseId}`);
    } else {
      const modal = document.getElementById('login-required') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />
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
      <div className="flex justify-center items-center w-full mb-6">
        <Button
          onClick={handleNavigation}
          className="bg-secondary rounded-md py-2 px-4 text-black text-lg"
        >
          Tester ma compréhension du cours : {course.main_title}
        </Button>
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

export default CourseDetailPage;