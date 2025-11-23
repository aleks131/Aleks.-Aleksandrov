"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaCopy, FaCheckCircle, FaPaperPlane, FaExternalLinkAlt
} from "react-icons/fa";
import SectionTitle from "./shared/SectionTitle";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const copyToClipboard = async (text: string, type: 'email' | 'phone' | 'linkedin') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedLinkedIn(true);
        setTimeout(() => setCopiedLinkedIn(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const contactCards = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "aleksaleksandrov670@gmail.com",
      copyText: "aleksaleksandrov670@gmail.com",
      action: () => copyToClipboard("aleksaleksandrov670@gmail.com", 'email'),
      href: "mailto:aleksaleksandrov670@gmail.com",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
      copyState: copiedEmail
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+45 52 71 37 04",
      copyText: "+4552713704",
      action: () => copyToClipboard("+4552713704", 'phone'),
      href: "tel:+4552713704",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      iconColor: "text-purple-600 dark:text-purple-400",
      copyState: copiedPhone
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Aarhus, Denmark",
      copyText: null,
      action: null,
      href: null,
      gradient: "from-green-500 via-emerald-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      iconColor: "text-green-600 dark:text-green-400",
      copyState: false
    }
  ];
  
  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden" suppressHydrationWarning>
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 blur-3xl"
          style={{ y: y1 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 blur-3xl"
          style={{ y: y2 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <SectionTitle 
          title="Get In Touch"
          subtitle="Ready to collaborate? Let's discuss how we can work together to turn data into insights and build innovative solutions."
        />
        
        <div ref={ref} className="max-w-5xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactCards.map((card, index) => (
          <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
          >
                <motion.div
                  className={`relative bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 h-full overflow-hidden`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      className={`${card.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <card.icon className={`${card.iconColor} text-2xl`} />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {card.title}
                    </h3>
                </div>
                
                  {/* Value and Actions */}
                  <div className="relative z-10">
                    {card.href ? (
                      <a
                        href={card.href}
                        className={`text-gray-700 dark:text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} transition-all duration-300 flex items-center gap-2 group/link mb-4 break-all`}
                      >
                        <span>{card.value}</span>
                        <motion.span
                          className="opacity-0 group-hover/link:opacity-100"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                        </motion.span>
                      </a>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{card.value}</p>
                    )}
                    
                    {card.action && (
                      <motion.button
                        onClick={card.action}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {card.copyState ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="text-green-500"
                            >
                              <FaCheckCircle className="inline mr-1" />
                              Copied!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <FaCopy className="inline mr-1" />
                              Copy
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
            </div>
            
          {/* LinkedIn CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
                <motion.a
                  href="https://www.linkedin.com/in/aleks-aleksandrov-42a472238/"
                  target="_blank"
                  rel="noopener noreferrer"
              className="block relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
                >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm p-4 rounded-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FaLinkedin className="text-white text-4xl" />
              </motion.div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Connect on LinkedIn
                    </h3>
                    <p className="text-blue-100 text-sm md:text-base">
                      Let's connect and explore opportunities together
                    </p>
                  </div>
                </div>
                
                  <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard("https://www.linkedin.com/in/aleks-aleksandrov-42a472238/", 'linkedin');
                  }}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white font-semibold transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  >
                  <AnimatePresence mode="wait">
                    {copiedLinkedIn ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FaCheckCircle className="inline mr-2" />
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FaCopy className="inline mr-2" />
                        Copy Link
                      </motion.span>
                    )}
                  </AnimatePresence>
                  </motion.button>
                
                  <motion.div 
                  className="hidden md:block"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaPaperPlane className="text-white/50 text-2xl" />
                </motion.div>
              </div>
            </motion.a>
                  </motion.div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Looking forward to connecting with you! 🚀
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 