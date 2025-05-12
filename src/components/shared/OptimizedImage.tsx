"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * An optimized image component that handles loading states and provides 
 * better UX with proper placeholders and fade-in animations
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  style,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  objectFit = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle absolute vs relative paths
  const imageSrc = src.startsWith('http') || src.startsWith('/') 
    ? src 
    : `/${src}`;

  // Generate a simple color-based blur placeholder
  const blurPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyNTY2ZjIyNSIgLz48L3N2Zz4=';

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Placeholder loader */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
        </div>
      )}
      
      {/* Actual image with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoading || error ? 0 : 1 
        }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          quality={quality}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
          fill={fill}
          className={`${className} ${objectFit === 'cover' ? 'object-cover' : ''} 
                     ${objectFit === 'contain' ? 'object-contain' : ''} 
                     ${objectFit === 'fill' ? 'object-fill' : ''}
                     ${objectFit === 'none' ? 'object-none' : ''}
                     ${objectFit === 'scale-down' ? 'object-scale-down' : ''}`}
          style={style}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      </motion.div>
    </div>
  );
};

export default OptimizedImage; 