'use client';

import { Course } from '@/interfaces/course.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CourseCarouselProps {
  courses: Course[];
  title: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ courses, title }) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <h2 className="text-sm md:text-xl font-bold mb-1">{title}</h2>
      <div className="carousel carousel-center bg-grayDark rounded-box w-full p-4 space-x-4 h-auto">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="carousel-item">
              <div
                className="relative w-48 h-36 md:w-72 md:h-64 cursor-pointer"
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
                  <h3 className="text-xs md:text-sm">{course.main_title}</h3>
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
};

export default CourseCarousel;
