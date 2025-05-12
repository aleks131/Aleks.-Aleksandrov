/**
 * Optimized exports for heavy components
 * This file contains exports of components that are heavy and can be lazy loaded
 */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import CountUp from 'react-countup';

// Optimized loading for the Sparkles component
export const OptimizedSparkles = ({ 
  id,
  className, 
  background, 
  minSize, 
  maxSize, 
  particleColor, 
  particleDensity,
  opacity
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  particleDensity?: number;
  opacity?: number;
}) => {
  return (
    <SparklesCore
      id={id || "sparkles"}
      background={background || "transparent"}
      minSize={minSize || 0.4}
      maxSize={maxSize || 1.2}
      particleColor={particleColor || "#ffffff"}
      particleDensity={particleDensity || 15}
      className={className}
      opacity={opacity || 0.8}
    />
  );
};

// Optimized counter component
export const AnimatedCounter = ({ 
  value, 
  duration, 
  suffix, 
  className 
}: { 
  value: number | string; 
  duration?: number; 
  suffix?: string; 
  className?: string;
}) => {
  const numberValue = typeof value === 'string' ? parseInt(value) || 0 : value;
  const textSuffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : suffix || '';
  
  return (
    <CountUp 
      start={0} 
      end={numberValue} 
      duration={duration || 2.5} 
      separator="," 
      suffix={textSuffix}
      className={className} 
    />
  );
};

// Reusable gradient background component
export const GradientBackground = ({ 
  className,
  from,
  via,
  to,
  intensity = "10",
  animate = true
}: {
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  intensity?: string;
  animate?: boolean;
}) => {
  const fromColor = from || "blue-600";
  const viaColor = via || "purple-600";
  const toColor = to || "pink-600";
  
  return animate ? (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br from-${fromColor}/${intensity} via-${viaColor}/${intensity} to-${toColor}/${intensity} ${className || ''}`}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  ) : (
    <div className={`absolute inset-0 bg-gradient-to-br from-${fromColor}/${intensity} via-${viaColor}/${intensity} to-${toColor}/${intensity} ${className || ''}`} />
  );
};

// Export other heavy components that can be optimized here 