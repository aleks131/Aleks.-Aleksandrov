"use client";

import React from "react";
import ProjectPage from "@/components/ProjectPage";
import { FaRobot, FaBrain, FaCode, FaChartLine, FaUsers, FaServer } from "react-icons/fa";
import Preloader from "@/components/shared/Preloader";

const AIChatbotPage = () => {
  const metrics = [
    { value: "80%", label: "Reduction in Response Time", icon: <FaRobot className="text-blue-500" size={24} /> },
    { value: "95%", label: "Customer Satisfaction", icon: <FaUsers className="text-green-500" size={24} /> },
    { value: "50%", label: "Cost Reduction", icon: <FaChartLine className="text-purple-500" size={24} /> },
  ];

  const features = [
    {
      title: "Natural Language Processing",
      description: "Advanced NLP capabilities enabling human-like conversations and context understanding.",
      icon: <FaBrain className="text-blue-500" size={24} />,
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive dashboard for monitoring conversation metrics and user satisfaction.",
      icon: <FaChartLine className="text-green-500" size={24} />,
    },
    {
      title: "Multi-language Support",
      description: "Seamless communication in 5 different languages with automatic translation.",
      icon: <FaUsers className="text-purple-500" size={24} />,
    },
    {
      title: "Customizable Responses",
      description: "Easy-to-use interface for training and customizing bot responses.",
      icon: <FaRobot className="text-amber-500" size={24} />,
    },
  ];

  const technologies = [
    { name: "Python", icon: <FaCode className="text-blue-600" size={20} /> },
    { name: "TensorFlow", icon: <FaBrain className="text-orange-600" size={20} /> },
    { name: "React", icon: <FaCode className="text-blue-500" size={20} /> },
    { name: "Node.js", icon: <FaServer className="text-green-600" size={20} /> },
  ];

  const technicalDetails = [
    "Implemented a context management system using LSTM networks and conversation history tracking",
    "Built optimized model architecture with caching for common queries to improve response time",
    "Developed multi-language support with automated translation service integration",
    "Created comprehensive analytics dashboard for monitoring conversation metrics"
  ];

  return (
    <Preloader text="Loading AI chatbot experience...">
      <ProjectPage
        title="AI-Powered Customer Service Chatbot"
        overview="An intelligent chatbot system that revolutionized customer service by providing instant, accurate responses and reducing response time by 80%."
        teamSize="5"
        duration="6 months"
        role="Lead Developer"
        metrics={metrics}
        features={features}
        technologies={technologies}
        technicalDetails={technicalDetails}
        results={metrics}
        imagePath="/images/projects/ai-chatbot.png"
        heroBackgroundType="grid"
        heroOverlayOpacity={0.2}
        animationIntensity="medium"
        heroTextGradient={true}
        heroCtaText="Explore Chatbot Features"
        heroTechnicalText="Technical Implementation"
      />
    </Preloader>
  );
};

export default AIChatbotPage; 