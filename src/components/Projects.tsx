"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  FaExternalLinkAlt, FaChartLine, FaUsers, FaClock, 
  FaTrophy, FaCode, FaLaptopCode, FaPalette, FaLightbulb,
  FaArrowRight, FaGithub, FaEye
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MdDesignServices } from "react-icons/md";
import SectionTitle from "./shared/SectionTitle";

// Optimized image path getter with fallback support
const getImagePath = (path: string) => {
  if (!path || path.trim() === '') {
    return '/images/projects/placeholder.jpg';
  }
  
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  return path;
};

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  path: string;
  category: "data-analysis" | "web-development" | "project-management" | "design";
  kpis?: { value: string; label: string }[];
  stats?: {
    completion: number;
    teamSize: string;
    duration: string;
    impact: string;
  };
}

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();
  
  // Create references for the card and tracking mouse position
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Reduce animation complexity for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  // More efficient card animations with better performance
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "50px" }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle shine effect for cards */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(circle at var(--x) var(--y), rgba(255, 255, 255, 0.8) 0%, transparent 60%)",
          "--x": `${mousePosition.x}px`,
          "--y": `${mousePosition.y}px`
        } as React.CSSProperties}
      />
    
      {/* Project image with enhanced contrast and clarity */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getImagePath(project.image)}
          alt={project.title}
          width={600}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          priority={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQ1NmZmMjUiIC8+PC9zdmc+"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 brightness-110 contrast-110"
        />
        
        {/* Improved overlay for better text contrast and readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-700/85 to-indigo-900/85 mix-blend-multiply opacity-85 group-hover:opacity-75 transition-opacity duration-300"
          style={{
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)'
          }}
        />
        
        {/* Project title with improved shadow for better readability */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{project.title}</h3>
          
          {/* Project stats with better contrast */}
          <div className="flex items-center gap-3 text-white">
            {project.stats && (
              <>
                <div className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                  <FaUsers className="text-white text-sm" />
                  <span className="text-sm font-medium">{project.stats.teamSize} {parseInt(project.stats.teamSize) === 1 ? 'member' : 'members'}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                  <FaClock className="text-white text-sm" />
                  <span className="text-sm font-medium">{project.stats.duration}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Project details with cleaner layout */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm md:text-base">
          {project.description}
        </p>

        {/* KPI Cards with improved contrast and visual hierarchy */}
        {project.kpis && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.kpis.map((kpi, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 text-center border border-blue-100/50 dark:border-blue-700/30 group-hover:border-blue-200 dark:group-hover:border-blue-600/30 transition-all duration-300"
              >
                <div className="z-10">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    {kpi.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags with better contrast */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Button with better accessibility */}
        <button
          onClick={() => router.push(project.path)}
          className="mt-auto w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <span className="flex items-center gap-2">
            View Project Details <FaArrowRight size={14} />
          </span>
        </button>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Parallax effects for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // Enhanced project data with stats
  const projects: Project[] = [
    {
      id: 1,
      title: "Carbon Footprint Tracker",
      description: "A comprehensive .NET-based carbon tracking system developed for Siemens Gamesa, enabling real-time monitoring and reduction of carbon emissions across manufacturing operations.",
      image: "/images/projects/carbon.png",
      tags: [".NET", "C#", "Azure", "Industrial IoT", "Data Analytics"],
      path: "/projects/carbon-tracker",
      category: "data-analysis",
      kpis: [
        { value: "30%", label: "Carbon Reduction" },
        { value: "85%", label: "Data Accuracy" },
        { value: "24/7", label: "Monitoring" },
      ],
      stats: {
        completion: 100,
        teamSize: "1",
        duration: "12 weeks",
        impact: "High",
      },
    },
    {
      id: 2,
      title: "Smart Gallery & Screen",
      description: "A Next.js-powered digital signage solution with real-time content synchronization from Google Drive and automated schedule updates through Excel integration.",
      image: "/images/projects/gallery.png",
      tags: ["Next.js", "TypeScript", "Google Drive API", "VBA", "Cloud"],
      path: "/projects/smart-gallery",
      category: "web-development",
      kpis: [
        { value: "100%", label: "Automation" },
        { value: "5 min", label: "Update Time" },
        { value: "Zero", label: "Paper Waste" },
      ],
      stats: {
        completion: 100,
        teamSize: "1",
        duration: "8 weeks",
        impact: "Medium",
      },
    },
    {
      id: 3,
      title: "SustainovationHub",
      description: "An e-commerce platform connecting eco-conscious consumers with sustainable products. Features include seller verification, impact tracking, and community engagement.",
      image: "/images/projects/sustain.png",
      tags: ["React", "Node.js", "MySQL", "E-commerce"],
      path: "/projects/sustainovationhub",
      category: "web-development",
      kpis: [
        { value: "500+", label: "Verified Sellers" },
        { value: "60%", label: "Space Saved" },
        { value: "85%", label: "User Satisfaction" },
      ],
      stats: {
        completion: 100,
        teamSize: "4",
        duration: "10 weeks",
        impact: "High",
      },
    },
    {
      id: 4,
      title: "Solar Panel Monitoring System",
      description: "A comprehensive monitoring system for tracking solar panel performance and energy generation at Ejby Maskinfabrik, featuring advanced analytics and reporting capabilities.",
      image: "/images/projects/solar.png",
      tags: ["Java", "PostgreSQL", "Analytics", "Energy"],
      path: "/projects/solar-monitoring",
      category: "data-analysis",
      kpis: [
        { value: "25K", label: "kWh Generated" },
        { value: "92%", label: "System Efficiency" },
        { value: "45%", label: "Cost Reduction" },
      ],
      stats: {
        completion: 90,
        teamSize: "3",
        duration: "8 weeks",
        impact: "Medium",
      },
    },
    {
      id: 5,
      title: "WasteWise – Smart Trash Can",
      description: "A user-centered design project for an intelligent waste management system featuring smart sorting and compacting capabilities, improving waste disposal efficiency.",
      image: "/images/projects/Trash.png",
      tags: ["CAD", "Research", "Design", "Prototyping"],
      path: "/projects/wastewise",
      category: "design",
      kpis: [
        { value: "95%", label: "Sorting Accuracy" },
        { value: "60%", label: "Space Efficiency" },
        { value: "40%", label: "Cost Reduction" },
      ],
      stats: {
        completion: 80,
        teamSize: "2",
        duration: "6 weeks",
        impact: "Low",
      },
    },
    {
      id: 6,
      title: "International Market Selection Software",
      description: "A data-driven software solution for Guldmann A/S to analyze and select optimal international markets for expansion, utilizing comprehensive market analysis.",
      image: "/images/projects/ims.png",
      tags: ["Market Analysis", "Data Analytics", "Java", "Power BI"],
      path: "/projects/ims",
      category: "data-analysis",
      kpis: [
        { value: "90%", label: "Decision Accuracy" },
        { value: "50+", label: "Markets Analyzed" },
        { value: "65%", label: "Faster Decisions" },
      ],
      stats: {
        completion: 70,
        teamSize: "5",
        duration: "10 weeks",
        impact: "Medium",
      },
    },
    {
      id: 7,
      title: "Handmade",
      description: "An e-commerce platform designed for artisans to showcase and sell their handcrafted products with customizable storefronts, enhancing the online presence of small businesses.",
      image: "/images/projects/handmade.png",
      tags: ["UX/UI", "Strategy", "Research", "E-commerce"],
      path: "/projects/handmade",
      category: "design",
      kpis: [
        { value: "85%", label: "User Satisfaction" },
        { value: "40%", label: "Sales Growth" },
        { value: "60%", label: "Engagement" },
      ],
      stats: {
        completion: 90,
        teamSize: "3",
        duration: "8 weeks",
        impact: "High",
      },
    },
    {
      id: 8,
      title: "Data Visualization Dashboard",
      description: "A comprehensive business intelligence dashboard providing real-time insights into key performance indicators, helping organizations make data-driven decisions.",
      image: "/images/projects/data.png",
      tags: ["Power BI", "SQL", "Data Visualization", "Analytics"],
      path: "/projects/data-viz",
      category: "data-analysis",
      kpis: [
        { value: "40%", label: "Faster Decisions" },
        { value: "25+", label: "Daily Reports" },
        { value: "95%", label: "Satisfaction" },
      ],
      stats: {
        completion: 60,
        teamSize: "4",
        duration: "6 weeks",
        impact: "Low",
      },
    },
  ];

  // Enhanced filter buttons
  const filterButtons = [
    { name: "All", value: "all", icon: FaTrophy },
    { name: "Data Analysis", value: "data-analysis", icon: FaChartLine },
    { name: "Web Development", value: "web-development", icon: FaLaptopCode },
    { name: "Project Management", value: "project-management", icon: FaClock },
    { name: "Design", value: "design", icon: MdDesignServices },
  ];

  // Optimized filter handler
  const handleFilterChange = useCallback((value: string) => {
    setActiveFilter(value);
    setFilteredProjects(
      value === "all" ? projects : projects.filter((project) => project.category === value)
    );
  }, []);

  // Initial filter setup
  useEffect(() => {
    handleFilterChange("all");
  }, [handleFilterChange]);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full filter blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/20 dark:bg-purple-900/10 rounded-full filter blur-3xl"
          style={{ y: y2, rotate: rotate2 }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Code particles */}
        <div className="absolute top-1/4 left-10">
          <motion.div 
            className="text-blue-300/20 dark:text-blue-500/10 text-4xl"
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaCode />
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 right-10">
          <motion.div 
            className="text-purple-300/20 dark:text-purple-500/10 text-5xl"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, -10, 0],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          >
            <FaLightbulb />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Replace custom heading with SectionTitle component */}
        <SectionTitle 
          title="Featured Projects"
          subtitle="A showcase of my creative and technical projects spanning data analysis, web development, and innovative design solutions."
          icon={<HiSparkles className="text-yellow-400" size={24} />}
        />

        {/* Enhanced filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map((button, index) => (
            <motion.button
              key={button.value}
              onClick={() => handleFilterChange(button.value)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === button.value
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button.icon size={16} />
              {button.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid with staggered animations */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 