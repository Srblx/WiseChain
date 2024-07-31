'use client';

// Interfaces
import { Articles } from '@/interfaces/article.interface';

// Libs Next
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Helpers
import Routes from '@/enums/routes.enum';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';

const ArticleDetailPage = () => {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(Routes.GET_ONE_ARTICLE, {
          params: { id: articleId },
        });

        if (response.data && response.data.article) {
          setArticle(response.data.article);
        } else {
          setError(ERROR_MESSAGES.ERROR_FETCH_ARTICLES);
        }
      } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_FETCHING_ARTICLE, error);
        setError(ERROR_MESSAGES.ERROR_FETCH_ARTICLES);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  useEffect(() => {}, [article]);

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

  if (!article) {
    return <div>Aucun article trouvé.</div>;
  }

  const { title, img, sequence_article } = article;

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl mb-4">{title}</h3>
      <div className="relative h-48 lg:h-[90%] flex justify-center items-center">
        <Image
          src={img ? `/img/${img}` : '/img/logo.jpg'}
          alt={title}
          width={1000}
          height={700}
          objectFit="cover"
          className="shadow-xs-light rounded-lg"
        />
      </div>
      <div className="p-4">
        {sequence_article && sequence_article.length > 0 ? (
          sequence_article.map((sequence) => (
            <div key={sequence.id} id={sequence.id} className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{sequence.title}</h3>
              <p className="text-lg">{sequence.containt}</p>
              {sequence.img && (
                <div className="mt-4 flex justify-center items-center">
                  <Image
                    src={
                      sequence.img ? `/img/${sequence.img}` : '/img/logo.jpg'
                    }
                    alt={`Image for sequence: ${sequence.title}`}
                    width={550}
                    height={350}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Aucune séquence trouvée.</div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
