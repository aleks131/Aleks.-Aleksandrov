"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaBuilding,
  FaAward,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTools,
  FaCheckCircle,
  FaLaptopCode,
  FaChartBar,
  FaDatabase,
  FaServer
} from "react-icons/fa";
import { SiPython, SiTableau, SiJavascript } from "react-icons/si";
import SectionTitle from "./shared/SectionTitle";

// Experience item type with added fields
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  type: "work" | "education" | "award";
  icon: React.ReactNode;
  skills?: string[]; // Added field for skills
  achievements?: string[]; // Added field for key achievements
  gradient?: string; // Added field for custom gradient
}

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Parallax effect for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  // Enhanced experience items with skills and achievements
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Bachelor's in Global Business Engineering",
      company: "VIA University College",
      location: "Denmark",
      duration: "Aug 2021 - Jan 2026",
      description: [
        "Focusing on Software Engineering, Data Analytics, and Business Strategy",
        "Delivering data-focused projects using various tools and techniques",
        "Developing technical and analytical skills for solving complex business challenges"
      ],
      skills: ["Data Analysis", "Software Engineering", "Business Strategy", "Project Management"],
      achievements: [
        "Delivering data-focused projects using Python, SQL, and BI tools",
        "Developing technical skills through practical applications"
      ],
      type: "education",
      icon: <FaGraduationCap className="text-purple-600 dark:text-purple-400" />,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Intern, Trade Planning and Pricing",
      company: "Salling Group",
      location: "Denmark",
      duration: "Feb 2025 - Jun 2025",
      description: [
        "Spearheading a system migration project, enhancing reporting processes and accuracy",
        "Automating workflows, streamlining operations and improving efficiency",
        "Developing a reporting system to enable strategic decision-making"
      ],
      skills: ["Data Analysis", "Process Automation", "Strategic Planning", "System Migration"],
      achievements: [
        "Enhanced reporting processes through system migration",
        "Improved operational efficiency through workflow automation"
      ],
      type: "work",
      icon: <FaBriefcase className="text-blue-600 dark:text-blue-400" />,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Production Assistant (Part-Time)",
      company: "Salling Group Warehouse",
      location: "Denmark",
      duration: "Nov 2021 - March 2025",
      description: [
        "Supporting inventory management using data tools, ensuring operational precision",
        "Excelling in a fast-paced environment with strong organizational skills",
        "Managing warehouse operations and supporting logistics processes"
      ],
      skills: ["Inventory Management", "Data Tools", "Logistics", "Organizational Skills"],
      achievements: [
        "Maintained operational precision through effective inventory management",
        "Developed strong organizational skills in a fast-paced environment"
      ],
      type: "work",
      icon: <FaBriefcase className="text-blue-600 dark:text-blue-400" />,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: 4,
      title: "Waiter & Construction Worker",
      company: "Various Locations",
      location: "Bulgaria",
      duration: "2016 - 2019",
      description: [
        "Cultivated resilience, teamwork, and adaptability through diverse roles",
        "Developed strong interpersonal skills while working in customer-facing positions",
        "Gained practical experience in multiple industries, building a diverse skill set"
      ],
      skills: ["Teamwork", "Adaptability", "Customer Service", "Problem Solving"],
      achievements: [
        "Demonstrated versatility through work in diverse roles and industries",
        "Built strong foundation of soft skills applicable to business environments"
      ],
      type: "work",
      icon: <FaBriefcase className="text-blue-600 dark:text-blue-400" />,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 5,
      title: "High School Diploma, Mathematics & English",
      company: "Vasil Drumev High School",
      location: "Veliko Tarnovo, Bulgaria",
      duration: "Graduated 2020",
      description: [
        "Completed specialized program with focus on Mathematics and English",
        "Developed strong analytical thinking and communication skills",
        "Built foundation for further education in technical and business fields"
      ],
      type: "education",
      icon: <FaGraduationCap className="text-purple-600 dark:text-purple-400" />,
      gradient: "from-amber-500 to-yellow-600"
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Map of skill to icon
  const skillIconMap: Record<string, React.ReactNode> = {
    "SQL": <FaDatabase className="text-blue-500" />,
    "Power BI": <FaChartBar className="text-yellow-500" />,
    "Excel": <FaChartBar className="text-green-500" />,
    "Data Visualization": <FaChartBar className="text-purple-500" />,
    "Java": <SiJavascript className="text-red-500" />,
    "PostgreSQL": <FaDatabase className="text-blue-700" />,
    "Python": <SiPython className="text-blue-500" />,
    "Tableau": <SiTableau className="text-blue-400" />,
    "Team Leadership": <FaBriefcase className="text-indigo-500" />,
    "Project Management": <FaClock className="text-purple-500" />,
    "Analytics": <FaChartBar className="text-green-600" />,
  };
  
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Moving gradient blobs */}
        <motion.div 
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-700/10 rounded-full filter blur-[100px]"
          style={{ y: y1, x: -50 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-700/10 rounded-full filter blur-[100px]"
          style={{ y: y2, x: 50 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-green-500/5 dark:bg-green-700/10 rounded-full filter blur-[100px]"
          style={{ y: y3 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-40 right-10 w-80 h-80 border border-gray-200 dark:border-gray-700 rounded-full opacity-20"
          style={{ rotate }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-40 h-40 border border-gray-200 dark:border-gray-700 rounded-full opacity-10"
          style={{ rotate: rotateReverse }}
        />
        
        {/* Subtle grid pattern with parallax */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px), radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px, 90px 90px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Replace custom heading with SectionTitle component */}
        <SectionTitle 
          title="Experience & Education"
          subtitle="My educational journey and professional experiences that have shaped my skills and knowledge."
        />
        
        {/* Enhanced Timeline with better animations */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative max-w-5xl mx-auto"
        >
          {/* Enhanced timeline line with animations */}
          <motion.div 
            className="absolute left-8 md:left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full transform -translate-x-1/2"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '100%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              height: { duration: 1.5, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="absolute top-0 left-0 right-0 bottom-0 bg-white/50 dark:bg-white/20 filter blur-sm"
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, 1000, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Timeline items with enhanced animations */}
          {experiences.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-20 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot with pulse animation */}
              <motion.div 
                className="absolute left-8 md:left-1/2 w-16 h-16 bg-white dark:bg-gray-800 border-4 border-blue-600 dark:border-blue-500 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10 shadow-lg"
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  boxShadow: { duration: 0.3 },
                  rotate: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                {/* Pulsing effect behind icon */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  whileHover={{ 
                    scale: 1.3,
                    rotate: 360
                  }}
                  transition={{ duration: 0.5 }}
                >
                {item.icon}
                </motion.div>
              </motion.div>
              
              {/* Enhanced Content Card */}
              <motion.div 
                className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] relative group`}
                whileHover={{ 
                  y: -12, 
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient || "from-blue-600 to-indigo-600"} rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.7 }}
                />
                
                {/* Card with gradient header */}
                <div className={`relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full`}>
                  {/* Gradient Header */}
                  <div className={`p-5 bg-gradient-to-r ${item.gradient || "from-blue-600 to-indigo-600"} text-white relative overflow-hidden`}>
                    {/* Moving light effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full"
                      animate={{
                        x: ["100%", "-100%"],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                    />
                    
                    {/* Icon in header with hover effects */}
                    <motion.div 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mb-3 shadow-inner relative overflow-hidden group-hover:shadow-lg"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full"
                        animate={{
                          x: ["100%", "-100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      />
                      {item.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                    
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-white/90">
                        <FaBuilding className="text-white/80" />
                    <span>{item.company}</span>
                  </div>
                      
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                    <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                          <FaCalendarAlt />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content with animations */}
                  <div className="p-5">
                    {/* Description */}
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                        <span className="h-0.5 w-5 bg-blue-500 mr-2"></span>
                        Overview
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        {item.description.map((desc, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <span className="mt-1 text-blue-500">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">{desc}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {/* Skills with animations */}
                    {item.skills && item.skills.length > 0 && (
                      <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <span className="h-0.5 w-5 bg-purple-500 mr-2"></span>
                          Skills & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                              whileHover={{ 
                                scale: 1.1, 
                                backgroundColor: "rgba(99, 102, 241, 0.1)",
                                color: "#4F46E5",
                                transition: { duration: 0.2 } 
                              }}
                            >
                              <span className="text-lg">
                                {skillIconMap[skill] || <FaTools className="text-gray-500" />}
                              </span>
                              <span className="font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                            </motion.div>
                          ))}
                </div>
                      </motion.div>
                    )}
                    
                    {/* Achievements with animations */}
                    {item.achievements && item.achievements.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <span className="h-0.5 w-5 bg-green-500 mr-2"></span>
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.15 * i }}
                            >
                              <motion.span 
                                className="mt-1 text-green-500"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <FaCheckCircle className="w-4 h-4" />
                              </motion.span>
                              <span className="group-hover:translate-x-1 transition-transform duration-300">{achievement}</span>
                            </motion.li>
                  ))}
                </ul>
                      </motion.div>
                    )}
                    
                    {/* Experience Type Badge with animations */}
                    <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <motion.span 
                        className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                  item.type === "work" 
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
                    : item.type === "education"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        }`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                  {item.type === "work" ? "Experience" : item.type === "education" ? "Education" : "Award"}
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 