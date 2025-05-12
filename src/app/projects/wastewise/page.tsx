"use client";

import React from "react";
import ProjectPage from "@/components/ProjectPage";
import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaRobot, FaChartLine, FaTrash, FaWifi, FaCube, FaMicrochip } from "react-icons/fa";
import { SiArduino } from "react-icons/si";
import { registerChart, chartOptions } from "@/utils/chartUtils";
import LazyChart from "@/components/shared/LazyChart";

// Define local Metric interface matching ProjectPage's Metric interface
interface LocalMetric {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

// ChartContainer component for handling responsive chart displays
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-[300px]">
    {children}
  </div>
);

// Define the main component
const WasteWisePage = () => {
  // Register chart.js components
  if (typeof window !== 'undefined') {
    registerChart();
  }

  // Set some local chart options
  const localChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Define metrics for the WasteWise project
  const metrics: LocalMetric[] = [
    { value: "85%", label: "Waste Reduction", icon: <FaTrash className="text-green-500" /> },
    { value: "75%", label: "Cost Efficiency", icon: <FaChartLine className="text-blue-500" /> },
    { value: "95%", label: "Sorting Accuracy", icon: <FaRobot className="text-purple-500" /> },
  ];

  // Chart data for waste processing
  const wasteProcessingData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Organic Waste (tons)',
        data: [12, 19, 15, 22, 18, 24],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Recyclables (tons)',
        data: [8, 15, 12, 17, 19, 21],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Chart data for sorting accuracy
  const sortingAccuracyData = {
    labels: ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic'],
    datasets: [
      {
        label: 'Sorting Accuracy (%)',
        data: [92, 88, 95, 97, 85],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define custom sections
  const customSections = [
    {
      title: "Performance Metrics",
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Weekly Waste Processing Trends</h3>
            <ChartContainer>
              <LazyChart 
                type="line"
                data={wasteProcessingData} 
                options={localChartOptions}
                height={300}
              />
            </ChartContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Sorting Accuracy by Material Type</h3>
            <ChartContainer>
              <LazyChart 
                type="bar"
                data={sortingAccuracyData} 
                options={localChartOptions}
                height={300}
              />
            </ChartContainer>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{metric.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  // Define core project data with minimal type issues
  const projectData = {
    title: "WasteWise",
    overview: "An intelligent waste management system revolutionizing trash handling with automated sorting and compacting capabilities, powered by IoT technology.",
    teamSize: "6",
    duration: "8 weeks",
    role: "Design Lead",
    features: [
      {
        title: "Automated Waste Sorting",
        description: "Advanced sensor system using machine learning algorithms to accurately identify and sort different types of waste materials.",
        icon: <FaRobot className="text-blue-500" size={24} />,
      },
      {
        title: "Real-time Monitoring",
        description: "IoT-enabled sensors providing continuous updates on fill levels, helping optimize collection schedules and routes.",
        icon: <FaChartLine className="text-green-500" size={24} />,
      },
      {
        title: "Smart Compacting",
        description: "Automated compression mechanism that reduces waste volume, maximizing container capacity and reducing collection frequency.",
        icon: <FaTrash className="text-purple-500" size={24} />,
      },
      {
        title: "IoT Connectivity",
        description: "Wireless communication system enabling remote monitoring, data collection, and system management through a central dashboard.",
        icon: <FaWifi className="text-yellow-500" size={24} />,
      },
    ],
    customSections,
  };

  // Define additional properties to be passed directly to ProjectPage
  const technologies = [
    { name: "CAD Design", icon: <FaCube className="text-blue-400" size={20} /> },
    { name: "IoT Sensors", icon: <FaMicrochip className="text-green-400" size={20} /> },
    { name: "Arduino", icon: <SiArduino className="text-teal-400" size={20} /> },
    { name: "3D Printing", icon: <FaCube className="text-purple-400" size={20} /> },
    { name: "Automation", icon: <FaRobot className="text-pink-400" size={20} /> },
    { name: "Wireless Communication", icon: <FaWifi className="text-yellow-400" size={20} /> },
  ];

  const technicalDetails = [
    "Implemented machine learning models for waste classification using TensorFlow",
    "Designed custom PCB layouts for sensor integration",
    "Developed Arduino-based control systems for automated sorting mechanisms",
    "Created 3D-printed prototypes for mechanical components",
    "Integrated IoT connectivity using ESP32 modules",
    "Implemented real-time data visualization dashboard",
  ];

  // Define results using the local interface
  const results: LocalMetric[] = [
    { value: "95%", label: "Sorting Accuracy Achieved" },
    { value: "60%", label: "Space Efficiency Improved" },
    { value: "40%", label: "Collection Costs Reduced" },
  ];

  // Return with explicit props rather than using spread
  return (
    <ProjectPage
      title={projectData.title}
      overview={projectData.overview}
      teamSize={projectData.teamSize}
      duration={projectData.duration}
      role={projectData.role}
      features={projectData.features}
      customSections={projectData.customSections}
      metrics={metrics}
      technologies={technologies}
      technicalDetails={technicalDetails}
      results={results}
      imagePath="/images/projects/Trash.png"
    />
  );
};

export default WasteWisePage; 