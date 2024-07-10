import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  sequenceCount: string;
  subtitle?: string;
  onClick?: () => void;
  isLarge?: boolean;
  rotate?: 'x' | 'y';
}

export default function FlipCardOne({
  image,
  title,
  description,
  sequenceCount,
  subtitle,
  onClick,
  isLarge = false,
  rotate = 'y',
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: [
      'group-hover:[transform:rotateX(180deg)]',
      '[transform:rotateX(180deg)]',
    ],
    y: [
      'group-hover:[transform:rotateY(180deg)]',
      '[transform:rotateY(180deg)]',
    ],
  };
  const self = rotationClass[rotate];

  // Adjusted height value
  const heightValue = isLarge ? 'h-full' : 'h-[18rem]';  // Change 'h-[18rem]' to desired height

  return (
    <div
      className={cn(
        'group [perspective:1000px]',
        isLarge ? 'lg:col-span-1 lg:row-span-2' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div
        className={cn(
          'relative w-full transition-all duration-500 [transform-style:preserve-3d]',
          self[0],
          heightValue
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-blueDark bg-opacity-60 text-white rounded-lg shadow-lg overflow-hidden flex flex-col [backface-visibility:hidden]">
          <div className={cn('relative', isLarge ? 'h-80 lg:h-[90%]' : 'h-36')}> {/* Adjusted height */}
            <Image
              src={image || '/img/logo.jpg'}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-3">
            <h2 className="text-white font-semibold mb-2">{title}</h2>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute h-full w-full rounded-lg bg-blueDark bg-opacity-90 p-4 text-slate-200 [backface-visibility:hidden]',
            self[1]
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            <h1 className="text-xl font-bold text-white">
              {sequenceCount || title}
            </h1>
            <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
