"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Links for the footer
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];
  
  // Social links
  const socials = [
    { icon: <FaGithub size={18} />, href: "https://github.com/aleks131", label: "GitHub" },
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/aleks-aleksandrov-42a472238/", label: "LinkedIn" },
    { icon: <FaEnvelope size={18} />, href: "mailto:aleksaleksandrov670@gmail.com", label: "Email" },
  ];
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link 
              href="#home" 
              className="text-2xl font-bold text-gray-800 dark:text-gray-200"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600">
                Aleks Aleksandrov
              </span>
            </Link>
            <div className="relative mt-4 max-w-md">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-lg blur-sm z-0"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 leading-relaxed shadow-sm">
                Global Business Engineering student specializing in project management and data analysis. 
                Based in Aarhus, Denmark, passionate about transforming complex data into actionable insights.
              </p>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Connect</h3>
            <div className="flex flex-col space-y-2">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="relative border-t border-gray-200 dark:border-gray-800">
        {/* Add decorative wave pattern */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform">
          <svg 
            className="relative block w-full h-8 transform -translate-y-3/4" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".1" 
              className="fill-blue-400 dark:fill-blue-600"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".15" 
              className="fill-purple-400 dark:fill-purple-600"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              opacity=".2" 
              className="fill-indigo-400 dark:fill-indigo-600"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.div 
              className="text-center text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-8 py-3 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              © {currentYear} Aleks Aleksandrov. All rights reserved.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 