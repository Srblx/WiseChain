import { cn } from "@/lib/utils";
import Image from 'next/image';

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
  sequenceCount?: number;
  customHeight?: string;
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  sequenceCount,
  className,
  customHeight,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  const self = rotationClass[rotate];

  return (
    <div className={cn(`group ${customHeight || 'h-[21rem]'} w-full [perspective:1000px]`, className)} {...props}>
      <div
        className={cn(
          "relative h-full w-full rounded-lg transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full rounded-lg overflow-hidden bg-blueDark bg-opacity-35 shadow-lg [backface-visibility:hidden]">
          <div className="relative h-48">
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
            {sequenceCount !== undefined && (
              <p className="text-gray-400 text-xs">{sequenceCount} min de lecture</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-lg bg-blueDark bg-opacity-90 p-4 text-slate-200 [backface-visibility:hidden]",
            self[1],
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            <h1 className="text-xl font-bold text-white">{subtitle || title}</h1>
            <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
