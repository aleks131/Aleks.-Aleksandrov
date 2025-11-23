"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { FaCode, FaChartLine, FaProjectDiagram, FaLaptopCode, FaEnvelope, FaArrowRight, FaLinkedin, FaJava, FaDatabase, FaChartBar } from "react-icons/fa";
import { SiTableau, SiPython, SiReact } from "react-icons/si";
import { DiCssdeck } from "react-icons/di";
import { MdDoubleArrow } from "react-icons/md";
import SectionTitle from "./shared/SectionTitle";

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{
    top: string;
    left: string;
    scale: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setParticlePositions(
        [...Array(6)].map((_, i) => ({
          top: `${20 + (i * 10 + 5)}%`,
          left: `${20 + (i * 12 + 8)}%`,
          scale: 0.5 + (i % 3) * 0.2,
          duration: 2 + (i % 3) * 0.5,
          delay: i * 0.3,
        }))
      );
    }
  }, []);
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
    { value: "15+", label: "Projects Completed", color: "from-blue-400 to-blue-600" },
    { value: "20+", label: "Technologies", color: "from-purple-400 to-purple-600" },
    { value: "∞", label: "Data Passion", color: "from-green-400 to-green-600" },
    { value: "∞", label: "Innovation", color: "from-amber-400 to-amber-600" }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden" suppressHydrationWarning>
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
          subtitle="Passionate about innovation, data engineering, and transforming complex datasets into strategic business intelligence. Visit my full bio to learn about my journey, experiences, and personal interests."
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
                {isMounted && [...Array(6)].map((_, i) => {
                  const topPos = 20 + (i * 10 + 5);
                  const leftPos = 20 + (i * 12 + 8);
                  const scaleVal = 0.5 + (i % 3) * 0.2;
                  const duration = 2 + (i % 3) * 0.5;
                  const delay = i * 0.3;
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-blue-400 rounded-full"
                      style={{
                        top: `${topPos}%`,
                        left: `${leftPos}%`,
                        scale: scaleVal,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                      }}
                      suppressHydrationWarning
                    />
                  );
                })}
              </motion.div>
              
              {/* Enhanced profile frame with 3D effect */}
              <motion.div 
                className="relative w-80 h-80 md:w-96 md:h-96 z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div 
                  className="absolute -inset-6 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Profile image with enhanced frame */}
                <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-gray-900/50 border-2 border-white/10">
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 z-20 pointer-events-none"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Actual profile image */}
                  <Image
                    src="/images/about/Aleks-portfolio.jpg"
                    alt="Aleks Aleksandrov"
                    fill
                    className="object-cover relative z-10 transition-all duration-700 group-hover:scale-110"
                    priority
                    sizes="(max-width: 640px) 320px, 384px"
                    quality={95}
                  />
                  
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-30" />
                  
                  {/* Animated sparkle effects */}
                  {isMounted && [...Array(8)].map((_, i) => {
                    const angle = (i * 45) % 360;
                    const radius = 35 + (i % 3) * 8;
                    const left = 50 + Math.cos(angle * Math.PI / 180) * radius;
                    const top = 50 + Math.sin(angle * Math.PI / 180) * radius;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full z-40"
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
                          duration: 2.5 + (i % 2) * 0.5,
                          repeat: Infinity,
                          delay: i * 0.25,
                        }}
                      />
                    );
                  })}
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
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 relative"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                Data Engineer & Data Scientist
              </span>
            </motion.h3>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-5"
            >
              <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                As a <span className="text-blue-600 dark:text-blue-400 font-semibold">Data Engineer</span> and <span className="text-purple-600 dark:text-purple-400 font-semibold">Data Scientist</span>, I'm driven by innovation in transforming complex datasets into strategic business intelligence. 
                My passion lies in building robust <span className="text-gray-900 dark:text-gray-100 font-semibold">ETL pipelines</span>, designing scalable <span className="text-gray-900 dark:text-gray-100 font-semibold">Data Warehousing</span> solutions, and architecting <span className="text-gray-900 dark:text-gray-100 font-semibold">Cloud-based data platforms</span>.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                Currently working with cutting-edge data science tools, Docker containerization, and modern data engineering practices at <span className="text-blue-600 dark:text-blue-400 font-semibold">Salling Group</span> while pursuing my Global Business Engineering studies at <span className="text-purple-600 dark:text-purple-400 font-semibold">VIA University College</span> in Aarhus, Denmark. 
                I specialize in creating end-to-end data solutions that drive meaningful business impact and innovation.
              </p>
            </motion.div>
            
            {/* Key areas with enhanced card design */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                { 
                  icon: <FaDatabase className="text-blue-600 dark:text-blue-400" size={24} />, 
                  title: "Data Engineering",
                  description: "Building robust ETL pipelines and scalable data architectures",
                  color: "from-blue-500 to-blue-700"
                },
                { 
                  icon: <FaChartLine className="text-purple-600 dark:text-purple-400" size={24} />, 
                  title: "Data Science",
                  description: "Transforming complex datasets into strategic business intelligence",
                  color: "from-purple-500 to-purple-700" 
                },
                { 
                  icon: <FaCode className="text-green-600 dark:text-green-400" size={24} />, 
                  title: "Cloud Architecture",
                  description: "Designing scalable cloud-based data platforms and solutions",
                  color: "from-green-500 to-green-700"
                },
                { 
                  icon: <FaLaptopCode className="text-amber-600 dark:text-amber-400" size={24} />, 
                  title: "Full-Stack Development",
                  description: "Building end-to-end solutions with modern technologies",
                  color: "from-amber-500 to-amber-700"
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
              <Link href="/about" prefetch={true} className="relative inline-flex group">
                <motion.div
                  className="relative inline-flex group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced button glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                    animate={{ 
                      opacity: [0.7, 0.9, 0.7],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <span className="relative z-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-semibold py-3 px-8 rounded-full border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    Read My Full Story
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <MdDoubleArrow />
                    </motion.div>
                  </span>
                </motion.div>
              </Link>
              
              {/* Social links with enhanced hover effect */}
              <div className="flex gap-4 items-center">
                {[
                  { href: "https://www.linkedin.com/in/aleks-aleksandrov-42a472238/", icon: <FaLinkedin size={24} />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600" },
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