'use client';

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Components
import CardCourse from '@/components/card/CardCourse.component';

// Libs Next
import { useParams, useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Enums
import Routes from '@/enums/routes.enum';

// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import axios from 'axios';

const CategoryCoursesPage = () => {
  const params = useParams();
  const category = params.slug as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(Routes.GET_ALL_COURSES, {
            params: { category },
          });
          if (response.data && response.data.course) {
            setCourses(response.data.course);
          }
        } catch (error) {
          console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourses();
    }
  }, [category]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const [firstThreeCourses, remainingCourses] =
    courses.length >= 3
      ? [courses.slice(0, 3), courses.slice(3)]
      : [courses, []];

  return (
    <div>
      <h1 className="text-3xl mb-4">{category}</h1>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 cursor-pointer">
          {firstThreeCourses.map((course, index) => (
            <CardCourse
              id={course.id}
              key={course.id}
              description={course.description}
              image={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
              sequence={`${course.sequences.length} min de lecture`}
              title={course.mainTitle}
              className={index === 0 ? 'lg:row-span-2' : ''}
              isMainCard={index === 0}
              isLarge={index > 0}
              onClick={() => router.push(`/courses/detail-course/${course.id}`)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gird-cols-4 gap-6 mt-6">
          {remainingCourses.map((course) => (
            <CardCourse
              id={"key"}
              key={course.id}
              description={course.description}
              image={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
              sequence={`${course.sequences.length} min de lecture`}
              title={course.mainTitle}
              isLarge={true}
              onClick={() => router.push(`/courses/detail-course/${course.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCoursesPage;
