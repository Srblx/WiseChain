'use client';

// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { Glossary as GlossaryInterface } from '@/components/ui/glossary/GlossaryList.component';
import { Articles } from '@/interfaces/article.interface';

// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers
import axios from 'axios';

// Next Libs
import { useRouter } from 'next/navigation';

// React Libs
import { useEffect, useState } from 'react';

// Components
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import ScrollToTopButton from '@/components/shared/ScrollToTop.component';
import GlossaryList from '@/components/ui/glossary/GlossaryList.component';
import GlossaryTerm from '@/components/ui/glossary/GlossaryTerms.component';

const Glossary = () => {
  const [glossary, setGlossary] = useState<GlossaryInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('A-B');
  const [articles, setArticles] = useState<Articles[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGlossary = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/glossary');
        setGlossary(response.data.glossary);
        setIsLoading(false);
      } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_FETCHING_GLOSSARY, error);
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
        console.error(ERROR_MESSAGES.ERROR_FETCHING_ARTICLE, error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (articles.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <>
      <h1 className="text-3xl mb-4">Lexique : toutes les définitions</h1>
      <GlossaryList
        glossary={glossary}
        selectedSection={selectedSection}
        handleSectionClick={handleSectionClick}
        handleTermClick={handleTermClick}
      />
      {glossary.map((term) => (
        <GlossaryTerm term={term} key={term.id} />
      ))}
      <ScrollToTopButton
        showScrollToTop={showScrollToTop}
        scrollToTop={scrollToTop}
      />
    </>
  );
};

export default Glossary;
