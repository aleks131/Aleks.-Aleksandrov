"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaGithub, FaTwitter, FaPaperPlane, FaCheckCircle 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Parallax effects for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity1 = useTransform(scrollYProgress, [0.6, 1], [1, 0.3]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  // Direct email link handler
  const handleDirectEmail = () => {
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio Website');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:aleksaleksandrov670@gmail.com?subject=${subject}&body=${body}`);
    
    // Reset form after opening email client
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };
  
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
  
  const bubbleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };
  
  // Contact info items with icons, titles, and text
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      content: "aleksaleksandrov670@gmail.com",
      link: "mailto:aleksaleksandrov670@gmail.com",
      color: "blue"
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: ["+45 52 71 37 04", "+359 88 91 56 255"],
      link: ["tel:+4552713704", "tel:+359889156255"],
      color: "purple"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "Aarhus, Denmark",
      color: "green"
    }
  ];
  
  // Social links with icons and URLs
  const socialLinks = [
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/aleks-aleksandrov-42a472238/",
      color: "blue",
      name: "LinkedIn"
    },
    {
      icon: FaGithub,
      url: "https://github.com/aleks131",
      color: "gray",
      name: "GitHub"
    }
  ];
  
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Moving gradient blobs */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 blur-3xl"
          style={{ y: y1 }}
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
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 blur-3xl"
          style={{ y: y2 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration:
            10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
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
        {/* Updated title to match SectionTitle component styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative inline-block mb-4"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative px-6 py-2">
              <span className="absolute -left-6 -top-1">
                <HiSparkles className="text-yellow-400" size={24} />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600">
                Get in Touch
              </span>
            </h2>
          </motion.div>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-2"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Reach out through one of the contact methods below or use the form to send me a direct message.
          </motion.p>
        </motion.div>
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact info - 5 columns */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Enhanced contact cards */}
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`rounded-xl p-3 flex items-center justify-center ${
                    item.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                    item.color === "purple" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" :
                    "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  }`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                    {Array.isArray(item.content) ? (
                      <div className="space-y-1">
                        {item.content.map((text, i) => (
                          <div key={i} className="text-gray-600 dark:text-gray-400">
                            {item.link && Array.isArray(item.link) ? (
                              <a 
                                href={item.link[i]} 
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1"
                              >
                                {text}
                              </a>
                            ) : (
                              text
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400">
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1"
                          >
                            {item.content}
                          </a>
                        ) : (
                          item.content
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Enhanced social links with Cards */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 
                      ${social.color === "blue" ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400" : 
                        "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                    whileHover={{ y: -3, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Form - 7 columns */}
          <motion.div 
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl text-center flex flex-col items-center justify-center gap-6 h-96"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.8, 1] }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center"
                >
                  <FaCheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </motion.div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Message Ready to Send!</h4>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Your email client should have opened with your message. Just click send to deliver it directly to me.
                </p>
                <motion.button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) :
              <motion.form 
                variants={itemVariants} 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDirectEmail();
                }} 
                className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <motion.label 
                      htmlFor="name" 
                      className={`absolute left-4 ${focusedField === 'name' || formData.name ? '-top-2.5 text-xs' : 'top-3 text-sm'} font-medium transition-all duration-200 ${focusedField === 'name' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} px-1 bg-white dark:bg-gray-800 z-10`}
                      animate={{ 
                        top: focusedField === 'name' || formData.name ? -10 : 12,
                        fontSize: focusedField === 'name' || formData.name ? 12 : 14
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Name
                    </motion.label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="relative">
                    <motion.label 
                      htmlFor="email" 
                      className={`absolute left-4 ${focusedField === 'email' || formData.email ? '-top-2.5 text-xs' : 'top-3 text-sm'} font-medium transition-all duration-200 ${focusedField === 'email' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} px-1 bg-white dark:bg-gray-800 z-10`}
                      animate={{ 
                        top: focusedField === 'email' || formData.email ? -10 : 12,
                        fontSize: focusedField === 'email' || formData.email ? 12 : 14
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Email
                    </motion.label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <motion.label 
                    htmlFor="subject" 
                    className={`absolute left-4 ${focusedField === 'subject' || formData.subject ? '-top-2.5 text-xs' : 'top-3 text-sm'} font-medium transition-all duration-200 ${focusedField === 'subject' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} px-1 bg-white dark:bg-gray-800 z-10`}
                    animate={{ 
                      top: focusedField === 'subject' || formData.subject ? -10 : 12,
                      fontSize: focusedField === 'subject' || formData.subject ? 12 : 14
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Subject
                  </motion.label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="relative">
                  <motion.label 
                    htmlFor="message" 
                    className={`absolute left-4 ${focusedField === 'message' || formData.message ? '-top-2.5 text-xs' : 'top-3 text-sm'} font-medium transition-all duration-200 ${focusedField === 'message' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} px-1 bg-white dark:bg-gray-800 z-10`}
                    animate={{ 
                      top: focusedField === 'message' || formData.message ? -10 : 12,
                      fontSize: focusedField === 'message' || formData.message ? 12 : 14
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Message
                  </motion.label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 flex items-center justify-center gap-2 rounded-xl text-white font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    <span>Open Email Client</span>
                    <RiSendPlaneFill size={18} />
                  </motion.button>
                </motion.div>
                
                <div className="text-center pt-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    This will open your default email client with a pre-filled message.
                  </p>
                </div>
              </motion.form>
            }
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 