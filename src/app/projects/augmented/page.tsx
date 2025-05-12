"use client";

import React from "react";
import ProjectPage from "@/components/ProjectPage";
import { 
  FaVrCardboard, 
  FaMobileAlt, 
  FaMapMarkedAlt, 
  FaCamera, 
  FaReact, 
  FaUnity
} from "react-icons/fa";
import { 
  SiFirebase, 
  SiTensorflow, 
  SiAdobexd,
  SiGooglecardboard
} from "react-icons/si";
import Preloader from "@/components/shared/Preloader";
import { convertMetrics } from "@/utils/projectHelpers";
import type { Metric } from "@/types/project";

const AugmentedRealityPage = () => {
  const metrics: Metric[] = [
    { value: "95%", label: "User Engagement", icon: <FaMobileAlt className="text-blue-500" size={20} /> },
    { value: "40%", label: "Conversion Rate", icon: <FaVrCardboard className="text-green-500" size={20} /> },
    { value: "3 min", label: "Avg. Session Time", icon: <FaMapMarkedAlt className="text-purple-500" size={20} /> },
  ];

  const results: Metric[] = [
    { value: "95%", label: "User Engagement" },
    { value: "40%", label: "Conversion Rate" },
    { value: "85%", label: "Customer Satisfaction" },
  ];

  const features = [
    {
      title: "Immersive AR Experience",
      description: "Seamless integration of digital content with the real world through advanced augmented reality techniques.",
      icon: <FaVrCardboard className="text-blue-500" size={24} />,
    },
    {
      title: "Geospatial Mapping",
      description: "Precision location-based AR experiences using GPS, compass and advanced spatial mapping.",
      icon: <FaMapMarkedAlt className="text-green-500" size={24} />,
    },
    {
      title: "Real-time Object Detection",
      description: "ML-powered object recognition for contextual AR overlays with minimal latency.",
      icon: <FaCamera className="text-purple-500" size={24} />,
    },
    {
      title: "Cross-platform Compatibility",
      description: "Consistent AR experiences across iOS, Android and web platforms with responsive design.",
      icon: <FaMobileAlt className="text-amber-500" size={24} />,
    },
  ];

  const technologies = [
    { name: "ARCore/ARKit", icon: <SiGooglecardboard className="text-green-500" size={20} /> },
    { name: "Unity", icon: <FaUnity className="text-black dark:text-white" size={20} /> },
    { name: "React Native", icon: <FaReact className="text-blue-400" size={20} /> },
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" size={20} /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" size={20} /> },
    { name: "Adobe XD", icon: <SiAdobexd className="text-purple-600" size={20} /> },
  ];

  const technicalDetails = [
    "Implemented SLAM (Simultaneous Localization and Mapping) for precise spatial tracking",
    "Developed optimized rendering pipeline for mobile devices to maintain 60+ FPS",
    "Created custom shaders for realistic integration of virtual objects with real-world lighting",
    "Built ML model for real-time object recognition with 95% accuracy",
    "Designed cloud backend for multi-user AR experiences with real-time synchronization",
    "Implemented occlusion detection to place virtual objects behind real-world obstacles"
  ];

  return (
    <Preloader text="Loading augmented reality experience...">
      <ProjectPage
        title="Augmented Reality Platform"
        overview="An immersive AR platform that transforms how users interact with physical spaces through spatial computing, machine learning, and real-time 3D visualization."
        teamSize="4"
        duration="6 months"
        role="Lead AR Developer"
        metrics={convertMetrics(metrics)}
        features={features}
        technologies={technologies}
        technicalDetails={technicalDetails}
        results={convertMetrics(results)}
        imagePath="/images/projects/sustain.png"
        heroBackgroundType="particles"
        heroOverlayOpacity={0.2}
        animationIntensity="high"
        heroTextGradient={true}
        heroCtaText="Explore AR Features"
        heroTechnicalText="Technical Architecture"
      />
    </Preloader>
  );
};

export default AugmentedRealityPage; 