"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaPython, FaReact, FaDatabase, FaAws, 
  FaDocker, FaGitAlt, FaMicrosoft, FaNodeJs,
  FaChartBar, FaJava, FaHtml5, FaCss3Alt, FaJs,
  FaCode, FaTable, FaFileExcel, FaChartPie,
  FaBrain, FaLightbulb
} from "react-icons/fa";
import { SiTableau, SiDotnet } from "react-icons/si";
import { HiSparkles } from "react-icons/hi";
import SectionTitle from "./shared/SectionTitle";

// Skill card type
interface SkillCardType {
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

// Memoized skill card component for better performance
const SkillCard = React.memo(({ skill, index }: { skill: SkillCardType, index: number }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-sm bg-white dark:bg-gray-800 
        border border-gray-100 dark:border-gray-700 relative group/skill overflow-hidden hover:shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        transition: { 
          delay: 0.03 * index,
          duration: 0.4,
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 }
      }}
    >
      {/* Subtle background gradient */}
      <div className={`absolute inset-0 opacity-10 ${skill.color}`} />
      
      <div className="mb-4 relative">
        {skill.icon}
      </div>
      <h4 className="font-medium text-center text-gray-800 dark:text-gray-200">{skill.name}</h4>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{skill.category}</span>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

// Memoized skill pill component for better performance
const SkillPill = React.memo(({ skill, index }: { skill: { name: string, color: string }, index: number }) => {
  return (
    <motion.div 
      key={skill.name}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        transition: { 
          delay: 0.03 * index,
          duration: 0.4,
        }
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`${skill.color} px-5 py-2.5 rounded-full font-medium shadow-sm 
        hover:shadow-md transition-all duration-300 flex items-center gap-2`}
    >
      <span className="w-2 h-2 rounded-full bg-white/70 inline-block"></span>
      {skill.name}
    </motion.div>
  );
});

SkillPill.displayName = "SkillPill";

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Enhanced parallax effect for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  
  // Skills by category with softer colors for better contrast
  const dataAnalysisSkills = useMemo(() => [
    { name: "Python", color: "bg-blue-400 text-blue-50" },
    { name: "SQL", color: "bg-indigo-400 text-indigo-50" },
    { name: "Power BI", color: "bg-amber-400 text-amber-50" },
    { name: "Excel", color: "bg-emerald-400 text-emerald-50" },
    { name: "R", color: "bg-sky-400 text-sky-50" },
    { name: "Datasphere", color: "bg-violet-400 text-violet-50" },
    { name: "Tableau", color: "bg-blue-300 text-blue-800" },
    { name: "Data Gathering", color: "bg-rose-400 text-rose-50" }
  ], []);
  
  const programmingSkills = useMemo(() => [
    { name: "Java", color: "bg-orange-400 text-orange-50" },
    { name: "C#", color: "bg-indigo-400 text-indigo-50" },
    { name: "HTML/CSS", color: "bg-rose-400 text-rose-50" },
    { name: "JavaScript", color: "bg-amber-300 text-amber-800" },
    { name: ".NET", color: "bg-blue-400 text-blue-50" },
    { name: "React", color: "bg-sky-400 text-sky-50" },
    { name: "Node.js", color: "bg-emerald-400 text-emerald-50" }
  ], []);
  
  const projectManagementSkills = useMemo(() => [
    { 
      name: "Agile Methodology", 
      color: "bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white", 
      icon: <FaGitAlt className="text-white" size={20} /> 
    },
    { 
      name: "Leadership", 
      color: "bg-gradient-to-br from-violet-500/80 to-violet-600/80 text-white", 
      icon: <FaChartBar className="text-white" size={20} /> 
    },
    { 
      name: "Time Management", 
      color: "bg-gradient-to-br from-emerald-500/80 to-emerald-600/80 text-white", 
      icon: <FaTable className="text-white" size={20} /> 
    },
    { 
      name: "Risk Assessment", 
      color: "bg-gradient-to-br from-rose-500/80 to-rose-600/80 text-white", 
      icon: <FaChartPie className="text-white" size={20} /> 
    }
  ], []);
  
  // Tools and technologies in card format with more subtle gradient backgrounds
  const skillCards = useMemo(() => [
    { name: "Python", icon: <FaPython size={32} className="text-blue-500" />, category: "Programming", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "R", icon: <FaChartBar size={32} className="text-blue-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "Java", icon: <FaJava size={32} className="text-orange-500" />, category: "Programming", color: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40" },
    { name: "C#", icon: <FaCode size={32} className="text-indigo-500" />, category: "Programming", color: "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40" },
    { name: "HTML5", icon: <FaHtml5 size={32} className="text-orange-500" />, category: "Web Development", color: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40" },
    { name: "CSS3", icon: <FaCss3Alt size={32} className="text-blue-500" />, category: "Web Development", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "JavaScript", icon: <FaJs size={32} className="text-yellow-500" />, category: "Web Development", color: "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40" },
    { name: ".NET", icon: <SiDotnet size={32} className="text-blue-600" />, category: "Web Development", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "SQL", icon: <FaDatabase size={32} className="text-blue-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "Power BI", icon: <FaChartPie size={32} className="text-amber-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40" },
    { name: "Excel", icon: <FaFileExcel size={32} className="text-emerald-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40" },
    { name: "Tableau", icon: <SiTableau size={32} className="text-blue-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "Datasphere", icon: <FaChartBar size={32} className="text-violet-500" />, category: "Data & Analytics", color: "bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/40" },
    { name: "Azure ML", icon: <FaMicrosoft size={32} className="text-blue-500" />, category: "Cloud", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
    { name: "Agile", icon: <FaGitAlt size={32} className="text-orange-500" />, category: "Project Management", color: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40" },
    { name: "Azure", icon: <FaMicrosoft size={32} className="text-blue-500" />, category: "Cloud", color: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" },
  ], []);
  
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Simplified animated background with fewer elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient blobs with reduced animation complexity */}
        <motion.div 
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-300/10 dark:bg-blue-600/10 rounded-full filter blur-[100px]"
          style={{ y: y1, x: -50 }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-0 w-[550px] h-[550px] bg-violet-300/10 dark:bg-violet-600/10 rounded-full filter blur-[100px]"
          style={{ y: y2, x: 50 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Enhanced grid pattern with parallax */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px), radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px, 90px 90px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Replace custom heading with SectionTitle component */}
        <SectionTitle 
          title="Technical Skills"
          subtitle="A comprehensive set of technical capabilities spanning data analysis, programming, web development, and cloud technologies that power my portfolio projects."
          icon={<HiSparkles className="text-amber-400" size={24} />}
        />
        
        {/* Skills sections with better spacing */}
        <div ref={ref} className="space-y-16">
          {/* Data Analysis Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md relative z-10 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <FaChartPie className="text-blue-500 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                  Data Analysis
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-violet-400 mt-2 rounded-full"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {dataAnalysisSkills.map((skill, index) => (
                  <SkillPill key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Programming Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md relative z-10 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
                  <FaCode className="text-violet-500 dark:text-violet-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
                  Programming & Web Development
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-violet-400 to-indigo-400 mt-2 rounded-full"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {programmingSkills.map((skill, index) => (
                  <SkillPill key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        
          {/* Project Management Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md relative z-10 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                  <FaLightbulb className="text-emerald-500 dark:text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                  Project Management Skills
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-blue-400 mt-2 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectManagementSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className={`${skill.color} p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3`}
                  >
                    <div className="p-2 bg-white/20 rounded-full">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium text-base">{skill.name}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Technologies and Tools with improved performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md relative z-10 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <FaBrain className="text-blue-500 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                  Technologies & Tools
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-violet-400 mt-2 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skillCards.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 