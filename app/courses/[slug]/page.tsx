"use client";

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Libs Next
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

const CategoryCoursesPage = () => {
  const params = useParams();
  const category = params.slug as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (category) {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`/api/courses/allCourses?category=${category}`);
          const data = await response.json();
          if (!data.error && data.course) {
            setCourses(data.course);
          }
          console.log('data:', data);
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
    return <div className='flex justify-center items-center'><progress className="progress w-56"></progress></div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">{category}</h1>
      <div className="min-h-screen p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={course.img || '/img/placeholder.jpg'}
                  alt={course.main_title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
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
