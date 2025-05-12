'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PreloadProgress } from '@/utils/preloader';

interface LoadingIndicatorProps {
  isLoading?: boolean;
  progress?: PreloadProgress;
  minDuration?: number;
  showPercentage?: boolean;
}

export default function LoadingIndicator({
  isLoading = true,
  progress,
  minDuration = 1000,
  showPercentage = true,
}: LoadingIndicatorProps) {
  const [visible, setVisible] = useState(isLoading);
  const [percent, setPercent] = useState(0);
  
  // Smooth progress animation
  useEffect(() => {
    if (progress) {
      // Animate to actual progress, but never go backwards
      setPercent(prev => Math.max(prev, progress.percentage));
    }
  }, [progress]);
  
  // Ensure minimum display time for better UX
  useEffect(() => {
    if (!isLoading && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, minDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, visible, minDuration]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center transition-all"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="w-80 flex flex-col items-center gap-3">
            {/* Logo or brand icon could go here */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500 dark:bg-blue-600 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-blue-600 dark:text-blue-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </div>
            </motion.div>
            
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
              Loading experience
            </h2>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Percentage text */}
            {showPercentage && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {percent.toFixed(0)}% complete
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple loading spinner component that can be used in various places
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full border-blue-600 border-t-transparent animate-spin ${className}`} />
  );
} 