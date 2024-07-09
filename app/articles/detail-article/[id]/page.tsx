"use client";

import { Articles } from '@/interfaces/article.interface';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const ArticleDetailPage = () => {
  const params = useParams();
  const articleId = params.id as string;
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
          if (response.data && response.data.article) {
            setArticle(response.data.article);
          }
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


  const renderContentWithImages = () => {
    if (!article?.summary) return null;

    const paragraphs = article.summary.split('\n');

    return paragraphs.map((paragraph, index) => {
      let contentBeforeImage = '';
      let contentAfterImage = '';
      let imageComponent = null;

      if (index === 0 && article.img) {
        // Insérer au début du premier paragraphe
        imageComponent = (
          <div className="relative h-48 lg:h-[90%] mb-4">
            <Image
              src={article.img}
              alt="Image de l'article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      } else if (index === paragraphs.length - 1 && article.img) {
        // Insérer à la fin du dernier paragraphe
        imageComponent = (
          <div className="relative h-48 lg:h-[90%] mt-4 mb-4">
            <Image
              src={article.img}
              alt="Image de l'article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      } else {
        // Insérer au milieu des autres paragraphes
        const splitIndex = Math.floor(paragraph.length / 2);
        contentBeforeImage = paragraph.slice(0, splitIndex);
        contentAfterImage = paragraph.slice(splitIndex);

        imageComponent = (
          <div className="relative h-48 lg:h-[90%] my-4">
            <Image
              src={article.img}
              alt="Image de l'article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      }

      return (
        <Fragment key={index}>
          {contentBeforeImage && <p>{contentBeforeImage}</p>}
          {imageComponent}
          {contentAfterImage && <p>{contentAfterImage}</p>}
          {/* Ajouter un saut de ligne supplémentaire après chaque paragraphe */}
          {index < paragraphs.length - 1 && <br />}
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl mb-4">{article?.title}</h3>
      {article ? (
        <div>
          <div className="relative h-48 lg:h-[90%] shadow-xs-light">
            <Image
              src={article.img || '/img/logo.jpg'}
              alt={article.title}
              width={1000}
              height={700}
              objectFit="cover"
            />
          </div>
          <div className="p-4">
            {/* Appel de la fonction pour afficher les paragraphes avec gestion d'image */}
            {renderContentWithImages()}
          </div>
        </div>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
