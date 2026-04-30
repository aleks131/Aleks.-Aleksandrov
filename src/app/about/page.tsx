"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaLinkedin,
  FaWater,
  FaMountain,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaBookOpen,
  FaRegCompass,
  FaEnvelope,
  FaCode,
  FaProjectDiagram,
  FaCertificate,
  FaFileAlt,
  FaLaptopCode,
  FaStar,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaDatabase
} from "react-icons/fa";
import { HiOutlineChevronDown, HiSparkles } from "react-icons/hi";

export default function AboutPage() {
  // Refs for scroll animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Handle mouse move for enhanced parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const xPos = (clientX / windowWidth) - 0.5;
    const yPos = (clientY / windowHeight) - 0.5;

    setMousePosition({ x: xPos, y: yPos });
  };

  // Handle scroll for background effects
  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  useEffect(() => {
    // Set transparent navbar
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("bg-transparent");
      navbar.classList.add("border-transparent");
    }

    return () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.remove("border-transparent");
      }
    };
  }, []);


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Navbar />

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)`,
            x: mousePosition.x * -60,
            y: mousePosition.y * -60,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)`,
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 border border-blue-400/20 rounded-full"
          style={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            rotate: 45
          }}
          animate={{
            rotate: [45, 405],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Dynamic grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) rotate(${scrollY * 0.01}deg)`
          }}
        />

        {/* Floating particles - deterministic positions to avoid hydration errors */}
        {[...Array(25)].map((_, i) => {
          const leftPos = (i * 4 + 5) % 100;
          const topPos = (i * 7 + 10) % 100;
          const duration = 3 + (i % 4) * 0.5;
          const delay = (i % 3) * 0.5;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center px-6 py-20"
          style={{ opacity, scale }}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced Profile Image */}
              <motion.div
                className="relative order-2 lg:order-1"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="relative group mx-auto max-w-md">
                  {/* Subtle glowing background */}
                  <motion.div
                    className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Main image container - Perfect fit, optimized sizes */}
                  <motion.div
                    className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 1.5}deg) rotateY(${mousePosition.x * 1.5}deg)`,
                      transformStyle: "preserve-3d"
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glowing background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <Image
                      src="/images/about/Aleks-portfolio.jpg"
                      alt="Aleks Aleksandrov"
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 relative z-10"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      quality={95}
                    />

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />

                    {/* Animated sparkle effects */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) % 360;
                      const radius = 40 + (i % 3) * 10;
                      const left = 50 + Math.cos(angle * Math.PI / 180) * radius;
                      const top = 50 + Math.sin(angle * Math.PI / 180) * radius;
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full z-30"
                          style={{
                            left: `${left}%`,
                            top: `${top}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2 + (i % 2),
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Profile Info */}
              <motion.div
                className="text-center lg:text-left space-y-8 order-1 lg:order-2"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                {/* Name and title */}
                <div className="space-y-4">
                  <motion.h1
                    className="text-5xl md:text-7xl font-black mb-4 relative"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block">
                      Aleks
                    </span>
                    <br />
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 inline-block">
                      Aleksandrov
                    </span>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.h1>

              <motion.h2
                className="text-xl md:text-3xl text-gray-300 font-light"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-blue-400">Analytics & Automation Engineer</span>
              </motion.h2>
              
              <motion.p
                className="text-base md:text-lg text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                BSc Global Business Engineering · Software Technology Specialization · Graduated Jan 2026
              </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span>Aarhus, Denmark</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-semibold">Languages:</span>
                      <span>English (Fluent), Bulgarian (Native), German (Basic)</span>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Analytics & Automation Engineer with hands-on production experience in Python, SQL, and applied AI-driven workflow systems. Designed and deployed computer vision and automation solutions that reduced manual processes from weeks to days — across both warehouse operations and commercial analytics environments. Driven by the intersection of technical depth and business understanding — building systems that solve real problems reliably and at scale.
                  </motion.p>
                </div>

                {/* Enhanced Stats Grid */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  {[
                    { icon: FaRocket, number: "15+", label: "Projects", color: "from-blue-400 to-cyan-400", bgColor: "from-blue-500/10 to-cyan-500/10" },
                    { icon: FaCode, number: "20+", label: "Technologies", color: "from-purple-400 to-pink-400", bgColor: "from-purple-500/10 to-pink-500/10" },
                    { icon: FaDatabase, number: "4", label: "Years Experience", color: "from-green-400 to-emerald-400", bgColor: "from-green-500/10 to-emerald-500/10" },
                    { icon: FaLightbulb, number: "∞", label: "Innovation", color: "from-orange-400 to-red-400", bgColor: "from-orange-500/10 to-red-500/10" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className={`group relative bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.bgColor} opacity-0`}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10 text-center">
                        <motion.div
                          className="text-2xl mb-3 flex justify-center"
                          whileHover={{
                            rotate: [0, -15, 15, 0],
                            scale: [1, 1.3, 1],
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`} />
                        </motion.div>

                        <motion.p
                          className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.3 + index * 0.1,
                            duration: 0.8
                          }}
                        >
                          {stat.number}
                        </motion.p>

                        <p className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {[
                    { href: "mailto:aleksaleksandrov670@gmail.com", icon: FaEnvelope, label: "Get In Touch", color: "from-blue-500 to-blue-600" },
                    { href: "https://www.linkedin.com/in/aleks-aleksandrov-42a472238/", icon: FaLinkedin, label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                    { href: "/images/about/Aleks-Aleksandrov-CV.pdf", icon: FaGraduationCap, label: "Resume", color: "from-purple-500 to-purple-600" },
                    { href: "/images/about/Aleksreclet.pdf", icon: FaFileAlt, label: "Rec Letter 1", color: "from-gray-500 to-gray-600" },
                    { href: "/images/about/Aleksreclet2.pdf", icon: FaFileAlt, label: "Rec Letter 2", color: "from-gray-600 to-gray-700" }
                  ].map((button, index) => (
                    <motion.a
                      key={index}
                      href={button.href}
                      target={button.href.startsWith('http') ? '_blank' : undefined}
                      rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${button.color} rounded-full text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />

                      <motion.div
                        animate={{
                          scale: button.label === "LinkedIn" ? [1, 1.1, 1] : 1
                        }}
                        transition={{
                          duration: button.label === "GitHub" ? 3 : 2,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                      >
                        <button.icon className="text-lg" />
                      </motion.div>

                      <span className="relative z-10">{button.label}</span>
                    </motion.a>
                  ))}
                </motion.div>

              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          ref={storyRef}
          className="py-20 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  My Journey
                </span>
              </motion.h2>
              <motion.p
                className="text-xl text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                From the mountains of Bulgaria to the innovative landscape of Denmark,
                discover how a journey from warehouse operations to commercial analytics shaped my engineering approach.
              </motion.p>
            </motion.div>

            {/* Story Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Bulgarian Roots",
                  subtitle: "Where it all began",
                  description: "Growing up in the breathtaking Stara Planina mountains, I developed a deep appreciation for nature's complexity and beauty, which later inspired my analytical approach to problem-solving.",
                  image: "/images/about/stara-planina.jpg",
                  icon: FaMountain,
                  color: "from-green-400 to-emerald-500"
                },
                {
                  title: "Outdoor Enthusiast",
                  subtitle: "Finding balance in nature",
                  description: "Hiking, surfing, swimming, and fishing aren't just hobbies—they're my way of staying connected to the natural world while maintaining mental clarity and physical wellness.",
                  image: "/images/about/montain.jpg",
                  icon: FaWater,
                  color: "from-blue-400 to-cyan-500"
                },
                {
                  title: "Denmark Adventure",
                  subtitle: "Embracing new horizons",
                  description: "Moving to Denmark for my Global Business Engineering studies opened my eyes to Scandinavian innovation, sustainability practices, and work-life balance philosophy.",
                  image: "/images/about/Aleks1.JPG",
                  icon: FaGlobe,
                  color: "from-purple-400 to-pink-500"
                },
                {
                  title: "From warehouse floor to system builder",
                  subtitle: "Bridging operations and technology",
                  description: "Progressing from leading operational shifts in the warehouse to designing and deploying three internal full-stack applications that replaced paper workflows. Building solutions that solve real business problems.",
                  image: "/images/projects/data.png",
                  icon: FaProjectDiagram,
                  color: "from-orange-400 to-red-500"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)",
                    borderColor: "rgba(59, 130, 246, 0.3)"
                  }}
                >
                  {/* Background Image - Perfect fit, optimized sizes */}
                  <div className="relative h-72 md:h-96 lg:h-[400px] overflow-hidden bg-gray-900/50">
                    {/* Glowing background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-30 blur-3xl`}
                      animate={{
                        opacity: [0.2, 0.35, 0.2],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 relative z-10"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20" />

                    {/* Icon */}
                    <motion.div
                      className={`absolute top-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center text-white shadow-xl backdrop-blur-sm border-2 border-white/20`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    >
                      <story.icon className="text-xl" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${story.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {story.title}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-gray-400 mb-3 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      {story.subtitle}
                    </motion.p>

                    <motion.p
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      {story.description}
                    </motion.p>
                  </div>

                  {/* Hover effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${story.color} opacity-0 mix-blend-soft-light`}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Personal Philosophy */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative max-w-4xl mx-auto">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <motion.blockquote
                    className="text-2xl md:text-3xl font-light text-gray-200 italic leading-relaxed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    "I understand why a solution needs to exist before I build it, what it needs to do for the people depending on it, and how it needs to hold up over time. I am driven by technical work that creates measurable impact and aim toward roles where strong system design and real business outcomes go hand in hand."
                  </motion.blockquote>

                  <motion.div
                    className="mt-6 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <span className="text-gray-400 font-medium">My Philosophy</span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact CTA Section */}
        <motion.section
          ref={contactRef}
          className="py-20 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Let's Create Something Amazing
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Ready to collaborate on <span className="text-blue-400 font-semibold">automation and analytics</span> projects? 
                I'm always excited to discuss how we can build systems that turn manual processes into scalable, reliable solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="mailto:aleksaleksandrov670@gmail.com"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <FaEnvelope className="text-lg relative z-10" />
                  <span className="relative z-10">Get In Touch</span>
                  <motion.span
                    className="ml-1 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/aleks-aleksandrov-42a472238/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-200 font-semibold text-lg border border-white/20 hover:border-blue-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLinkedin className="text-lg text-blue-400" />
                  <span>Connect on LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Enhanced Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Cursor follower for desktop */}
      <motion.div
        className="fixed hidden lg:block w-6 h-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl pointer-events-none z-50"
        style={{
          left: `${(mousePosition.x + 0.5) * 100}%`,
          top: `${(mousePosition.y + 0.5) * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
            />
    </div>
  );
}
