'use client';
// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Axios
import axios from 'axios';

// Libs Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

function CourseList() {
  const [courses, setCourses] = useState({
    Investissement: [],
    'Crypto-monnaie': [],
    Blockchain: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(Routes.GET_LAST_SIX_COURSES);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses: 4', error);
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

  const renderCarousel = (courses: Course[], title: string) => (
    <div className="mb-8" key={title}>
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      <div className="carousel carousel-center bg-grayDark rounded-box w-full p-4 space-x-4 h-auto">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="carousel-item">
              <div
                className="relative w-72 h-64 cursor-pointer"
                onClick={() =>
                  router.push(`/courses/detail-course/${course.id}`)
                }
              >
                <Image
                  src={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
                  alt={course.main_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-box"
                  sizes="(min-width: 720px) 50vw, 100vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blueDark bg-opacity-80 text-white p-2 rounded-bl-box rounded-br-box">
                  <h3 className="text-sm">{course.main_title}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun cours trouvé</p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {renderCarousel(courses.Investissement, 'Guide Investissement')}
      {renderCarousel(courses['Crypto-monnaie'], 'Guide Crypto-monnaie')}
      {renderCarousel(courses.Blockchain, 'Guide Blockchain')}
    </div>
  );
}

export default CourseList;
