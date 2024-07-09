"use client";

// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { Articles } from '@/interfaces/article.interface';

// Libs Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Helpers
import axios from 'axios';

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
        console.error('Error fetching articles:', error);
        setError(
          'Une erreur est survenue lors de la récupération des articles.'
        );
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl mb-4">Articles Page</h3>
      {articles?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.length > 0 && (
              <>
                <div
                  className="lg:col-span-1 lg:row-span-2 bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col mb-6 cursor-pointer"
                  onClick={() => router.push(`/articles/detail-article/${articles[0].id}`)}
                >
                  <div className="relative h-48 lg:h-[90%]">
                    <Image
                      src={articles[0].img || '/img/logo.jpg'}
                      alt={articles[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <h2 className="text-white font-semibold mb-2">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-400 text-xs flex-grow">
                      {articles[0].summary.substring(0, 150)}...
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-1 lg:row-span-1 gap-6 cursor-pointer">
                  {articles.slice(1, 3).map((article) => (
                    <div
                      key={article.id}
                      className="bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col w-full"
                      onClick={() => router.push(`/articles/detail-article/${article.id}`)}
                    >
                      <div className="relative h-48">
                        <Image
                          src={article.img || '/img/placeholder.jpg'}
                          alt={article.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <h2 className="text-white font-semibold mb-2">
                          {article.title}
                        </h2>
                        <p className="text-gray-400 text-xs flex-grow">
                          {article.summary.substring(0, 200)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.slice(3).map((article) => (
              <div
                key={article.id}
                className="bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                onClick={() => router.push(`/articles/detail-article/${article.id}`)}
              >
                <div className="relative h-48">
                  <Image
                    src={article.img || '/img/logo.jpg'}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h2 className="text-white font-semibold mb-2">
                    {article.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Aucun article trouvé.</p>
      )}
    </div>
  );
};

export default AllArticles;
