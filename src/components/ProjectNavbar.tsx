"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaGithub, FaLinkedin, FaProjectDiagram, FaChevronDown } from 'react-icons/fa';
import { projects, Project } from '@/config/projects';

const ProjectNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaHome className="text-2xl text-blue-500" />
              <span className="text-lg font-semibold">Portfolio</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            {/* Projects Dropdown */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaProjectDiagram size={20} />
                <span className="text-lg font-medium">Projects</span>
                <FaChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                />
              </motion.div>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-2 z-50"
                  >
                    <Link href="/#projects">
                      <div 
                        className="px-4 py-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Projects
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    {projects.map((project: Project, index: number) => (
                      <Link key={index} href={project.path}>
                        <div 
                          className="px-4 py-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 cursor-pointer"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {project.name}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaLinkedin size={24} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ProjectNavbar; 