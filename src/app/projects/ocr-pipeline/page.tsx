"use client";

import React, { Suspense, lazy } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer } from "@/components/shared";
import {
  FaIndustry,
  FaServer,
  FaDatabase,
  FaCogs,
  FaChartBar,
  FaArrowRight,
  FaPython,
  FaFileImage,
  FaCheckCircle,
  FaMicrosoft,
} from "react-icons/fa";
import type { ProjectData } from "@/types/project";

const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const OCRPipelinePage = () => {
  const metrics = [
    { value: "3,000+", label: "Labels Processed/Batch", icon: <FaFileImage className="text-blue-500" size={20} /> },
    { value: "70%", label: "Time Saved", icon: <FaCheckCircle className="text-green-500" size={20} /> },
    { value: "Automated", label: "Job Runs", icon: <FaCogs className="text-purple-500" size={20} /> },
  ];

  // Bar chart data for extraction time
  const extractionTimeData = {
    labels: ['Manual Extraction', 'Automated Pipeline'],
    datasets: [
      {
        label: 'Processing Time (Days)',
        data: [14, 3.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    }
  };

  const customSections = [
    {
      title: "System Architecture",
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-8 bg-gray-50 dark:bg-white/5 rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-800">
           <div className="flex flex-col items-center min-w-[120px]">
             <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg text-center w-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
               <FaFileImage className="text-3xl text-blue-500 dark:text-blue-400 mb-2 mx-auto" />
               <span className="text-sm font-semibold block text-gray-700 dark:text-gray-200">Raw Images</span>
             </div>
           </div>
           <FaArrowRight className="text-gray-400 dark:text-gray-600 text-xl rotate-90 md:rotate-0 shrink-0" />
           <div className="flex flex-col items-center min-w-[120px]">
             <div className="p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-lg text-center w-full hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors">
               <FaCogs className="text-3xl text-purple-500 dark:text-purple-400 mb-2 mx-auto" />
               <span className="text-sm font-semibold block text-gray-700 dark:text-gray-200">YOLO Detection</span>
             </div>
           </div>
           <FaArrowRight className="text-gray-400 dark:text-gray-600 text-xl rotate-90 md:rotate-0 shrink-0" />
           <div className="flex flex-col items-center min-w-[120px]">
             <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg text-center w-full hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
               <FaCheckCircle className="text-3xl text-green-500 dark:text-green-400 mb-2 mx-auto" />
               <span className="text-sm font-semibold block text-gray-700 dark:text-gray-200">EasyOCR/Tesseract</span>
             </div>
           </div>
           <FaArrowRight className="text-gray-400 dark:text-gray-600 text-xl rotate-90 md:rotate-0 shrink-0" />
           <div className="flex flex-col items-center min-w-[120px]">
             <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg text-center w-full hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors">
               <FaDatabase className="text-3xl text-amber-500 dark:text-amber-400 mb-2 mx-auto" />
               <span className="text-sm font-semibold block text-gray-700 dark:text-gray-200">Structured Output</span>
             </div>
           </div>
        </div>
      ),
    },
    {
      title: "Technologies Used",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <FaPython size={24} />, name: "Python" },
            { icon: <FaMicrosoft size={24} />, name: "Azure ML Studio" },
            { icon: <FaFileImage size={24} />, name: "YOLO" },
            { icon: <FaCheckCircle size={24} />, name: "EasyOCR & Tesseract" },
            { icon: <FaChartBar size={24} />, name: "Power BI" },
            { icon: <FaDatabase size={24} />, name: "Batch Processing" },
          ].map((tech, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center shadow"
            >
              <div className="text-blue-500 mb-2">{tech.icon}</div>
              <div className="font-medium">{tech.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Processing Time Comparison</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Bar data={extractionTimeData} options={barChartOptions} />
              </Suspense>
            </ChartContainer>
          </motion.div>
        </div>
      ),
    },
  ];

  const projectData: ProjectData = {
    title: "Computer Vision & OCR Automation Pipeline",
    overview: "An automated pipeline using YOLO and OCR technologies (Tesseract, EasyOCR) to reduce extraction time from 2 weeks to 3-4 days per batch, deployed via Azure ML Studio.",
    teamSize: "1",
    duration: "Completed",
    role: "Automation Engineer",
    metrics: metrics,
    features: [
      {
        title: "Object Detection",
        description: "Robust detection of text regions on 3,000+ product labels utilizing YOLO algorithms.",
        icon: <FaFileImage className="text-blue-500" size={24} />,
      },
      {
        title: "Optical Character Recognition",
        description: "Intelligent text extraction with Tesseract OCR and EasyOCR for high accuracy across diverse label formats.",
        icon: <FaCheckCircle className="text-purple-500" size={24} />,
      },
      {
        title: "Automated Job Validation",
        description: "Pipelines mapping business requirements to technical execution deployed in Azure ML Studio.",
        icon: <FaIndustry className="text-green-500" size={24} />,
      },
      {
        title: "KPI Integration",
        description: "Visualization and ongoing performance tracking of extraction quality using Power BI.",
        icon: <FaChartBar className="text-amber-500" size={24} />,
      },
    ],
    customSections: customSections
  };
  
  const technicalDetails = [
    "Developed a Python-based pipeline for automated image extraction.",
    "Integrated YOLO for robust region-of-interest bounding box detection.",
    "Created modular preprocessing and post-processing steps to handle varying image qualities.",
    "Deployed automated job schedules in Azure ML Studio to replace manual workflows."
  ];
  
  return (
    <ProjectPage
      title={projectData.title}
      overview={projectData.overview}
      teamSize={projectData.teamSize}
      duration={projectData.duration}
      role={projectData.role}
      metrics={metrics}
      features={projectData.features}
      technicalDetails={technicalDetails}
      imagePath="/images/projects/ocr_pipeline.png"
      customSections={customSections}
      heroBackgroundType="waves"
      heroOverlayOpacity={0.2}
      animationIntensity="medium"
      secondaryImagePath="/images/projects/ocr_pipeline.png"
      heroTextGradient={true}
      heroCtaText="View Pipeline Details"
      heroTechnicalText="Explore Architecture"
    />
  );
};

export default OCRPipelinePage;
