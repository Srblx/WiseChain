'use client';

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Libs Next
import { useParams, useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

//Helpers
import FlipCardOne from '@/components/animate/card/FilpCardOne.component';
import FlipCard from '@/components/animate/card/FlipCard.component';
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
          const response = await axios.get(`/api/courses/all-courses`, {
            params: { category },
          });
          if (response.data && response.data.course) {
            setCourses(response.data.course);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourses();
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">{category}</h1>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.length > 0 && (
            <>
              <FlipCardOne
                image={
                  courses[0].img ? `/img/${courses[0].img}` : '/img/logo.jpg'
                }
                title={courses[0].main_title}
                description={courses[0].description}
                sequenceCount={`${courses[0].sequences.length} min de lecture`}
                onClick={() =>
                  router.push(`/courses/detail-course/${courses[0].id}`)
                }
                isLarge={true}
                rotate="y"
              />
              {courses.slice(1, 3).map((course) => (
                <FlipCardOne
                  key={course.id}
                  image={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
                  title={course.main_title}
                  description={course.description}
                  sequenceCount={`${course.sequences.length} min de lecture`}
                  onClick={() =>
                    router.push(`/courses/detail-course/${course.id}`)
                  }
                  rotate="y"
                />
              ))}
            </>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {courses.slice(3).map((course) => (
            <FlipCard
              description={course.description}
              image={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
              rotate="y"
              subtitle={`${course.sequences.length} min de lecture`}
              title={course.main_title}
              onClick={() => router.push(`/courses/detail-course/${course.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCoursesPage;
