"use client";

import React, { Suspense, lazy, useEffect } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer, MetricsGrid } from "@/components/shared";
import { registerChart } from "@/utils/chartUtils";
import {
  FaImages,
  FaCloud,
  FaSync,
  FaCalendar,
  FaClock,
  FaFileExcel,
  FaDesktop,
  FaCode,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiGoogledrive } from "react-icons/si";
import Preloader from "@/components/shared/Preloader";
import type { Metric } from "@/types/project";
import { convertMetrics } from "@/utils/projectHelpers";

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const SmartGalleryPage = () => {
  useEffect(() => {
    registerChart();
  }, []);

  const metrics: Metric[] = [
    { value: "100%", label: "Automation", icon: <FaSync className="text-blue-500" size={20} /> },
    { value: "5 min", label: "Update Time", icon: <FaClock className="text-green-500" size={20} /> },
    { value: "Zero", label: "Paper Waste", icon: <FaImages className="text-purple-500" size={20} /> },
  ];

  const results: Metric[] = [
    { value: "100%", label: "Process Automation" },
    { value: "90%", label: "Time Saved" },
    { value: "Zero", label: "Paper Usage" },
  ];

  // Chart data for content updates
  const updateData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Content Updates',
        data: [12, 15, 10, 18, 14],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for content types
  const contentTypeData = {
    labels: ['Images', 'Videos', 'Schedules', 'Announcements'],
    datasets: [
      {
        label: 'Content Distribution',
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options with proper typing
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const customSections = [
    {
      title: "System Analytics",
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Daily Content Updates</h3>
            <ChartContainer>
              <Line data={updateData} options={chartOptions} />
            </ChartContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Content Type Distribution</h3>
            <ChartContainer>
              <Bar data={contentTypeData} options={chartOptions} />
            </ChartContainer>
          </motion.div>

          <MetricsGrid metrics={metrics} />
        </div>
      ),
    },
  ];

  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" size={20} /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-400" size={20} /> },
    { name: "Google Drive API", icon: <SiGoogledrive className="text-green-400" size={20} /> },
    { name: "VBA", icon: <FaFileExcel className="text-green-600" size={20} /> },
    { name: "Excel", icon: <FaFileExcel className="text-green-400" size={20} /> },
    { name: "Cloud Storage", icon: <FaCloud className="text-blue-400" size={20} /> },
  ];

  const features = [
    {
      title: "Real-time Sync",
      description: "Instant content updates through Google Drive integration, automatically detecting and displaying new or modified content.",
      icon: <FaSync className="text-blue-500" size={24} />,
    },
    {
      title: "Smart Scheduling",
      description: "Automated schedule updates using VBA-powered Excel integration, converting daily plans to visual displays.",
      icon: <FaCalendar className="text-green-500" size={24} />,
    },
    {
      title: "Multi-format Support",
      description: "Seamless handling of various content types including images, videos, and dynamic schedule displays.",
      icon: <FaImages className="text-purple-500" size={24} />,
    },
    {
      title: "Remote Management",
      description: "Easy content management from anywhere through Google Drive access, eliminating the need for physical updates.",
      icon: <FaCloud className="text-yellow-500" size={24} />,
    },
  ];

  const technicalDetails = [
    "Implemented real-time file monitoring using Google Drive API",
    "Created VBA scripts for automated Excel data extraction",
    "Developed responsive image and video galleries with Next.js",
    "Implemented automatic format conversion for various file types",
    "Created a caching system for optimal performance",
    "Designed fail-safe mechanisms for continuous operation",
  ];

  return (
    <Preloader text="Loading smart gallery experience...">
      <ProjectPage 
        title="Smart Gallery & Screen"
        overview="A Next.js-powered digital signage solution with real-time content synchronization from Google Drive and automated schedule updates through Excel integration."
        teamSize="1"
        duration="8 weeks"
        role="Full Stack Developer"
        metrics={convertMetrics(metrics)}
        features={features}
        technologies={technologies}
        results={convertMetrics(results)} 
        technicalDetails={technicalDetails}
        imagePath="/images/projects/gallery.png"
        customSections={customSections}
        heroBackgroundType="particles"
        heroOverlayOpacity={0.2}
        animationIntensity="medium"
        heroTextGradient={true}
        heroCtaText="View Gallery Details"
        heroTechnicalText="Technical Implementation"
      />
    </Preloader>
  );
};

export default SmartGalleryPage; 