'use client';

import Routes from '@/enums/routes.enum';
import { Articles } from '@/interfaces/article.interface';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const classNameLetterList = 'inline-block cursor-pointer text-sm md:text-lg';
const classNameLetterListIsSelect = 'bg-secondary text-black p-1 rounded-md px-3';

export interface Glossary {
  id: string;
  title: string;
  definition: string;
  createdAt: string;
}

const Glossary = () => {
  const [glossary, setGlossary] = useState<Glossary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('A-B');
  const [articles, setArticles] = useState<Articles[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGlossary = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/glossary');
        setGlossary(response.data.glossary);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching glossary:', error);
        setError(ERROR_MESSAGES.ERROR_FETCHING_GLOSSARY);
        setIsLoading(false);
      }
    };

    fetchGlossary();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<{ recentArticles: Articles[] }>(
          Routes.GET_LAST_SIX_ARTICLES
        );
        setArticles(response.data.recentArticles);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  const handleTermClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredGlossary = glossary.filter((term) => {
    const firstLetter = term.title[0].toUpperCase();
    if (selectedSection === 'A-B')
      return firstLetter >= 'A' && firstLetter <= 'B';
    if (selectedSection === 'C-D')
      return firstLetter >= 'C' && firstLetter <= 'D';
    if (selectedSection === 'E-I')
      return firstLetter >= 'E' && firstLetter <= 'I';
    if (selectedSection === 'J-M')
      return firstLetter >= 'J' && firstLetter <= 'M';
    if (selectedSection === 'N-Q')
      return firstLetter >= 'N' && firstLetter <= 'Q';
    if (selectedSection === 'R-S')
      return firstLetter >= 'R' && firstLetter <= 'S';
    if (selectedSection === 'T-Z')
      return firstLetter >= 'T' && firstLetter <= 'Z';
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl mb-4">Lexique : toutes les définitions</h1>
      <div className="flex flex-col w-full">
        <div className="bg-blueDark rounded-md p-4 shadow-xs-light">
          <div className="text-md">
            <ul className="flex space-x-8 px-4 py-2">
              <li
                className={`${selectedSection === 'A-B' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('A-B')}>A - B</a>
              </li>
              <li
                className={`${selectedSection === 'C-D' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('C-D')}>C - D</a>
              </li>
              <li
                className={`${selectedSection === 'E-I' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('E-I')}>E - H</a>
              </li>
              <li
                className={`${selectedSection === 'J-M' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('J-M')}>I - M</a>
              </li>
              <li
                className={`${selectedSection === 'N-Q' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('N-Q')}>N - Q</a>
              </li>
              <li
                className={`${selectedSection === 'R-S' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('R-S')}>R - S</a>
              </li>
              <li
                className={`${selectedSection === 'T-Z' ? classNameLetterListIsSelect : ''} ${classNameLetterList}`}
              >
                <a onClick={() => handleSectionClick('T-Z')}>T - Z</a>
              </li>
            </ul>
          </div>
          <div className="divider bg-tertiary h-0.5 my-2 rounded-md"></div>
          <div className="px-4 text-lg pb-4">
            {filteredGlossary.map((term) => (
              <h4 key={term.id}>
                <a
                  href={`#${term.id}`}
                  onClick={(e) => handleTermClick(e, term.id)}
                >
                  {term.title}
                </a>
              </h4>
            ))}
          </div>
        </div>
      </div>
      {glossary.map((term) => (
        <div
          id={term.id}
          className="card bg-secondary !shadow-sm-light text-primary-content w-full my-5"
          key={term.id}
        >
          <div className="card-body">
            <h2 className="card-title underline underline-offset-4">
              {term.title}
            </h2>
            <p>{term.definition}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Glossary;
