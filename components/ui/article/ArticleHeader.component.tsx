// Next Libs
import Image from 'next/image';

interface ArticleHeaderProps {
  title: string;
  img?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, img }) => (
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
  </div>
);

export default ArticleHeader;
