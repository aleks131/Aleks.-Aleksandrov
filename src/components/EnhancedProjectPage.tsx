"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowDown, FaStar, FaCode, FaChartLine } from "react-icons/fa";
import { SparklesCore } from "@/components/ui/sparkles";
import { useInView } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ProjectData } from "@/types/project";

interface EnhancedProjectPageProps extends ProjectData {
  heroImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  results?: {
    value: string | number;
    label: string;
  }[];
  technicalDetails?: string;
  techStack?: {
    name: string;
    icon: React.ReactNode;
    color: string;
  }[];
  challenges?: {
    title: string;
    description: string;
    solution: string;
  }[];
  process?: {
    phase: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const EnhancedProjectPage: React.FC<EnhancedProjectPageProps> = ({
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
  heroImage,
  githubUrl,
  liveUrl,
  techStack,
  challenges,
  process,
  customSections = [],
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const isInView = useInView(heroRef, { once: true });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 3D tilt effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section with 3D Effects */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#6366f1"
          />
        </div>

        {/* 3D Parallax Hero Content */}
        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
            rotateX: mousePosition.y * 10,
            rotateY: mousePosition.x * 10,
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {overview}
            </motion.p>

            {/* Project Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {teamSize && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Team Size</h3>
                  <p className="text-3xl font-bold text-blue-600">{teamSize}</p>
                </div>
              )}
              {duration && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Duration</h3>
                  <p className="text-3xl font-bold text-purple-600">{duration}</p>
                </div>
              )}
              {role && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Role</h3>
                  <p className="text-3xl font-bold text-pink-600">{role}</p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                  View Code
                </motion.a>
              )}
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaArrowDown className="text-gray-400 text-2xl" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Tech Stack Section */}
      {techStack && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Tech Stack
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`text-4xl mb-4 ${tech.color}`}>{tech.icon}</div>
                  <h3 className="font-semibold">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {feature.icon && (
                    <div className="text-3xl mb-4 text-blue-600">{feature.icon}</div>
                  )}
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Development Process Section */}
      {process && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Development Process
            </motion.h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600"></div>
              
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:mr-12' : 'md:mr-auto md:ml-12'} md:w-1/2`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="absolute top-6 -left-3 w-6 h-6 rounded-full bg-blue-600"></div>
                    <div className="text-2xl mb-4 text-blue-600">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.phase}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions Section */}
      {challenges && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Challenges & Solutions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4">{challenge.title}</h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Challenge:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{challenge.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Solution:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{challenge.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Results & Impact
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {results.map((result: { value: string | number; label: string }, index: number) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">{result.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{result.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.map((section, index) => (
        <section
          key={index}
          className={`py-20 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {section.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {section.content}
            </motion.div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default EnhancedProjectPage; 