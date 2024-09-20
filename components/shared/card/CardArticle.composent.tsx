//Libs React
import { FC } from 'react';

interface CardArticleProps {
  isLarge?: boolean;
  title: string;
  description: string;
  image: string;
  date: string;
  onClick: () => void;
}

const CardArticle: FC<CardArticleProps> = ({
  isLarge = false,
  title,
  description,
  date,
  image,
  onClick,
}) => {
  return (
    <div
      className={`card bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden h-full cursor-pointer ${
        isLarge ? 'lg:row-span-2 ' : ''
      }`}
      onClick={onClick}
    >
      <figure className={`relative h-48 ${isLarge ? 'lg:h-[90%]' : ''}`}>
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-white text-sm md:text-lg font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-400 text-xs flex-grow ">
          {description.length > 150 ? description : description}
        </p>
        <span className="text-gray-500 font-extrabold">{date}</span>
      </div>
    </div>
  );
};

export default CardArticle;
