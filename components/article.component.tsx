'use client';
import Routes from '@/enums/routes.enum';
// Interface
import { User } from '@/interfaces/auth/auth.interface';

// Axios
import axios from 'axios';

// Libs Next
import Image from 'next/image';

// Libs React
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  img: string;
  cover_img: string;
  created_at: Date;
  user: User;
  category: {
    name: string;
  };
}

const RecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<{ recentArticles: Article[] }>(
          Routes.GET_LAST_FIVE_ARTICLES
        );
        setArticles(response.data.recentArticles);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return <div>Chargement des articles...</div>;
  }

  const [latestArticle, ...otherArticles] = articles;
  console.log(articles);
  return (
    <>
      <h2 className="text-xl font-bold mb-1">Actualité</h2>
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="w-full lg:w-1/2 mr-6">
          <Image
            src={latestArticle.cover_img}
            alt={latestArticle.title}
            width={900}
            height={200}
            className="rounded-lg xl:mb-4"
          />
          <h2 className="text-2xl font-extrabold mb-2">{latestArticle.title}</h2>
          <p className="text-gray-200 mb-4">
            {latestArticle.content.substring(0, 200)}...
          </p>
          <p className="text-sm text-gray-300">
            Par {latestArticle.user.pseudo} dans {latestArticle.category?.name} <br />
            {new Date(latestArticle.created_at).toLocaleDateString()} à {new Date(latestArticle.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          {otherArticles.map((article) => (
              <div key={article.id} className="mb-4 flex items-center">
              <Image
                src={article.cover_img}
                alt={article.title}
                width={100}
                height={100}
                className="rounded-md mr-4"
              />
              <div>
                <h3 className="font-extrabold">{article.title}</h3>
                <p className="text-sm text-gray-300">
                  Par {article.user.pseudo} dans {article.category?.name} <br />
                  {new Date(latestArticle.created_at).toLocaleDateString()} à {new Date(latestArticle.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <div className="divider"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentArticles;
