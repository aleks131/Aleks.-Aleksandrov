"use client";

import React, { Suspense, lazy, useEffect } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer, MetricsGrid } from "@/components/shared";
import Preloader from "@/components/shared/Preloader";
import { registerChart, chartOptions } from "@/utils/chartUtils";
import {
  FaIndustry,
  FaChartLine,
  FaCloud,
  FaServer,
  FaDatabase,
  FaCogs,
  FaChartBar,
  FaLeaf,
  FaWindows,
} from "react-icons/fa";
import { SiDotnet } from "react-icons/si";
import type { ProjectData } from "@/types/project";

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const CarbonTrackerPage = () => {
  const metrics = [
    { value: "55%", label: "Emissions Reduced", icon: <FaLeaf className="text-green-500" size={20} /> },
    { value: "24/7", label: "Monitoring", icon: <FaChartLine className="text-blue-500" size={20} /> },
    { value: "10+", label: "Industries Served", icon: <FaIndustry className="text-purple-500" size={20} /> },
    { value: "15TB", label: "Data Processed", icon: <FaDatabase className="text-amber-500" size={20} /> },
  ];

  // Line chart data for emissions trend
  const emissionsTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'This Year',
        data: [65, 59, 80, 81, 56, 55, 40, 38, 35, 30, 25, 20],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Last Year',
        data: [85, 82, 80, 78, 76, 72, 70, 68, 65, 60, 55, 50],
        fill: false,
        borderColor: 'rgb(201, 203, 207)',
        borderDash: [5, 5],
        tension: 0.1
      }
    ]
  };

  // Bar chart data for emission sources
  const emissionSourcesData = {
    labels: ['Energy', 'Transport', 'Materials', 'Waste', 'Processes', 'Other'],
    datasets: [
      {
        label: 'CO2 Emissions (tonnes)',
        data: [120, 80, 60, 40, 30, 20],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Configure chart options with proper type assertions
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as 'index',
        intersect: false,
      }
    },
    hover: {
      mode: 'nearest' as 'nearest',
      intersect: true
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Emissions (tonnes CO2)'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as 'index',
        intersect: false,
      }
    }
  };

  // Custom sections for the project page
  const customSections = [
    {
      title: "Technologies Used",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <FaServer size={24} />, name: "C# .NET" },
            { icon: <FaDatabase size={24} />, name: "Azure SQL" },
            { icon: <FaWindows size={24} />, name: "Windows Server" },
            { icon: <SiDotnet size={24} />, name: ".NET Core" },
            { icon: <FaIndustry size={24} />, name: "IoT Integrations" },
            { icon: <FaCloud size={24} />, name: "Azure Cloud" },
            { icon: <FaCogs size={24} />, name: "REST API" },
            { icon: <FaChartBar size={24} />, name: "Power BI" },
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
      title: "Carbon Analytics",
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Carbon Emissions Trend</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Line data={emissionsTrendData} options={lineChartOptions} />
              </Suspense>
            </ChartContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Emission Sources Distribution</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Bar data={emissionSourcesData} options={barChartOptions} />
              </Suspense>
            </ChartContainer>
          </motion.div>
        </div>
      ),
    },
  ];

  const projectData: ProjectData = {
    title: "Carbon Footprint Tracker",
    overview: "Real-time carbon emissions monitoring platform for industrial facilities, helping businesses track, analyze, and reduce their environmental impact.",
    teamSize: "5",
    duration: "8 months",
    role: "Lead Developer",
    metrics: metrics,
    features: [
      {
        title: "Real-time Monitoring",
        description: "Continuous tracking and visualization of carbon emissions with IoT sensor integration and real-time dashboards.",
        icon: <FaChartLine className="text-blue-500" size={24} />,
      },
      {
        title: "Advanced Analytics",
        description: "Comprehensive data analysis to identify emission patterns, hotspots, and optimization opportunities using ML algorithms.",
        icon: <FaChartBar className="text-purple-500" size={24} />,
      },
      {
        title: "IoT Integration",
        description: "Seamless connectivity with industrial sensors and control systems to capture accurate emissions data from various sources.",
        icon: <FaIndustry className="text-green-500" size={24} />,
      },
      {
        title: "Cloud Infrastructure",
        description: "Scalable Azure-based architecture ensuring high availability, security, and performance for enterprise-level deployment.",
        icon: <FaCloud className="text-amber-500" size={24} />,
      },
    ],
    customSections: customSections
  };
  
  // Technical details to pass to ProjectPage separately
  const technicalDetails = [
    "Developed a comprehensive carbon emissions tracking system that integrates IoT sensors.",
    "Implemented real-time data processing and advanced analytics dashboards.",
    "Created actionable insights engine to suggest emission reduction strategies.",
    "Integrated with industrial control systems for automated optimization."
  ];
  
  return (
    <Preloader text="Loading carbon tracker experience...">
      <ProjectPage
        title={projectData.title}
        overview={projectData.overview}
        teamSize={projectData.teamSize}
        duration={projectData.duration}
        role={projectData.role}
        metrics={metrics}
        features={projectData.features}
        technicalDetails={technicalDetails}
        imagePath="/images/projects/carbon-tracker/hero.webp"
        customSections={customSections}
        heroBackgroundType="waves"
        heroOverlayOpacity={0.2}
        animationIntensity="medium"
        secondaryImagePath="/images/projects/carbon.png"
        heroTextGradient={true}
        heroCtaText="View Tracker Details"
        heroTechnicalText="Explore Implementation"
      />
    </Preloader>
  );
};

export default CarbonTrackerPage; 