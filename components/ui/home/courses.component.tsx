'use client';

// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import CourseCarousel from '@/components/shared/carousel/CourseCarousel.component';

// Enums
import Routes from '@/enums/routes.enum';

// Utils
import { ERROR_MESSAGES_FR } from '@/utils/messages.utils';

// Helpers
import axios from 'axios';

// Libs React
import { useEffect, useState } from 'react';

function CourseList() {
  const [courses, setCourses] = useState({
    Investissement: [],
    'Crypto-monnaie': [],
    Blockchain: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(Routes.GET_LAST_SIX_COURSES);
        setCourses(response.data);
      } catch (error) {
        console.error(ERROR_MESSAGES_FR.ERROR_FETCHING_COURSE, error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <CourseCarousel
        courses={courses.Investissement}
        title="Guide Investissement"
      />
      <CourseCarousel
        courses={courses['Crypto-monnaie']}
        title="Guide Crypto-monnaie"
      />
      <CourseCarousel courses={courses.Blockchain} title="Guide Blockchain" />
    </div>
  );
}

export default CourseList;
