"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FaLinkedin, 
  FaGithub, 
  FaWater, 
  FaMountain, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaBookOpen, 
  FaRegCompass, 
  FaEnvelope,
  FaArrowDown,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { HiOutlineChevronDown, HiSparkles } from "react-icons/hi";

export default function AboutPage() {
  // Refs for scroll animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Scroll animations
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.2]);
  const y = useTransform(scrollY, [0, 200], [0, -50]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate position relative to center of screen (-0.5 to 0.5)
    const xPos = (clientX / windowWidth) - 0.5;
    const yPos = (clientY / windowHeight) - 0.5;
    
    setMousePosition({ x: xPos, y: yPos });
  };

  useEffect(() => {
    // Set transparent navbar
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("bg-transparent");
      navbar.classList.add("border-transparent");
    }
    
    // Cleanup
    return () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.remove("border-transparent");
      }
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white"
      onMouseMove={handleMouseMove}
    >
      <Navbar />
      
      {/* Enhanced decorative elements with parallax effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full filter blur-[100px]"
          style={{ 
            x: mousePosition.x * -50, 
            y: mousePosition.y * -50,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]"
          style={{ 
            x: mousePosition.x * 50, 
            y: mousePosition.y * 50,
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[100px]"
          style={{ 
            x: mousePosition.x * 30, 
            y: mousePosition.y * 30,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(15,15,25,0.8)_0%,rgba(5,5,15,0.9)_100%)]"
        />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 100, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: `scale(${1 + Math.abs(mousePosition.y) * 0.1}) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center'
            }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <section ref={aboutRef} className="relative min-h-[90vh] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ opacity, y }}
            className="container mx-auto px-6 py-12 max-w-7xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Profile Image - with enhanced 3D card effect */}
              <motion.div 
                className="col-span-1 lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div 
                  className="relative"
                  style={{ 
                    rotateY: mousePosition.x * 10,
                    rotateX: mousePosition.y * -10,
                    transformStyle: "preserve-3d"
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-600/70 to-purple-600/70 opacity-70 blur-xl"
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5],
                      rotate: [0, 1, 0, -1, 0],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl shadow-blue-600/20 border border-gray-800/50"
                    whileHover={{ 
                      scale: 1.03, 
                      rotate: 1,
                      boxShadow: "0 30px 60px rgba(0, 0, 255, 0.4)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/images/about/Aleks-portfolio.png"
                      alt="Aleks Aleksandrov"
                      fill
                      style={{ 
                        objectFit: "cover",
                        transformStyle: "preserve-3d",
                        transform: "translateZ(10px)",
                      }}
                      className="rounded-2xl"
                      priority
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Interactive glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0"
                      whileHover={{ opacity: 1 }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Floating sparkles */}
                    {[...Array(5)].map((_, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-4 h-4 text-yellow-300"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          opacity: 0,
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1, 0.5],
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: "easeInOut"
                        }}
                      >
                        <HiSparkles />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Profile Info - with enhanced text animations */}
              <motion.div 
                className="col-span-1 lg:col-span-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="space-y-8">
                  <div>
                    <motion.h1 
                      className="text-4xl md:text-5xl font-bold mb-4 relative"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.span
                        className={`absolute -inset-1 rounded-lg blur-sm bg-gradient-to-r from-blue-600`}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <span className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block`}>
                        Aleks Aleksandrov
                      </span>
                    </motion.h1>
                    <motion.h2 
                      className="text-xl md:text-2xl text-gray-400 mb-6"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      Global Business Engineering Student
                    </motion.h2>
                  </div>

                  <motion.p 
                    className="text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Bridging the gap between technology and business with analytical thinking and creative problem-solving. 
                    Bulgarian-born, Denmark-educated, with a passion for data analytics, software development, and the great outdoors.
                  </motion.p>

                  {/* Stats Section with enhanced animated counters */}
                  <div className="py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <motion.div 
                        className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/80 relative overflow-hidden shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.05,
                          boxShadow: "0 20px 30px rgba(0, 0, 255, 0.2)",
                        }}
                      >
                        {/* Animated background gradient */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated particles */}
                        {[...Array(8)].map((_, index) => (
                          <motion.div
                            key={index}
                            className="absolute rounded-full bg-blue-400/30"
                            style={{
                              width: 4 + Math.random() * 6,
                              height: 4 + Math.random() * 6,
                              top: Math.random() * 100 + '%',
                              left: Math.random() * 100 + '%',
                              opacity: 0,
                            }}
                            animate={{
                              y: [0, -20],
                              x: [0, Math.random() * 10 - 5],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 1,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                        
                        <div className="relative z-10">
                          <h3 className="text-gray-400 text-sm mb-2">Professional Skills</h3>
                          <motion.div 
                            className="relative inline-block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            <motion.p 
                              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                delay: 0.2, 
                                duration: 0.8 
                              }}
                            >
                              15+
                            </motion.p>
                            <motion.div 
                              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4, duration: 0.8 }}
                            />
                          </motion.div>
                          <p className="text-gray-400 text-xs mt-1">Core Technologies</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/80 relative overflow-hidden shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.05,
                          boxShadow: "0 20px 30px rgba(128, 0, 255, 0.2)",
                        }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-600/30 opacity-0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {[...Array(8)].map((_, index) => (
                          <motion.div
                            key={index}
                            className="absolute rounded-full bg-purple-400/30"
                            style={{
                              width: 4 + Math.random() * 6,
                              height: 4 + Math.random() * 6,
                              top: Math.random() * 100 + '%',
                              left: Math.random() * 100 + '%',
                              opacity: 0,
                            }}
                            animate={{
                              y: [0, -20],
                              x: [0, Math.random() * 10 - 5],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 1,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                        
                        <div className="relative z-10">
                          <h3 className="text-gray-400 text-sm mb-2">Projects</h3>
                          <motion.div 
                            className="relative inline-block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            <motion.p 
                              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                delay: 0.3, 
                                duration: 0.8 
                              }}
                            >
                              15+
                            </motion.p>
                            <motion.div 
                              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/80 relative overflow-hidden shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.05,
                          boxShadow: "0 20px 30px rgba(0, 200, 100, 0.2)",
                        }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-600/30 opacity-0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {[...Array(8)].map((_, index) => (
                          <motion.div
                            key={index}
                            className="absolute rounded-full bg-green-400/30"
                            style={{
                              width: 4 + Math.random() * 6,
                              height: 4 + Math.random() * 6,
                              top: Math.random() * 100 + '%',
                              left: Math.random() * 100 + '%',
                              opacity: 0,
                            }}
                            animate={{
                              y: [0, -20],
                              x: [0, Math.random() * 10 - 5],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 1,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                        
                        <div className="relative z-10">
                          <h3 className="text-gray-400 text-sm mb-2">Certifications</h3>
                          <motion.div 
                            className="relative inline-block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            <motion.p 
                              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                delay: 0.4, 
                                duration: 0.8 
                              }}
                            >
                              7
                            </motion.p>
                            <motion.div 
                              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6, duration: 0.8 }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/80 relative overflow-hidden shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.05,
                          boxShadow: "0 20px 30px rgba(0, 200, 255, 0.2)",
                        }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-cyan-600/30 opacity-0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {[...Array(8)].map((_, index) => (
                          <motion.div
                            key={index}
                            className="absolute rounded-full bg-cyan-400/30"
                            style={{
                              width: 4 + Math.random() * 6,
                              height: 4 + Math.random() * 6,
                              top: Math.random() * 100 + '%',
                              left: Math.random() * 100 + '%',
                              opacity: 0,
                            }}
                            animate={{
                              y: [0, -20],
                              x: [0, Math.random() * 10 - 5],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 1,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                        
                        <div className="relative z-10">
                          <h3 className="text-gray-400 text-sm mb-2">Technologies</h3>
                          <motion.div 
                            className="relative inline-block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            <motion.p 
                              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                delay: 0.5, 
                                duration: 0.8 
                              }}
                            >
                              20+
                            </motion.p>
                            <motion.div 
                              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7, duration: 0.8 }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced Contact and Social Links */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <motion.a
                      href="mailto:aleksaleksandrov670@gmail.com" 
                      className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 rounded-full border border-blue-500/30 text-white overflow-hidden group shadow-lg shadow-blue-900/10"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0"
                        style={{ transform: "translateX(-100%)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 2,
                          repeatDelay: 1
                        }}
                      />
                      <motion.div 
                        className="relative z-10 text-blue-400 text-lg"
                        animate={{ rotate: [0, 15, 0, -15, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 3
                        }}
                      >
                        <FaEnvelope />
                      </motion.div>
                      <span className="relative z-10">Contact Me</span>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/aleks-aleksandrov-42a472238/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-800/20 to-blue-900/20 hover:from-blue-800/30 hover:to-blue-900/30 rounded-full border border-blue-700/30 text-blue-400 overflow-hidden group"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(30, 64, 175, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0"
                        style={{ transform: "translateX(-100%)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 2,
                          repeatDelay: 1.5
                        }}
                      />
                      <motion.div 
                        className="relative z-10 text-blue-300 text-lg"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 0, 0, 10, 0] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatDelay: 2
                        }}
                      >
                        <FaLinkedin />
                      </motion.div>
                      <span className="relative z-10">LinkedIn</span>
                    </motion.a>

                    <motion.a 
                      href="https://github.com/aleks131" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700/20 to-gray-800/20 hover:from-gray-700/30 hover:to-gray-800/30 rounded-full border border-gray-600/50 text-gray-300 overflow-hidden group"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(75, 85, 99, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-600/0 via-gray-600/30 to-gray-600/0"
                        style={{ transform: "translateX(-100%)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 2,
                          repeatDelay: 2
                        }}
                      />
                      <motion.div 
                        className="relative z-10 text-gray-200 text-lg"
                        animate={{ 
                          rotate: [0, 360],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          repeatDelay: 5,
                          ease: "easeInOut"
                        }}
                      >
                        <FaGithub />
                      </motion.div>
                      <span className="relative z-10">GitHub</span>
                    </motion.a>

                    <motion.a
                      href="/images/about/Aleks-Aleksandrov-CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 rounded-full border border-purple-500/30 text-purple-400 overflow-hidden group"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0"
                        style={{ transform: "translateX(-100%)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 2,
                          repeatDelay: 2.5
                        }}
                      />
                      <motion.div 
                        className="relative z-10 text-purple-300 text-lg"
                        animate={{ 
                          y: [0, -5, 0],
                          scale: [1, 1.2, 1] 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 3
                        }}
                      >
                        <FaGraduationCap />
                      </motion.div>
                      <span className="relative z-10">Resume</span>
                    </motion.a>
                  </div>

                  {/* Improved scroll down button with dynamic reflection */}
                  <motion.button
                    onClick={() => scrollToSection(storyRef)}
                    className="relative group mt-10 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.span
                      className="text-base text-gray-400 group-hover:text-blue-400 transition-colors duration-300 mb-2"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Scroll to read my story
                    </motion.span>
                    
                    <motion.div 
                      className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-blue-500 flex items-center justify-center overflow-hidden"
                      animate={{ 
                        boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, 24, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <FaArrowDown className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                      </motion.div>
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Background Shape */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-950 to-transparent z-0"></div>
        </section>

        {/* My Full Story Section */}
        <motion.div 
          ref={storyRef} 
          className="min-h-screen py-16 container mx-auto px-6"
        >
          {/* Story Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">My Story</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From the mountains of Bulgaria to the innovation hubs of Denmark — this is the journey that shaped me.
            </motion.p>
          </motion.div>

          {/* Bulgarian Roots */}
          <motion.section 
            className="mb-20 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  The Bulgarian Roots
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Born and raised in the heart of Bulgaria, my childhood was spent exploring the majestic Stara Planina mountains. These early adventures instilled in me a profound appreciation for nature's intricacies and a keen eye for observing patterns — a skill that would later translate into my analytical approach to business and technology.
                </motion.p>
                <motion.p 
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  The Bulgarian culture, with its emphasis on resilience and resourcefulness, shaped my core values. Growing up in a post-communist society taught me to adapt to changing environments and find creative solutions with limited resources — qualities that now define my problem-solving methodology.
                </motion.p>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  The breathtaking landscapes of my homeland, from dense forests to crystal-clear mountain streams, fostered my deep connection with nature that continues to influence my perspective on sustainability and balanced living.
                </motion.p>
              </div>
              <div className="order-1 lg:order-2">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-green-600/40 to-cyan-600/40 opacity-70 blur-xl"
                    animate={{ 
                      opacity: [0.4, 0.6, 0.4],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20">
                    <Image
                      src="/images/about/stara-planina.jpg"
                      alt="Stara Planina mountains"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6"
                    initial={{ opacity: 0.8, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p 
                      className="text-white text-sm md:text-base font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Stara Planina mountains — where my journey began
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Outdoor Enthusiast */}
          <motion.section 
            className="mb-20 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  className="relative rounded-2xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.03, 
                    rotate: -1,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <motion.div 
                    className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-600/40 to-purple-600/40 opacity-70 blur-xl"
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                    <Image
                      src="/images/about/montain.jpg"
                      alt="Mountain adventures"
                      fill
                      className="object-cover rounded-2xl transition-transform duration-700 hover:scale-110"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-blue-900/10 opacity-50"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6"
                    initial={{ opacity: 0.8, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p 
                      className="text-white text-sm md:text-base font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Exploring nature through hiking adventures
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
              <div>
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Outdoor Enthusiast
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  My passion for the outdoors goes beyond mere recreation—it's a philosophy that shapes how I approach challenges and opportunities alike. Whether I'm surfing the waves, swimming in crystal-clear waters, or fishing in serene lakes, these activities connect me to something greater than myself.
                </motion.p>
                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  These moments in nature serve as a counterbalance to the digital world I navigate professionally, offering perspective and clarity that I bring back to my technical work and analytical thinking.
                </motion.p>
                
                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <motion.div 
                    className="bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <FaWater className="text-blue-400 text-2xl mb-3" />
                    <h4 className="text-white font-medium mb-2">Water Activities</h4>
                    <p className="text-gray-400 text-sm">Finding flow state through surfing, swimming, and fishing brings balance to my analytical mind.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-purple-900/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <FaMountain className="text-purple-400 text-2xl mb-3" />
                    <h4 className="text-white font-medium mb-2">Mountain Exploration</h4>
                    <p className="text-gray-400 text-sm">Hiking challenges that build persistence and problem-solving skills applicable to any field.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-cyan-900/20 backdrop-blur-sm border border-cyan-800/30 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <FaRegCompass className="text-cyan-400 text-2xl mb-3" />
                    <h4 className="text-white font-medium mb-2">Outdoor Wisdom</h4>
                    <p className="text-gray-400 text-sm">Lessons from nature that inform my approach to business, technology, and life.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Journey to Denmark */}
          <motion.section 
            className="mb-20 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  The Journey to Denmark
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Pursuing Global Business Engineering in Aarhus, Denmark marked a transformative chapter in my life. The decision to study internationally was driven by a desire to gain a global perspective and immerse myself in a culture known for innovation, sustainability, and work-life balance.
                </motion.p>
                <motion.p 
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  The Danish educational approach, with its focus on problem-based learning and collaborative projects, perfectly complemented my analytical mindset. It taught me to combine theoretical knowledge with practical applications—creating solutions that address real-world challenges.
                </motion.p>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  The blend of Bulgarian resilience and Danish efficiency has shaped my approach to problem-solving and project management. I've learned to transform complex data into actionable insights, bridging the gap between technical expertise and business strategy.
                </motion.p>
              </div>
              <div className="order-1 lg:order-2">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-600/40 to-blue-600/40 opacity-70 blur-xl"
                    animate={{ 
                      opacity: [0.4, 0.6, 0.4],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20">
                    <Image
                      src="/images/about/Aleks1.JPG"
                      alt="Journey to Denmark"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-indigo-900/10 opacity-50"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Life Beyond Code */}
          <motion.section 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Balance: Life Beyond Code
            </motion.h3>
            
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="md:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-full">
                    <motion.div 
                      className="absolute -inset-2 rounded-xl bg-gradient-to-r from-amber-600/30 to-pink-600/30 opacity-60 blur-lg"
                      animate={{ 
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    <motion.div 
                      className="relative h-full rounded-xl overflow-hidden aspect-[3/4] md:aspect-auto"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/images/about/Aleks2.jpg"
                        alt="Life balance"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="md:col-span-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="h-full flex flex-col justify-center">
                    <motion.p 
                      className="text-gray-300 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Beyond my professional pursuits, I maintain a rich tapestry of interests that keep me balanced and inspired. Whether it's photography to capture moments of beauty, reading to expand my knowledge horizons, or exploring new cuisines as a window into diverse cultures, these activities feed my curiosity and creativity.
                    </motion.p>
                    <motion.p 
                      className="text-gray-300 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      I believe in the Danish concept of "hygge" — finding joy in life's simple pleasures and cultivating a sense of coziness and well-being. This philosophy guides my approach to work-life integration and reminds me to appreciate the present moment amid our fast-paced digital world.
                    </motion.p>
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      This holistic approach to life enriches my professional work, bringing fresh perspectives and a human-centered mindset to technical challenges. After all, at the intersection of technology and humanity is where the most meaningful innovations happen.
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.div 
            ref={contactRef}
            className="text-center mt-20 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Ready to Connect?
              </span>
            </motion.h3>
            <motion.p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Whether you're interested in collaboration, have questions about my experience, or just want to connect, I'd love to hear from you.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="mailto:aleksaleksandrov670@gmail.com"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.6)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope /> Contact Me
              </motion.a>
              <motion.a
                href="/images/about/Aleks-Aleksandrov-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGraduationCap /> Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Add Footer component with proper styling */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Add subtle animations to follow cursor */}
      <div className="fixed hidden lg:block w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl pointer-events-none z-50"
        style={{
          left: `calc(${mousePosition.x * 100}% + ${window.innerWidth / 2}px)`,
          top: `calc(${mousePosition.y * 100}% + ${window.innerHeight / 2}px)`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
        }}
      />
    </div>
  );
} 