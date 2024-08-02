// Interfaces
import { Course } from '@/interfaces/course.interface';

// Next Libs
import Image from 'next/image';

interface CourseSummaryProps {
  course: Course;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({ course }) => {
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return 'text-green-600';
      case 'Technique':
        return 'text-orange-600';
      case 'Complexe':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="text-lg">
      <h1 className="text-3xl font-bold mb-4">{course.main_title}</h1>
      <Image
        src={course.img ? `/img/${course.img}` : '/img/logo.jpg'}
        alt={course.main_title}
        width={1500}
        height={700}
        className="rounded-lg mb-4 shadow-xs-light"
      />
      <p>{course.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-400 text-sm md:text-base">
          {course.sequences.length} min de lecture
        </p>
        <div className="space-x-2 flex">
          <div className="badge badge-info badge-outline text-sm md:text-base p-4">
            {course.category.name}
          </div>
          <div
            className={`badge badge-outline text-sm md:text-base p-4 ${getDifficultyClass(course.difficulty)}`}
          >
            {course.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;
