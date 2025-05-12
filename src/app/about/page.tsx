"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope,
} from "react-icons/fa";

export const dynamic = 'force-static';
export const runtime = 'nodejs';

export default function AboutPage() {
  // Refs for scroll animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h1>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1 }}
            />
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Frontend developer with a passion for creating beautiful, responsive websites and applications.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* My Story Section */}
      <section 
        ref={storyRef}
        className="py-20 bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.p 
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              I am a passionate frontend developer with expertise in modern web technologies, including React, Next.js, and TypeScript. My journey in web development started several years ago, and I've been continuously improving my skills and knowledge ever since.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-20 bg-gray-950"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 rounded-full hover:bg-purple-600 transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="mailto:example@example.com"
              className="p-4 bg-white/10 rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 