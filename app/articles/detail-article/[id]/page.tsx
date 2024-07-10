'use client';

import { Articles } from '@/interfaces/article.interface';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ArticleDetailPage = () => {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`/api/articles/detail-article`, {
            params: { id: articleId },
          });

          if (response.data && response.data.article)
            setArticle(response.data.article);
        } catch (error) {
          console.error('Error fetching article:', error);
          setError(
            "Une erreur est survenue lors de la récupération de l'article."
          );
        } finally {
          setIsLoading(false);
        }
      };

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

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl mb-4">{article?.title}</h3>
      {article ? (
        <div>
          <div className="relative h-48 lg:h-[90%] flex justify-center items-center">
            <Image
              src={article.img ? `/img/${article.img}` : '/img/logo.jpg'}
              alt={article.title}
              width={1000}
              height={700}
              objectFit="cover"
              className='shadow-xs-light rounded-lg'
            />
          </div>
          <div className="p-4">
            <div>
              {article.sequence_article &&
              article.sequence_article.length > 0 ? (
                article.sequence_article.map((sequence) => (
                  <div key={sequence.id} id={sequence.id} className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">
                      {sequence.title}
                    </h3>
                    <p className="text-lg">{sequence.containt}</p>
                    {sequence.img && (
                      <div className="mt-4 flex justify-center items-center">
                        <Image
                          src={
                            sequence.img
                              ? `/img/${sequence.img}`
                              : '/img/logo.jpg'
                          }
                          alt={`Image for sequence: ${sequence.title}`}
                          width={550}
                          height={350}
                          className='rounded-lg'
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
        </div>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
