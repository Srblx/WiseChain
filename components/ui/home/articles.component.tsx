'use client';
import Routes from '@/enums/routes.enum';
import { Articles } from '@/interfaces/article.interface';
// Interface

// Axios
import axios from 'axios';

// Libs Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

const RecentArticles = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const router = useRouter();

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

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const [latestArticle, ...otherArticles] = articles;

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-1/2 mr-6 cursor-pointer  sm:mb-0 mb-6"
          onClick={() => router.push(`/articles/detail-article/${latestArticle.id}`)}
        >
          <Image
            src={
              latestArticle.img ? `/img/${latestArticle.img}` : '/img/logo.jpg'
            }
            alt={latestArticle.title}
            width={1000}
            height={500}
            className="rounded-lg xl:mb-4"
          />
          <h2 className="text-2xl font-extrabold mb-2">
            {latestArticle.title}
          </h2>
          <p className="text-gray-200 mb-4">
            {latestArticle.summary.substring(0, 200)}...
          </p>
          <p className="text-sm text-gray-300">
            Par {latestArticle.user.pseudo} dans {latestArticle.category?.name}{' '}
            <br />
            {new Date(latestArticle.created_at).toLocaleDateString()} à{' '}
            {new Date(latestArticle.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          {otherArticles.map((article) => (
            <div
              key={article.id}
              className="flex items-center cursor-pointer"
              onClick={() => router.push(`/articles/detail-article/${article.id}`)}
            >
              <Image
                src={article.img ? `/img/${article.img}` : '/img/logo.jpg'}
                alt={article.title}
                width={100}
                height={100}
                className="rounded-lg mr-4"
              />
              <div>
                <h3 className="font-extrabold">{article.title}</h3>
                <p className="text-sm text-gray-300">
                  Par {article.user.pseudo} dans {article.category?.name} <br />
                  {new Date(article.created_at).toLocaleDateString()} à{' '}
                  {new Date(article.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <div className="divider m-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentArticles;
