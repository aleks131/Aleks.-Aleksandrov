'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage - A performance-optimized image component with:
 * - Progressive loading with blur-up effect
 * - Error handling with fallback
 * - Lazy loading for off-screen images
 * - Proper aspect ratio preservation
 */
export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio = '4/3',
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '200px 0px' });

  // Generate a blurhash placeholder - hardcoded for client component
  const blurDataURL = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQ1NmZmMzMiIC8+PC9zdmc+`;

  // Reset loaded state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Handle images with incorrect aspect ratios
  const actualSrc = error ? fallbackSrc : src;

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden"
      style={{ aspectRatio, width: '100%' }}
    >
      {/* Background placeholder with blur-up effect */}
      <motion.div
        className="absolute inset-0 bg-blue-100/20 dark:bg-blue-900/20 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Actual image with progressive loading */}
      {isInView && (
        <Image
          src={actualSrc}
          alt={alt}
          width={width}
          height={height}
          quality={90}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          style={{ objectFit }}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
    </div>
  );
}

// Helper for lazy-loaded background images
export function OptimizedBackgroundImage({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  children,
}: {
  src: string;
  fallbackSrc?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '200px 0px' });

  useEffect(() => {
    if (!isInView) return;
    
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      setError(true);
      // Try loading fallback
      const fallback = new window.Image();
      fallback.src = fallbackSrc;
      fallback.onload = () => setIsLoaded(true);
    };
  }, [isInView, src, fallbackSrc]);

  const actualSrc = error ? fallbackSrc : src;

  return (
    <div 
      ref={ref}
      className={`${className} relative overflow-hidden transition-all duration-1000`}
      style={{
        backgroundImage: isLoaded ? `url(${actualSrc})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Placeholder until image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-blue-100/20 dark:bg-blue-900/30 backdrop-blur-sm animate-pulse" />
      )}
      
      {children}
    </div>
  );
} 