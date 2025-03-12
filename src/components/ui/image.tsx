
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const Image = ({ 
  src, 
  alt = '', 
  fallback = '/placeholder.svg',
  className,
  ...props 
}: ImageProps) => {
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(src);
  const [error, setError] = React.useState(false);

  const handleError = () => {
    if (!error) {
      setImageSrc(fallback);
      setError(true);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={cn('object-contain', className)}
      {...props}
    />
  );
};
