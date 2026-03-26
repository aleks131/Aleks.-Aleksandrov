"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaFilePdf, FaFileAlt, FaChevronDown, FaProjectDiagram, FaCode, FaHome, FaUser, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { projects } from "@/config/projects";
import { usePathname } from 'next/navigation';
import { CgWorkAlt } from "react-icons/cg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll effect only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links with icons for visual enhancement
  const navLinks = [
    { name: "Home", href: "/", section: "home", icon: <FaHome className="text-blue-500" size={16} /> },
    { name: "About", href: "/#about", section: "about", icon: <FaUser className="text-purple-500" size={16} /> },
    { name: "Skills", href: "/#skills", section: "skills", icon: <FaCode className="text-green-500" size={16} /> },
    { name: "Experience", href: "/#experience", section: "experience", icon: <FaBriefcase className="text-amber-500" size={16} /> },
    { name: "Contact", href: "/#contact", section: "contact", icon: <FaEnvelope className="text-red-500" size={16} /> },
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
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
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
      {/* Mobile Navigation - Always Visible at Top */}
      <nav className="md:hidden w-full bg-white dark:bg-gray-900 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 py-3 px-4 overflow-x-auto scrollbar-hide shadow-md">
        <div className="flex items-center gap-2 min-w-max">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link
                href={getHref(link.href)}
                prefetch={true}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  pathname === link.href || (link.section && pathname === `/#${link.section}`)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80'
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </motion.div>
          ))}
          
          {/* Projects Link */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={getHref('#projects')}
              prefetch={true}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                pathname?.includes('/projects')
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80'
              }`}
            >
              <span className="text-sm">
                <FaProjectDiagram className="text-indigo-500" />
              </span>
              <span>Projects</span>
            </Link>
          </motion.div>
          
          {/* Mobile Resume Button */}
          <motion.a
            href="/images/about/Aleks-Aleksandrov-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md whitespace-nowrap"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FaFilePdf size={14} />
            <span>Resume</span>
          </motion.a>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden md:block py-4">
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo - Empty space for cleaner look */}
          <div className="w-12"></div>

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
                  prefetch={true}
                  className="text-base font-medium px-7 py-3 rounded-full flex items-center gap-2.5 transition-all relative text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30"
              >
                  <span className="text-lg relative z-10">{link.icon}</span>
                  <span className="relative z-10">{link.name}</span>
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
            <span className="relative z-10">Rec. Letter 1</span>
          </motion.a>
          <motion.a
            href="/images/about/Aleksreclet2.pdf"
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
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <span className="absolute -inset-x-full -inset-y-24 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent transform -rotate-45 transition-all duration-700 group-hover:translate-x-full"></span>
            <FaFileAlt size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            <span className="relative z-10">Rec. Letter 2</span>
          </motion.a>
        </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Navbar; 