'use client';

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Libs Next
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

//Helpers
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
            params: { category }
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
              <div
                className="lg:col-span-1 lg:row-span-2 bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                onClick={() =>
                  router.push(`/courses/detail-course/${courses[0].id}`)
                }
              >
                <div className="relative h-48 lg:h-[90%]">
                  <Image
                    src={courses[0].img ? `/img/${courses[0].img}` : '/img/logo.jpg'}
                    alt={courses[0].main_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-white font-semibold mb-2">
                    {courses[0].main_title}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    {courses[0].sequences.length} min de lecture
                  </p>
                </div>
              </div>
              {courses.slice(1, 3).map((course) => (
                <div
                  key={course.id}
                  className=" bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                  onClick={() =>
                    router.push(`/courses/detail-course/${course.id}`)
                  }
                >
                  <div className="relative h-48">
                    <Image
                      src={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
                      alt={course.main_title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="text-white font-semibold mb-2">
                      {course.main_title}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {course.sequences.length} min de lecture
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {courses.slice(3).map((course) => (
            <div
              key={course.id}
              className="bg-blueDark bg-opacity-3510 rounded-lg shadow-lg overflow-hidden flex flex-col"
              onClick={() => router.push(`/courses/detail-course/${course.id}`)}
            >
              <div className="relative h-48">
                <Image
                  src={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
                  alt={course.main_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-3">
                <h2 className="text-white font-semibold mb-2">
                  {course.main_title}
                </h2>
                <p className="text-gray-400 text-xs">
                  {course.sequences.length} min de lecture
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCoursesPage;
