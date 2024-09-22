// Components
import { Button } from '@/components/shared/Button.components';

// Interfaces
import { Sequence, Tool } from '@/interfaces/course.interface';

// Next Libs
import Image from 'next/image';

interface CourseContentProps {
  sequences: Sequence[];
  tools: Tool[];
}

const containsHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str);

const CourseContent: React.FC<CourseContentProps> = ({ sequences, tools }) => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = -100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <div className="bg-blueDark p-3 rounded-lg mt-6 mb-10">
        <h2 className="text-xl font-bold mb-4 pl-4 underline underline-offset-4">
          Sommaire
        </h2>
        <ul className="pl-4 list-none">
          {sequences.map((sequence) => (
            <li key={sequence.id} className="mb-2">
              <span className="text-secondary">-</span>{' '}
              <a
                href={`#${sequence.id}`}
                className="text-blue-300 hover:underline"
                onClick={(e) => handleScroll(e, sequence.id)}
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
              onClick={(e) => handleScroll(e, 'conclusion')}
            >
              Outils utiles
            </a>
          </li>
        </ul>
      </div>
      {sequences.map((sequence) => (
        <div key={sequence.id} id={sequence.id} className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{sequence.title}</h3>
          {containsHTML(sequence.containt) ? (
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: sequence.containt }}
            />
          ) : (
            <p className="text-lg">{sequence.containt}</p>
          )}
          {sequence.img && (
            <div className="mt-4 flex justify-center items-center">
              <Image
                src={sequence.img ? `/img/${sequence.img}` : '/img/logo.jpg'}
                alt={`Image for sequence: ${sequence.title}`}
                width={550}
                height={350}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
      {tools.length > 0 && (
        <div id="conclusion" className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Liste des outils</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                onClick={() => {
                  const newWindow = window.open(
                    tool.link,
                    '_blank',
                    'noopener,noreferrer'
                  );
                  if (newWindow) newWindow.opener = null;
                }}
                className="flex flex-col items-center justify-center p-2 h-auto bg-button rounded-lg"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Image
                    src={`/img/${tool.img}`}
                    alt={tool.name}
                    width={30}
                    height={30}
                  />
                  <span className="text-center">{tool.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
