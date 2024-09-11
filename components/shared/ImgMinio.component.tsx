// Helpers
import axios from 'axios';

// Next libs
import Image from 'next/image';

// React libs
import { useEffect, useState } from 'react';

interface MinioImageProps {
  imageKey: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const MinioImage = ({
  imageKey,
  alt,
  width,
  height,
  className,
}: MinioImageProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      if (imageKey) {
        try {
          if (imageKey.startsWith('http')) {
            setImageUrl(imageKey);
          } else {
            const response = await axios.get(`/api/presigned-minio`, {
              params: { key: imageKey },
              headers: { Accept: 'application/json' },
            });
            setImageUrl(response.data.url);
          }
        } catch (e) {
          console.error('Error fetching presigned URL:', e);
          setError(
            e instanceof Error ? e.message : 'An unknown error occurred'
          );
        }
      }
    };

    fetchPresignedUrl();
  }, [imageKey]);

  if (error) {
    return <div>Error loading image: {error}</div>;
  }

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MinioImage;
