"use client";

import React, { useEffect, useRef, useState, useCallback, lazy, Suspense, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { FaUsers, FaClock, FaChartLine, FaArrowDown, FaChevronDown } from "react-icons/fa";
// Use lazy loading for TechnicalImplementation
const TechnicalImplementation = lazy(() => import('./TechnicalImplementation'));
import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import heavy components
const OptimizedSparkles = dynamic(
  () => import('./optimized-exports').then(mod => mod.OptimizedSparkles),
  { ssr: false, loading: () => <div className="h-full w-full bg-black/20" /> }
);

const AnimatedCounter = dynamic(
  () => import('./optimized-exports').then(mod => mod.AnimatedCounter),
  { ssr: true }
);

const GradientBackground = dynamic(
  () => import('./optimized-exports').then(mod => mod.GradientBackground),
  { ssr: true }
);

// Import SparklesCore and CountUp only when needed
import { SparklesCore } from "@/components/ui/sparkles";
import CountUp from 'react-countup';

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Technology {
  name: string;
  icon?: React.ReactNode;
}

interface ProjectPageProps {
  title: string;
  overview: string;
  teamSize?: string | number;
  duration?: string;
  role?: string;
  metrics?: Metric[];
  features?: Feature[];
  technologies?: Technology[];
  results?: Metric[];
  technicalDetails?: string[];
  imagePath?: string;
  customSections?: {
    title: string;
    content: React.ReactNode;
  }[];
  // Enhanced hero section properties
  heroBackgroundType?: 'particles' | 'grid' | 'gradient' | 'waves';
  heroOverlayOpacity?: number;
  animationIntensity?: 'low' | 'medium' | 'high';
  secondaryImagePath?: string; // For additional visual elements
  heroTextGradient?: boolean; // Whether to apply gradient to hero text
  heroCtaText?: string; // Custom text for the CTA button
  heroTechnicalText?: string; // Custom text for the technical button
}

// Memoized feature component for better performance
const FeatureCard = React.memo(({ feature, index }: { feature: Feature, index: number }) => (
  <motion.div
    key={index}
    className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
    initial={{ opacity: 0, y: 40, rotateY: -10 }}
    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      delay: index * 0.15, 
      duration: 0.7,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.05, 
      boxShadow: "0 25px 35px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Decorative gradient orb */}
    <div 
      className="absolute right-0 bottom-0 w-32 h-32 rounded-full opacity-30 filter blur-xl group-hover:scale-150 transition-all duration-700" 
      style={{ background: index % 2 === 0 ? "linear-gradient(135deg, #60a5fa, #7c3aed)" : "linear-gradient(135deg, #7c3aed, #ec4899)" }}
    />
    
    {/* Icon with enhanced styling */}
    {feature.icon && (
      <motion.div 
        className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 p-4 rounded-xl shadow-inner mb-6 w-16 h-16 flex items-center justify-center relative z-10 group-hover:shadow-xl transition-all duration-300"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
        whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5 } }}
      >
        <div className="text-[28px] text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          {feature.icon}
        </div>
      </motion.div>
    )}
    
    {/* Title and description with enhanced styling */}
    <div className="relative z-10">
      <motion.h3 
        className="font-bold text-xl md:text-2xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        {feature.title}
      </motion.h3>
      <motion.p 
        className="text-gray-600 dark:text-gray-400 leading-relaxed"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}
      >
        {feature.description}
      </motion.p>
    </div>
  </motion.div>
));

// Memoized technology card component
const TechnologyCard = React.memo(({ tech, index }: { tech: Technology, index: number }) => (
  <motion.div
    className="group relative perspective"
    variants={{
      hidden: { opacity: 0, y: 50 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8
        }
      }
    }}
  >
    <motion.div
      className="relative w-full aspect-square bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-6"
      whileHover={{
        rotateX: 10,
        rotateY: 15,
        scale: 1.05,
        boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated background glow */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(circle at ${50 + Math.random() * 20}% ${50 + Math.random() * 20}%, ${
            ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'][index % 3]
          }, transparent 70%)` 
        }}
      />
      
      {/* Icon with enhanced 3D effect */}
      <motion.div 
        className="mb-4 text-4xl relative group-hover:scale-110 transition-all duration-300 text-blue-600 dark:text-blue-400"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateZ(30px)" 
        }}
        whileHover={{
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5, repeat: Infinity }
        }}
      >
        {tech.icon}
      </motion.div>
      
      {/* Technology name with 3D effect */}
      <motion.span 
        className="font-medium text-lg text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateZ(20px)" 
        }}
      >
        {tech.name}
      </motion.span>
      
      {/* Decorative line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
      />
    </motion.div>
  </motion.div>
));

// Memoized result card component
const ResultCard = React.memo(({ result, index }: { result: Metric, index: number }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 50, rotateY: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      delay: index * 0.2, 
      duration: 0.8,
      type: "spring",
      stiffness: 100
    }}
  >
    {/* Card with 3D hover effect */}
    <motion.div
      className="relative h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-10 overflow-hidden border border-gray-200 dark:border-gray-700 z-10"
      whileHover={{ 
        scale: 1.05, 
        rotateY: 15, 
        boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background gradient accent */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 rounded-full bg-blue-500/5 dark:bg-blue-500/10" />
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 rounded-full bg-purple-500/5 dark:bg-purple-500/10" />
      
      {/* Metric contents with 3D effect */}
      <div className="text-center relative z-10">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-6 text-blue-500 dark:text-blue-400"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "translateZ(30px)" 
          }}
          whileHover={{ 
            rotate: 360,
            transition: { duration: 0.8 }
          }}
        >
          {result.icon || (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
              />
            </svg>
          )}
        </motion.div>
        
        {/* Animated value counter */}
        <motion.div 
          className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "translateZ(20px)" 
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.5 + index * 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }
          }}
          viewport={{ once: true }}
        >
          <CountUp 
            start={0} 
            end={parseInt(result.value) || 100} 
            duration={2.5} 
            separator="," 
            suffix={result.value.replace(/[0-9]/g, '')} 
          />
        </motion.div>
        
        {/* Label */}
        <motion.div 
          className="text-lg text-gray-600 dark:text-gray-400 font-medium"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "translateZ(15px)" 
          }}
        >
          {result.label}
        </motion.div>
      </div>
      
      {/* Bottom accent bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      />
    </motion.div>
  </motion.div>
));

// Memoized custom section component
const CustomSection = React.memo(({ section, index }: { 
  section: { title: string; content: React.ReactNode }; 
  index: number;
}) => (
  <section 
    className={`py-24 relative overflow-hidden ${
      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
    }`}
  >
    {/* Dynamic background gradient effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
    
    {/* Animated gradient orbs */}
    <motion.div 
      className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-[100px]"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div 
      className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 filter blur-[100px]"
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, -20, 0],
        y: [0, 20, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    
    {/* 3D grid lines effect */}
    <div className="absolute inset-0 opacity-20" 
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 100, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center center',
        transform: `perspective(1000px) rotateX(${index % 2 === 0 ? '1deg' : '-1deg'})`,
      }}>
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      {section.title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-lg blur"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              {section.title}
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-3 rounded-full" />
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 p-8 md:p-12 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
      >
        {section.content}
      </motion.div>
    </div>
  </section>
));

// Generate proper image path with fallback to SVG if JPG doesn't exist
const getImagePath = (path: string) => {
  // Handle both absolute URLs and relative paths
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  // Handle local images
  return path.startsWith('/') ? path : `/${path}`;
};

export default function ProjectPage({
  title,
  overview,
  teamSize,
  duration,
  role,
  metrics,
  features,
  technologies,
  results,
  technicalDetails,
  imagePath = '/images/projects/default-hero.svg',
  customSections = [],
  heroBackgroundType = 'grid',
  heroOverlayOpacity = 0.1,
  animationIntensity = 'medium',
  secondaryImagePath,
  heroTextGradient = true,
  heroCtaText = 'View Project Details',
  heroTechnicalText = 'Technical Implementation',
}: ProjectPageProps) {
  // Track mounted state for sparkles (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  // For handling client-side only random values 
  const [randomValues, setRandomValues] = useState<{
    floatingElements: any[],
  }>({ floatingElements: [] });
  
  useEffect(() => {
    setIsMounted(true);
    
    // Generate random values on the client side only, after mount
    setRandomValues({
      floatingElements: [...Array(15)].map((_, i) => ({
        size: Math.random() * 80 + 20,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.1,
        scale: 0.5 + Math.random() * 0.5,
        animationDuration: 15 + Math.random() * 30,
        randomY1: Math.random() * 50 - 25,
        randomY2: Math.random() * 50 - 25,
        randomY3: Math.random() * 50 - 25,
        randomRotate1: Math.random() * 180,
        randomRotate2: Math.random() * 180,
        randomRotate3: Math.random() * 180,
        randomScale1: 0.5 + Math.random() * 0.5,
        randomScale2: 0.7 + Math.random() * 0.3,
        randomScale3: 0.5 + Math.random() * 0.5,
        randomBlur: Math.random() * 2,
        zIndex: Math.floor(Math.random() * 10),
      })),
    });
  }, []);

  // Find the original mouse parallax effect code
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Calculate animation intensity multiplier
  const getIntensityMultiplier = () => {
    switch (animationIntensity) {
      case 'low': return 0.05;
      case 'medium': return 0.1;
      case 'high': return 0.2;
      default: return 0.1;
    }
  };
  
  const intensityMultiplier = getIntensityMultiplier();

  // Use throttled mouse movement for better performance
  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    // Calculate the position relative to the center of the viewport
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    
    // Apply intensity multiplier for animation intensity
    setMousePosition({
      x: x * intensityMultiplier,
      y: y * intensityMultiplier,
    });
  }, [intensityMultiplier]);
  
  // Throttle mouse movement for better performance
  useEffect(() => {
    // Throttle the mouse movement to improve performance
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleGlobalMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleGlobalMouseMove]);

  // Scroll animations
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]); // Add to move content up while scrolling down
  const titleRotate = useTransform(scrollY, [0, 300], [0, -2]); // Add subtle rotation effect

  // For interactive particles
  const getParticleCount = () => {
    switch (animationIntensity) {
      case 'low': return 30;
      case 'medium': return 50;
      case 'high': return 80;
      default: return 50;
    }
  };
  
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; color: string; speed: number }[]>([]);
  
  useEffect(() => {
    if (isMounted && heroBackgroundType === 'particles') {
      // Create particles
      const particleCount = getParticleCount();
      const newParticles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 1,
        color: [
          'rgba(59, 130, 246, 0.6)', // blue
          'rgba(139, 92, 246, 0.6)', // purple
          'rgba(236, 72, 153, 0.6)', // pink
          'rgba(16, 185, 129, 0.6)', // green
        ][Math.floor(Math.random() * 4)],
        speed: Math.random() * 0.5 + 0.1,
      }));
      setParticles(newParticles);
    }
  }, [isMounted, heroBackgroundType]);

  // Generate wave SVG path for wave background
  const [wavePath, setWavePath] = useState<string>('');
  
  useEffect(() => {
    if (isMounted && heroBackgroundType === 'waves') {
      // Generate smooth wave path
      const width = 1200;
      const height = 120;
      const points = 10;
      const segment = width / points;
      
      let path = `M0,${height} `;
      for (let i = 0; i <= points; i++) {
        const x = i * segment;
        const y = Math.sin(i / (points / Math.PI * 2)) * 30 + (height / 2);
        path += `L${x},${y} `;
      }
      path += `L${width},${height} L0,${height}Z`;
      
      setWavePath(path);
    }
  }, [isMounted, heroBackgroundType]);

  // Intersection observer for performance optimization
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on visibility
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Render background based on type
  const renderBackground = () => {
    switch (heroBackgroundType) {
      case 'grid':
        return (
          <motion.div 
            className="absolute inset-0 backdrop-blur-[1px]" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 100, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              backgroundPosition: 'center center',
              transform: `perspective(2000px) rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg) scale3d(1.2, 1.2, 1.2)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          />
        );
      
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20 translate-y-1/2" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <motion.path 
                d={wavePath}
                fill="currentColor"
                animate={{
                  d: [
                    wavePath,
                    wavePath.replace(/L(\d+),(\d+)/g, (_, x, y) => `L${x},${Number(y) + (Math.random() * 10 - 5)}`),
                    wavePath
                  ]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
            
            <svg className="absolute top-0 left-0 right-0 w-full opacity-20 rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <motion.path 
                d={wavePath}
                fill="currentColor"
                animate={{
                  d: [
                    wavePath,
                    wavePath.replace(/L(\d+),(\d+)/g, (_, x, y) => `L${x},${Number(y) + (Math.random() * 10 - 5)}`),
                    wavePath
                  ]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </svg>
          </div>
        );
        
      case 'gradient':
        return (
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-[70rem] h-[70rem] rounded-full bg-gradient-to-r from-blue-400/30 to-violet-500/30 opacity-70 filter blur-[120px]"
              style={{
                top: '0%',
                left: '0%',
                x: 200 * mousePosition.x,
                y: 200 * mousePosition.y,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute w-[80rem] h-[80rem] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-70 filter blur-[150px]"
              style={{
                bottom: '0%',
                right: '0%',
                x: -220 * mousePosition.x,
                y: -220 * mousePosition.y,
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -20, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        );
      
      // Particles case is handled separately in the main render
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      <Navbar />
      
      <main className="pt-16">
        {/* Enhanced Hero Section with Interactive Elements */}
        <motion.section
          className="relative overflow-hidden min-h-[100vh] flex items-center border-b border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          id="hero-section"
          ref={heroRef}
        >
          {/* Dynamic background effect based on heroBackgroundType */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10" style={{ opacity: heroOverlayOpacity }}></div>
            {renderBackground()}
          </div>

          {/* Interactive particles - only rendered if the heroBackgroundType is 'particles' */}
          {isMounted && isHeroVisible && heroBackgroundType === 'particles' && (
            <div className="absolute inset-0 z-[1] pointer-events-none">
              {particles.map((particle, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: particle.color,
                    x: mousePosition.x * (40 + index % 40),
                    y: mousePosition.y * (40 + index % 40),
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 100, 0],
                    y: [0, (Math.random() - 0.5) * 100, 0],
                    scale: [1, Math.random() * 1.5 + 0.5, 1],
                    opacity: [particle.size > 3 ? 0.8 : 0.4, particle.size > 3 ? 1 : 0.6, particle.size > 3 ? 0.8 : 0.4],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Background image with enhanced parallax effect */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-[0.07]"
            style={{
              backgroundImage: `url(${imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              x: 100 * mousePosition.x,
              y: 100 * mousePosition.y,
              scale: 1.2,
            }}
          />

          {/* Secondary image if provided */}
          {secondaryImagePath && (
            <motion.div 
              className="absolute inset-0 z-0 opacity-[0.05]"
              style={{
                backgroundImage: `url(${secondaryImagePath})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                x: -80 * mousePosition.x,
                y: -80 * mousePosition.y,
                scale: 1.1,
              }}
            />
          )}

          {/* Interactive floating elements */}
          {isMounted && isHeroVisible && (
            <div className="absolute inset-0 z-[2] pointer-events-none">
              {/* Tech-related elements that float and react to mouse */}
              <motion.div 
                className="absolute top-[20%] left-[15%] bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
                style={{ 
                  x: mousePosition.x * 50, 
                  y: mousePosition.y * 50,
                  rotate: mousePosition.x * 10,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-blue-500 w-10 h-10 flex items-center justify-center">
                  <FaChartLine size={24} />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-[25%] right-[20%] bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
                style={{ 
                  x: mousePosition.x * -60, 
                  y: mousePosition.y * -60,
                  rotate: mousePosition.x * -10,
                }}
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="text-purple-500 w-10 h-10 flex items-center justify-center">
                  <FaUsers size={24} />
                </div>
              </motion.div>
            </div>
          )}

          {/* Centered content with enhanced animations and 3D effects */}
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ y: contentY }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ 
                  rotateX: titleRotate,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <motion.span 
                  className={`inline-block ${heroTextGradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' : ''}`}
                  animate={heroTextGradient ? {
                    backgroundPosition: ['0% center', '100% center', '0% center'],
                  } : {}}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    x: mousePosition.x * 20,
                    y: mousePosition.y * 20,
                  }}
                >
                  {title}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-16 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ 
                  x: mousePosition.x * 10,
                  y: mousePosition.y * 10,
                }}
              >
                {overview}
              </motion.p>
              
              <motion.div
                className="flex flex-wrap justify-center gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.a
                  href="#project-details"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-10 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 text-lg relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px rgba(0, 0, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('project-details')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {/* Add hover effect - moving gradient overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/0 via-white/40 to-blue-400/0 
                    transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="relative z-10">{heroCtaText}</span>
                </motion.a>
                
                <motion.a
                  href="#technical-details"
                  className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-4 px-10 rounded-full shadow-lg transition-all duration-300 text-lg relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('technical-details')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {/* Add hover effect - moving gradient overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-400/0 via-white/20 to-gray-400/0 
                    transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full dark:via-white/10" />
                  <span className="relative z-10">{heroTechnicalText}</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Enhanced elegant scroll indicator with motion and interactive feedback */}
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.a
              href="#project-details"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('project-details')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center mb-2 overflow-hidden relative"
                animate={{ 
                  y: [0, 10, 0],
                  boxShadow: [
                    "0 0 0 rgba(255, 255, 255, 0.3)",
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 0 rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Add ripple effect on hover */}
                <span className="absolute inset-0 bg-blue-400/20 dark:bg-blue-600/20 transform scale-0 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <motion.div
                  animate={{ 
                    y: [0, 4, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.25
                  }}
                  className="relative z-10"
                >
                  <FaChevronDown className="text-gray-400 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" size={18} />
                </motion.div>
              </motion.div>
              <span className="text-sm text-gray-400 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">Scroll</span>
            </motion.a>
          </motion.div>
        </motion.section>

        {/* Project Details Section */}
        <section id="project-details" className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="col-span-1">
                <motion.h2 
                  className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Project Info
                </motion.h2>
                <div className="space-y-8">
                  {teamSize && (
                    <motion.div 
                      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)", 
                        rotate: 0.5,
                        transition: { duration: 0.2 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-6 relative z-10">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-5 relative">
                          <motion.div 
                            className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg"
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                            whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
                          >
                            <FaUsers className="text-white" size={24} />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Size</h3>
                            <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                              {teamSize} <span className="text-lg">members</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {duration && (
                    <motion.div 
                      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)", 
                        rotate: -0.5,
                        transition: { duration: 0.2 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-6 relative z-10">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 dark:bg-green-600/20 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-5 relative">
                          <motion.div 
                            className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg"
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                            whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
                          >
                            <FaClock className="text-white" size={24} />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Duration</h3>
                            <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                              {duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {role && (
                    <motion.div 
                      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)", 
                        rotate: 0.5,
                        transition: { duration: 0.2 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-6 relative z-10">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-5 relative">
                          <motion.div 
                            className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg"
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                            whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
                          >
                            <FaChartLine className="text-white" size={24} />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Role</h3>
                            <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
                              {role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative mb-10"
                >
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-20"
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <h2 className="text-3xl font-bold mb-2 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                      Key Features
                    </span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features?.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section - using memoized components */}
        {technologies && technologies.length > 0 && (
          <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            {/* Dynamic background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
            <motion.div 
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 filter blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/10 filter blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [45, 0, 45],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Enhanced section header with animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative mb-16 text-center"
              >
                <motion.div 
                  className="absolute -inset-x-1 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.h2 
                  className="inline-block text-3xl md:text-4xl font-bold relative px-8 bg-white dark:bg-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                    Technologies & Tools
                  </span>
                </motion.h2>
              </motion.div>
              
              {/* 3D Technology cards grid */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                {technologies.map((tech, index) => (
                  <TechnologyCard key={index} tech={tech} index={index} />
                ))}
              </motion.div>
              
              {/* Circle decoration */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-blue-500/10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-purple-500/10 rounded-full"></div>
            </div>
          </section>
        )}

        {/* Results Section - using memoized components */}
        {results && results.length > 0 && (
          <section className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated waves */}
              <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10 translate-y-1/2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <motion.path 
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  fill="currentColor"
                  animate={{
                    d: [
                      "M985.66,92.83C906.67,72,800.78,80,720.84,80.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z",
                      "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    ]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
              
              {/* Decorative gradient orbs */}
              <motion.div 
                className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-blue-500/10 filter blur-[100px]"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-purple-500/10 filter blur-[100px]"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Animated section header */}
              <motion.div
                className="max-w-4xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Results & Impact
                </h2>
                <motion.div 
                  className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
                  animate={{
                    scaleX: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                  Our metrics showcase the tangible impact and effectiveness of this project's implementation.
                </p>
              </motion.div>
              
              {/* 3D metric cards with animated counting */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {results.map((result, index) => (
                  <ResultCard key={index} result={result} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technical Implementation Section - lazy loaded */}
        {technicalDetails && technicalDetails.length > 0 && (
          <section id="technical-details" className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-10">Technical Implementation</h2>
              <Suspense fallback={<div className="p-4 text-center">Loading technical details...</div>}>
                <TechnicalImplementation details={technicalDetails} />
              </Suspense>
            </div>
          </section>
        )}

        {/* Custom Sections - using memoized components */}
        {customSections.map((section, index) => (
          <CustomSection key={index} section={section} index={index} />
        ))}
      </main>
      
      <Footer />
    </div>
  );
}; 