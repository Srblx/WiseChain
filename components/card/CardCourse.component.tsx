type CardProsp = {
  image: string;
  title: string;
  description?: string;
  sequence: string;
  isLarge?: boolean;
  className?: string;
  isMainCard?: boolean;
  onClick?: () => void;
};

export default function CardCourse({
  image,
  title,
  description,
  sequence,
  isLarge,
  className,
  onClick,
}: CardProsp) {
  const heightValue = isLarge ? 'h-48' : 'flex-grow';
  return (
    <div
      className={`${className} card card-compact bg-base-100 shadow-xl flex flex-col`}
      onClick={onClick}
    >
      <figure className={`${heightValue} overflow-hidden`}>
        <img src={image} alt={title} className={`w-full h-full object-cover`} />
      </figure>
      <div className="card-body flex flex-shrink flex-col justify-between h-fit">
        <div>
          <h2 className="card-title text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm italic text-gray-400">{description}</p>
        </div>
        <div className="card-actions justify-end mt-4 items-center">
          <div className="badge badge-outline">{sequence}</div>
        </div>
      </div>
    </div>
  );
}
