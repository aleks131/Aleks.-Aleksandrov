"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeProjectPage } from '@/utils/preloader';

interface PreloaderProps {
  color?: string;
  backgroundClass?: string;
  spinner?: boolean;
  text?: string;
  textColor?: string;
  minDisplayTime?: number;
  maxDisplayTime?: number;
  children?: React.ReactNode;
}

const Preloader: React.FC<PreloaderProps> = ({
  color = 'text-blue-500',
  backgroundClass = 'bg-white dark:bg-gray-900',
  spinner = true,
  text = 'Loading amazing experience...',
  textColor = 'text-gray-700 dark:text-gray-300',
  minDisplayTime = 800, // Minimum time to show preloader to avoid flash
  maxDisplayTime = 5000, // Maximum time as failsafe
  children
}) => {
  const [loading, setLoading] = useState(true);
  // Add mounted state to prevent server/client mismatch
  const [mounted, setMounted] = useState(false);
  // Track loading start time for minimum display calculation
  const startTimeRef = useRef<number>(0);
  // Track progress as a percentage (0-100)
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Mark component as mounted on client side and record start time
    setMounted(true);
    startTimeRef.current = performance.now();
    
    // Initialize project preloading
    const setup = async () => {
      try {
        // Start progress animation
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            // Move progress forward gradually, but leave room for completion
            const newProgress = prev + (100 - prev) * 0.05;
            return newProgress > 95 ? 95 : newProgress;
          });
        }, 100);
        
        // Begin asset preloading
        await initializeProjectPage();
        
        // Clear interval once loading is complete
        clearInterval(progressInterval);
        setProgress(100);
        
        // Calculate how long the preloader has been visible
        const elapsedTime = performance.now() - startTimeRef.current;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        // Wait at least minDisplayTime before hiding preloader
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error('Error during page initialization:', error);
        // Show full progress and remove loader even if there's an error
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    
    setup();
    
    // Adding a failsafe to ensure preloader eventually goes away
    const failsafe = setTimeout(() => {
      setLoading(false);
    }, maxDisplayTime);
    
    return () => clearTimeout(failsafe);
  }, [minDisplayTime, maxDisplayTime]);

  // Don't render anything during SSR to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // When mounted on client and not loading, render children
  if (!loading) {
    return <>{children}</>;
  }

  // Show preloader when mounted and still loading
  return (
    <motion.div
      className={`fixed inset-0 flex flex-col items-center justify-center ${backgroundClass} z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {spinner && (
        <div className="relative w-20 h-20 mb-6">
          {/* Main spinner */}
          <motion.div
            className={`absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Secondary spinner */}
          <motion.div
            className={`absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ margin: '5px' }}
          />
          
          {/* Tertiary spinner */}
          <motion.div
            className={`absolute inset-0 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ margin: '10px' }}
          />
        </div>
      )}
      
      {text && (
        <motion.div 
          className={`text-center ${textColor}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg font-medium">{text}</p>
          <p className="text-sm mt-2 opacity-70">Please wait while we prepare something amazing...</p>
        </motion.div>
      )}
      
      {/* Progress indicator */}
      <div className="w-64 h-2 mt-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader; 