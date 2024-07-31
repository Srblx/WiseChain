'use client';

import { SequenceArticle } from '@/interfaces/article.interface';
import Image from 'next/image';

interface ArticleContentProps {
  sequences: SequenceArticle[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ sequences }) => (
  <div className="p-4">
    {sequences && sequences.length > 0 ? (
      sequences.map((sequence) => (
        <div key={sequence.id} id={sequence.id} className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{sequence.title}</h3>
          <p className="text-lg">{sequence.containt}</p>
          {sequence.img && (
            <div className="mt-4 flex justify-center items-center">
              <Image
                src={sequence.img ? `/img/${sequence.img}` : '/img/logo.jpg'}
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
);

export default ArticleContent;
