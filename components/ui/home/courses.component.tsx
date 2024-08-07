'use client';

import CourseCarousel from '@/components/carousel/CourseCarousel.component';
import Routes from '@/enums/routes.enum';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
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
        console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
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
