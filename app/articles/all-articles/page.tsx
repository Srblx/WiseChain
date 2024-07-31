'use client';

// Interfaces
import { Articles } from '@/interfaces/article.interface';

// Enums
import Routes from '@/enums/routes.enum';

// Libs Next
import { useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Components
import CardArticle from '@/components/card/CardArticle.composent';

// Helpers
import { ERROR_MESSAGES, FORMATAGE_DATE } from '@/utils/messages.utils';
import axios from 'axios';
import dayjs from 'dayjs';

const AllArticles = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(Routes.GET_ALL_ARTICLES);
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_FETCHING_ARTICLE, error);
        setError(ERROR_MESSAGES.ERROR_FETCH_ARTICLES);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (date: string) => {
    return dayjs(date).format(FORMATAGE_DATE.FORMAT_FRENCH_DATE);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const firstArticles = articles.slice(0, 3);
  const otherArticles = articles.slice(3);

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl mb-4">Articles</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-6 lg:gap-y-0 gap-x-6">
        {firstArticles.map((article, index) => (
          <div
            key={article.id}
            className={`lg:col-span-${index === 0 ? 2 : 1} lg:row-span-2`}
          >
            <CardArticle
              isLarge={index === 0}
              title={article.title}
              description={article.summary}
              image={article.img ? `/img/${article.img}` : '/img/logo.jpg'}
              date={formatDate(article.created_at)}
              onClick={() =>
                router.push(`/articles/detail-article/${article.id}`)
              }
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {otherArticles.map((article) => (
          <CardArticle
            key={article.id}
            title={article.title}
            description=""
            image={article.img ? `/img/${article.img}` : '/img/logo.jpg'}
            date={formatDate(article.created_at)}
            onClick={() =>
              router.push(`/articles/detail-article/${article.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
