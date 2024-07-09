'use client';

// Interfaces
import { Course } from '@/interfaces/course.interface';

// Libs Next
import { useParams } from 'next/navigation';

// Libs React
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Helpers
import { Button } from '@/components/shared/Button.components';
import axios from 'axios';

const CourseDetailPage = () => {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get('/api/courses/detail-course', {
            params: { id: courseId },
          });
          if (response.data && response.data.course) {
            setCourse(response.data.course);
          } else {
            console.error('Error fetching course:', response.data.error);
          }
        } catch (error) {
          console.error('Error fetching course:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourse();
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center">Aucun cours trouvé</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.main_title}</h1>
      <Image
        src={course.img || '/img/logo.jpg'}
        alt={course.main_title}
        width={1500}
        height={700}
        className="rounded-lg mb-4 shadow-xs-light"
      />
      <div className="text-lg">
        <p>{course.description}</p>
        <p className="mt-2 text-gray-400">
          {course.sequences.length} min de lecture
        </p>
      </div>
      <div className="bg-blueDark p-3 rounded-xl mt-6 mb-10">
        <h2 className="text-xl font-bold mb-4 pl-4 underline underline-offset-4">
          Sommaire
        </h2>
        <ul className="pl-4 list-none">
          {course.sequences.map((sequence) => (
            <li key={sequence.id} className="mb-2">
              <span className="text-secondary">-</span>{' '}
              <a
                href={`#${sequence.id}`}
                className="text-blue-300 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(sequence.id);
                  if (element) {
                    const offset = -100;
                    const elementPosition =
                      element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: elementPosition + offset,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {sequence.title}
              </a>
            </li>
          ))}
          <li>
            <span className="text-secondary">-</span>{' '}
            <a
              href="#conclusion"
              className="text-blue-300 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('conclusion');
                if (element) {
                  const offset = -100;
                  const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({
                    top: elementPosition + offset,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Outils utils
            </a>
          </li>
        </ul>
      </div>
      <div>
        {course.sequences.map((sequence) => (
          <div key={sequence.id} id={sequence.id} className="mb-8">
            <h3 className="text-2xl font-bold mb-4">{sequence.title}</h3>
            <p className="text-lg">{sequence.containt}</p>
            {sequence.img && (
              <div className="mt-4 flex justify-center items-center">
                <Image
                  src={sequence.img}
                  alt={`Image for sequence: ${sequence.title}`}
                  width={550}
                  height={350}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
        <div id="conclusion" className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Liste des outils</h3>
          <div className="space-x-4 flex flex-wrap justify-between">
            <Button
              onClick={() => {
                console.log('Outil 1');
              }}
            >
              Outil 1
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 2');
              }}
            >
              Outil 2
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 3');
              }}
            >
              Outil 3
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 4');
              }}
            >
              Outil 4
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 5');
              }}
            >
              Outil 5
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 6');
              }}
            >
              Outil 6
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 7');
              }}
            >
              Outil 7
            </Button>
            <Button
              onClick={() => {
                console.log('Outil 8');
              }}
            >
              Outil 8
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
