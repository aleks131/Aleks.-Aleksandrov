"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { FaCode, FaChartLine, FaProjectDiagram, FaLaptopCode, FaEnvelope, FaArrowRight, FaLinkedin, FaGithub, FaJava, FaDatabase, FaChartBar } from "react-icons/fa";
import { SiTableau, SiPython, SiReact } from "react-icons/si";
import { DiCssdeck } from "react-icons/di";
import { MdDoubleArrow } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import SectionTitle from "./shared/SectionTitle";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Parallax effect for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Use rotate with MotionValue<number> for types to be correct
  const rotateMotion = { rotate: rotateReverse };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const statItems = [
    { value: "10+", label: "Projects Completed", color: "from-blue-400 to-blue-600" },
    { value: "4+", label: "Data Analysis Tools", color: "from-purple-400 to-purple-600" },
    { value: "5+", label: "Technical Skills", color: "from-green-400 to-green-600" },
    { value: "3", label: "Languages", color: "from-amber-400 to-amber-600" }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Moving gradient blobs */}
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/10 rounded-full filter blur-3xl"
          style={{ y: y1, x: -50, scale }}
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
          className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full filter blur-3xl"
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
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-green-200/20 dark:bg-green-900/10 rounded-full filter blur-3xl"
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
          className="absolute top-40 right-10 w-64 h-64 border border-gray-200 dark:border-gray-700 rounded-full opacity-30"
          style={{ rotate }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-32 h-32 border border-gray-200 dark:border-gray-700 rounded-full opacity-20"
          style={rotateMotion}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        {/* Replace custom heading with SectionTitle component */}
        <SectionTitle 
          title="About Me"
          subtitle="Passionate about turning data into actionable insights and building solutions that make a difference. Visit my full bio to learn about my journey, hobbies, and personal interests."
          icon={<IoSparkles className="text-yellow-400" size={24} />}
        />

        {/* Main content */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image and stats columns - take 5 of 12 columns */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative flex justify-center mb-12">
              {/* Animated sparkles around image */}
              <motion.div
                className="absolute -inset-4 z-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Enhanced profile frame with 3D effect */}
              <motion.div 
                className="relative w-80 h-80 z-10"
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
                
                {/* Profile image with enhanced frame */}
                <div className="relative w-full h-full overflow-hidden rounded-3xl border-4 border-white dark:border-gray-800 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-white dark:bg-gray-800">
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-10"
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Profile content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-7xl font-bold mb-2">AA</div>
                      <div className="flex justify-center">
                        <BsStars className="text-yellow-300 text-xl" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-md"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-md"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl-md"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/50 rounded-br-md"></div>
                  
                  {/* You can uncomment and use when you have an actual image */}
                  {/* <Image
                    src="/your-photo.jpg"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  /> */}
                </div>
              </motion.div>
              
              {/* Enhanced floating tech icons */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ 
                  scale: { duration: 0.5, delay: 0.2 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <SiPython className="text-blue-500" size={24} />
              </motion.div>
              <motion.div 
                className="absolute top-12 -right-8 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ 
                  scale: { duration: 0.5, delay: 0.3 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <SiTableau className="text-blue-700" size={24} />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -8, 0], rotate: [0, -3, 0] }}
                transition={{ 
                  scale: { duration: 0.5, delay: 0.4 },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <FaDatabase className="text-yellow-500" size={24} />
              </motion.div>
              <motion.div 
                className="absolute bottom-10 -left-10 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, 8, 0], rotate: [0, 4, 0] }}
                transition={{ 
                  scale: { duration: 0.5, delay: 0.5 },
                  y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <SiReact className="text-blue-400" size={24} />
              </motion.div>
            </div>
            
            {/* Stats with enhanced design */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {statItems.map((stat, i) => (
                <motion.div
                  key={i}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Card content */}
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    {/* Top corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r ${stat.color} rotate-45 transform origin-bottom-left opacity-70`}></div>
                    </div>
                    
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-1 relative z-10">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm relative z-10">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* About text content - take 7 of 12 columns */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 relative"
            >
              <span className="inline-block">
                <motion.span
                  className="absolute -left-5 -top-1 text-blue-500 opacity-70"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IoSparkles size={22} />
                </motion.span>
                Global Business Engineering Student & Data Enthusiast
              </span>
            </motion.h3>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                I'm a 23-year-old Global Business Engineering student from Aarhus, Denmark, with a passion for <span className="text-blue-600 dark:text-blue-400 font-semibold relative inline-block px-1">
                  <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-md -z-10"></span>
                  transforming complex data into actionable insights
                </span>. Currently specializing in data analytics and project management, I bridge the gap between technical implementation and business strategy.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                With a background spanning both <span className="text-purple-600 dark:text-purple-400 font-semibold relative inline-block px-1">
                  <span className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-md -z-10"></span>
                  software development and business analytics
                </span>, I bring a unique perspective to problem-solving. I thrive in environments where I can leverage data to drive decision-making and optimize business processes.
              </p>
            </motion.div>
            
            {/* Key areas with enhanced card design */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                { 
                  icon: <FaChartLine className="text-blue-600 dark:text-blue-400" size={24} />, 
                  title: "Data Analysis",
                  description: "Transforming raw data into actionable business insights",
                  color: "from-blue-500 to-blue-700"
                },
                { 
                  icon: <FaProjectDiagram className="text-purple-600 dark:text-purple-400" size={24} />, 
                  title: "Project Management",
                  description: "Leading cross-functional teams with Agile methodology",
                  color: "from-purple-500 to-purple-700" 
                },
                { 
                  icon: <FaCode className="text-green-600 dark:text-green-400" size={24} />, 
                  title: "Software Development",
                  description: "Building solutions with Python, Java, C#, and web technologies",
                  color: "from-green-500 to-green-700"
                },
                { 
                  icon: <FaLaptopCode className="text-red-600 dark:text-red-400" size={24} />, 
                  title: "Business Intelligence",
                  description: "Creating interactive dashboards and predictive models",
                  color: "from-red-500 to-red-700"
                },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="relative group overflow-hidden"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-30 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                  
                  {/* Card content */}
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 relative">
                    <div className="mt-1 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 relative">
                      {/* Icon gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 rounded-lg -z-10"></div>
                      
                      {/* Subtle accent border */}
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                      
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Action buttons with enhanced design */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-6 items-center"
            >
              <Link href="/about" passHref>
                <motion.div
                  className="relative inline-flex group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-200 animate-pulse"></div>
                  
                  <button className="relative z-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-semibold py-3 px-8 rounded-full border border-gray-200 dark:border-gray-700 hover:border-transparent transition-colors duration-300 flex items-center gap-2">
                    Read My Full Story
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <MdDoubleArrow />
                    </motion.div>
                  </button>
                </motion.div>
              </Link>
              
              {/* Social links with enhanced hover effect */}
              <div className="flex gap-4 items-center">
                {[
                  { href: "https://linkedin.com/in/yourusername", icon: <FaLinkedin size={24} />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600" },
                  { href: "https://github.com/yourusername", icon: <FaGithub size={24} />, color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700" },
                  { href: "#contact", icon: <FaEnvelope size={24} />, color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600" },
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    className={`p-3 rounded-full ${link.color} transform hover:scale-110 transition-all duration-300`}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 