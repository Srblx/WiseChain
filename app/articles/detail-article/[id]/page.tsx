'use client';

// Interfaces
import { Articles } from '@/interfaces/article.interface';

// Libs Next
import { useParams } from 'next/navigation';

// Libs React
import { useEffect, useState } from 'react';

// Components
import ArticleContent from '@/components/ui/article/ArticleContent.component';
import ArticleHeader from '@/components/ui/article/ArticleHeader.component';

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
      <ArticleHeader title={title} img={img} />
      <ArticleContent sequences={sequence_article} />
    </div>
  );
};

export default ArticleDetailPage;
