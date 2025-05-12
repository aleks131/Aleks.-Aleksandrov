"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaBars, FaTimes, FaFilePdf, FaFileAlt, FaChevronDown, FaProjectDiagram, FaCode, FaLaptopCode, FaHome, FaUser, FaBriefcase, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { projects } from "@/config/projects";
import { usePathname } from 'next/navigation';
import { IoSparkles } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import { HiOutlineSparkles } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname?.includes('/projects/');
  const navRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]
  );
  const navBackgroundDark = useTransform(
    scrollY,
    [0, 50],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]
  );
  const blurValue = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  );
  const navShadow = useTransform(
    scrollY,
    [0, 50],
    ["0 0 0 rgba(0,0,0,0)", "0 10px 30px -10px rgba(0,0,0,0.1)"]
  );
  
  // Handle scroll effect for non-transform properties
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links with icons for visual enhancement
  const navLinks = [
    { name: "Home", href: "/", icon: <FaHome className="text-blue-500" size={16} /> },
    { name: "About", href: "/#about", icon: <FaUser className="text-purple-500" size={16} /> },
    { name: "Skills", href: "/#skills", icon: <FaCode className="text-green-500" size={16} /> },
    { name: "Experience", href: "/#experience", icon: <FaBriefcase className="text-amber-500" size={16} /> },
    { name: "Contact", href: "/#contact", icon: <FaEnvelope className="text-red-500" size={16} /> },
  ];

  // Project page links need to have full paths
  const getHref = (href: string) => {
    if (isProjectPage && href.startsWith('#')) {
      return `/${href}`;
    }
    return href;
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300"
      ref={navRef}
      style={{ 
        boxShadow: navShadow,
        backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
        background: isScrolled ? 'var(--background)' : 'transparent'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo - visible on all screen sizes */}
        <Link href="/" className="flex items-center z-50">
          <motion.div
            className="relative flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative h-12 w-12 flex items-center justify-center"
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <IoSparkles className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600" />
            </motion.div>
          </motion.div>
        </Link>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex items-center justify-center">
          <motion.div 
            className="relative bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg rounded-full px-4 py-3 flex items-center shadow-lg border border-white/20 dark:border-gray-700/20"
            whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1 * index,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 150
                }}
                className="relative mx-1"
              >
                <Link
                  href={getHref(link.href)}
                  className={`text-base font-medium px-7 py-3 rounded-full flex items-center gap-2.5 transition-all ${
                    (pathname === link.href || (pathname === "/" && link.href === "/")) 
                      ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white font-semibold shadow-lg' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Projects Dropdown */}
            <motion.div
              className="relative mx-1.5"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.4,
                type: "spring",
                stiffness: 150
              }}
              onHoverStart={() => setIsProjectsOpen(true)}
              onHoverEnd={() => setIsProjectsOpen(false)}
            >
              <div 
                className={`text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center gap-2.5 cursor-pointer transition-all ${pathname?.includes('/projects') ? 'bg-white/90 dark:bg-gray-700/90 text-blue-600 dark:text-blue-400 font-semibold shadow-md' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <span className="text-lg transform group-hover:scale-110 transition-transform">
                  <FaProjectDiagram className="text-indigo-500" />
                </span>
                <span>Projects</span>
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`}
                />
              </div>
              
              <AnimatePresence>
                {isProjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl py-2 z-50 border border-white/50 dark:border-gray-700/50"
                  >
                    <Link href={getHref('#projects')}>
                      <div className="px-4 py-2 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white dark:hover:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 cursor-pointer font-medium">
                        View All Projects
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    
                    {projects.map((project, index) => (
                      <Link key={index} href={project.path}>
                        <div className="px-4 py-2 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white dark:hover:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 cursor-pointer flex items-center gap-2 group transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-white transform group-hover:scale-125 transition-all duration-300"></div>
                          <span className="transition-transform group-hover:translate-x-1 duration-200">{project.name}</span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </nav>

        {/* Right Side - CV and Recommendation Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="/images/about/Aleks-Aleksandrov-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-700 text-white text-base font-medium rounded-full shadow-md hover:shadow-blue-500/20 hover:shadow-xl transition-all relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <span className="absolute -inset-x-full -inset-y-24 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -rotate-45 transition-all duration-700 group-hover:translate-x-full"></span>
            <FaFilePdf size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            <span className="relative z-10">Resume</span>
          </motion.a>
          <motion.a
            href="/images/about/Aleksreclet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-base font-medium text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:shadow-gray-500/20 dark:hover:shadow-gray-700/20 hover:shadow-xl transition-all relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px -5px rgba(107, 114, 128, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <span className="absolute -inset-x-full -inset-y-24 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent transform -rotate-45 transition-all duration-700 group-hover:translate-x-full"></span>
            <FaFileAlt size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            <span className="relative z-10">Recommendation</span>
          </motion.a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-end w-full items-center">
          {/* Mobile Menu Button */}
          <motion.button
            className="text-foreground z-50 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 dark:border-gray-700/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-40 flex flex-col items-center justify-between pt-20 pb-10"
              initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 pointer-events-none"></div>
              
              <nav className="flex flex-col items-center w-full px-6 relative z-10">
                {/* Main nav links - larger and more touch-friendly */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="w-full mb-4"
                  >
                    <Link
                      href={link.href}
                      className={`text-xl font-semibold py-4 px-6 rounded-xl flex items-center gap-4 w-full ${
                        pathname === link.href 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="bg-white/80 dark:bg-gray-700/80 p-3 rounded-full shadow-sm">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Projects dropdown for mobile - collapsible */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full mb-4"
                >
                  <motion.button
                    className={`text-xl font-semibold py-4 px-6 rounded-xl flex items-center justify-between gap-4 w-full
                      ${pathname?.includes('/projects') 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50'}
                    `}
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-4">
                      <span className="bg-white/80 dark:bg-gray-700/80 p-3 rounded-full shadow-sm">
                        <FaProjectDiagram className="text-indigo-500" />
                      </span>
                      <span>Projects</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown />
                    </motion.span>
                  </motion.button>
                  
                  {/* Projects list - collapsible */}
                  <AnimatePresence>
                    {isProjectsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-14 pr-4"
                      >
                        <div className="pt-2 pb-2 space-y-3">
                          {projects.map((project, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                            >
                              <Link 
                                href={project.path} 
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsProjectsOpen(false);
                                }}
                                className="flex items-center py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              >
                                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></span>
                                <span>{project.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Mobile CV and Recommendation - full width buttons */}
                <motion.div
                  className="flex flex-col gap-3 w-full mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="/images/about/Aleks-Aleksandrov-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-blue-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaFilePdf size={20} /> Download Resume
                  </motion.a>
                  <motion.a
                    href="/images/about/Aleksreclet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 text-lg font-medium text-gray-800 dark:text-gray-200 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaFileAlt size={20} /> View Recommendation
                  </motion.a>
                </motion.div>
              </nav>
              
              {/* Social links at bottom of mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-auto pt-8 flex flex-col items-center"
              >
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Connect with me</p>
                <div className="flex gap-6">
                  <motion.a
                    href="https://www.linkedin.com/in/aleks-aleksandrov-42a472238/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                  <motion.a
                    href="https://github.com/aleks131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={24} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar; 