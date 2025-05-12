"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SparklesCore } from "@/components/ui/sparkles";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Enhanced parallax effect on mouse move
    if (parallaxRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to(parallaxRef.current, {
          duration: 1.2,
          x: (x - 0.5) * 40,
          y: (y - 0.5) * 40,
          ease: "power2.out",
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  
  // Enhanced text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 1,
        ease: "easeOut",
      },
    }),
  };
  
  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    }
  };
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Sparkles */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-indigo-950"
        suppressHydrationWarning
      >
        <div 
          className="w-full absolute inset-0 h-full"
          suppressHydrationWarning
        >
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.6}
            particleDensity={90}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.4}
          />
        </div>
      </div>
      
      {/* Enhanced animated background shapes */}
      <div 
        ref={parallaxRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        suppressHydrationWarning
      >
        {/* Glowing orbs with different sizes, positions and animations */}
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-[15%] left-[20%] w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-2xl"
          suppressHydrationWarning
        />
        <motion.div 
          animate={{
            y: [0, 20, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
          className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-3xl"
          suppressHydrationWarning 
        />
        <motion.div 
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut",
              delay: 1
            }
          }}
          className="absolute top-[55%] left-[55%] w-48 h-48 rounded-full bg-green-500/10 dark:bg-green-600/15 blur-xl"
          suppressHydrationWarning
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }
          }}
          className="absolute top-[30%] right-[30%] w-56 h-56 rounded-full bg-yellow-500/10 dark:bg-yellow-600/10 blur-2xl"
          suppressHydrationWarning
        />
      </div>
      
      {/* Content with enhanced animations */}
      <div 
        className="container mx-auto px-6 md:px-12 relative z-10 text-center" 
        ref={textRef}
        suppressHydrationWarning
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated gradient border around content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative p-2 inline-block"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden">
              {/* Animated subtle glow behind name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="absolute inset-0 flex justify-center items-center"
              >
                <div className="w-96 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              </motion.div>
            
              {/* Name */}
              <motion.h1 
                custom={1}
                variants={textVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 relative z-10"
              >
                Aleks Aleksandrov
              </motion.h1>
              
              {/* Tagline with enhanced styling */}
              <motion.div
                custom={1.5}
                variants={textVariants}
                className="relative mb-10"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-6 py-2 relative">
                  <span className="text-blue-400">Binary</span> life, <span className="text-purple-400">infinite</span> possibilities: 
                  <br className="hidden md:block" />
                  <span className="italic">coding tomorrow, analyzing today, engineering always.</span>
                </p>
              </motion.div>
              
              {/* Professional fields with enhanced styling */}
              <motion.div 
                custom={2}
                variants={textVariants}
                className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12"
              >
                <motion.span 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  className="text-xl md:text-2xl font-medium text-gray-200 px-8 py-3 bg-gray-800/40 backdrop-blur-sm rounded-full border border-blue-500/30 shadow-lg shadow-blue-500/10 transition-all duration-300"
                >
                  Business Engineer
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.3)" }}
                  className="text-xl md:text-2xl font-medium text-gray-200 px-8 py-3 bg-gray-800/40 backdrop-blur-sm rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/10 transition-all duration-300"
                >
                  Software Developer
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                  className="text-xl md:text-2xl font-medium text-gray-200 px-8 py-3 bg-gray-800/40 backdrop-blur-sm rounded-full border border-green-500/30 shadow-lg shadow-green-500/10 transition-all duration-300"
                >
                  Data Analyst
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 