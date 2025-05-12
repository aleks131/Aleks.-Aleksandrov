"use client";

import React, { Suspense, lazy } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import {
  FaJava,
  FaDatabase,
  FaChartLine,
  FaGlobe,
  FaCloud,
  FaChartBar,
  FaSearch,
  FaRocket,
  FaMicrosoft,
  FaChartPie,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { SiMysql, SiSpringboot } from "react-icons/si";
import Preloader from "@/components/shared/Preloader";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Radar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Radar })));
const Doughnut = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Doughnut })));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Chart container component
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-[300px]">
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  </div>
);

interface Metric {
  value: string;
  label: string;
}

const IMSPage = () => {
  // Chart data for market analysis scores
  const marketAnalysisData = {
    labels: ['Market Size', 'Growth Potential', 'Competition', 'Entry Barriers', 'Regulations', 'Economic Stability'],
    datasets: [
      {
        label: 'Market Score',
        data: [85, 92, 78, 88, 75, 90],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
      },
    ],
  };

  // Chart data for decision time improvement
  const decisionTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Traditional Method (Days)',
        data: [30, 32, 28, 30, 35, 31],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
      {
        label: 'With IMS Software (Days)',
        data: [12, 11, 10, 9, 8, 7],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for market distribution
  const marketDistributionData = {
    labels: ['Europe', 'North America', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [
      {
        data: [35, 25, 20, 10, 5, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(14, 165, 233, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      r: {
        ticks: {
          backdropColor: 'transparent',
        },
      },
    },
  };

  const metrics: Metric[] = [
    { value: "90%", label: "Analysis Accuracy" },
    { value: "50+", label: "Markets Evaluated" },
    { value: "65%", label: "Faster Decision Making" },
  ];

  const MetricsGrid = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {metrics.map((metric: Metric, index: number) => (
        <motion.div
          key={metric.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="text-lg font-semibold mb-2">{metric.label}</h4>
          <p className="text-3xl font-bold text-blue-500">{metric.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  const customSections = [
    {
      title: "Market Analysis & Performance",
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Market Analysis Scores</h3>
            <ChartContainer>
              <Radar data={marketAnalysisData} options={chartOptions} />
            </ChartContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Decision Time Improvement</h3>
            <ChartContainer>
              <Line data={decisionTimeData} options={chartOptions} />
            </ChartContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Market Distribution</h3>
              <ChartContainer>
                <Doughnut data={marketDistributionData} options={chartOptions} />
              </ChartContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Key Performance Metrics</h3>
              <MetricsGrid />
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  const projectData = {
    title: "International Market Selection Software",
    overview: "Data-driven software solution for Guldmann A/S, revolutionizing their market expansion strategy through advanced analytics and automated market assessment.",
    teamSize: "4",
    duration: "6 weeks",
    role: "Lead Analyst",
    metrics: metrics,
    features: [
      {
        title: "Automated Market Analysis",
        description: "Sophisticated algorithms analyzing multiple market parameters including economic indicators, competition, and growth potential.",
        icon: <FaChartLine className="text-blue-500" size={24} />,
      },
      {
        title: "Risk Assessment Engine",
        description: "Comprehensive risk evaluation system considering political, economic, and market-specific factors.",
        icon: <FaExclamationTriangle className="text-yellow-500" size={24} />,
      },
      {
        title: "Decision Support System",
        description: "AI-powered recommendations based on company-specific requirements and market conditions.",
        icon: <FaCheckCircle className="text-green-500" size={24} />,
      },
      {
        title: "Real-time Dashboard",
        description: "Interactive visualization platform providing instant access to market insights and comparative analysis.",
        icon: <FaChartPie className="text-purple-500" size={24} />,
      },
    ],
    technologies: [
      { name: "Java Spring Boot", icon: <SiSpringboot className="text-green-400" size={20} /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-400" size={20} /> },
      { name: "Power BI", icon: <FaChartPie className="text-yellow-400" size={20} /> },
      { name: "Azure Cloud", icon: <FaMicrosoft className="text-blue-500" size={20} /> },
      { name: "Analytics", icon: <FaChartLine className="text-purple-400" size={20} /> },
      { name: "Market Research", icon: <FaSearch className="text-red-400" size={20} /> },
    ],
    results: [
      { value: "90%", label: "Analysis Accuracy" },
      { value: "50+", label: "Markets Evaluated" },
      { value: "65%", label: "Faster Decision Making" },
    ],
    technicalDetails: [
      "Developed microservices architecture using Spring Boot",
      "Implemented automated data collection from multiple sources",
      "Created advanced scoring algorithms for market evaluation",
      "Built interactive Power BI dashboards for data visualization",
      "Integrated machine learning models for market prediction",
      "Developed RESTful APIs for system integration",
      "Implemented real-time data processing pipeline",
      "Created automated report generation system",
    ],
    imagePath: "/images/projects/international.webp",
    customSections,
  };

  return (
    <Preloader text="Loading IMS project experience...">
      <ProjectPage
        title="International Market Selection Software"
        overview="Data-driven software solution for Guldmann A/S, revolutionizing their market expansion strategy through advanced analytics and automated market assessment."
        teamSize={projectData.teamSize}
        duration="6 weeks"
        role="Lead Analyst"
        metrics={metrics}
        features={projectData.features}
        technologies={projectData.technologies}
        results={projectData.results}
        technicalDetails={projectData.technicalDetails}
        imagePath="/images/projects/ims.png"
        customSections={customSections}
        heroBackgroundType="grid"
        heroOverlayOpacity={0.15}
        animationIntensity="medium"
        heroTextGradient={true}
        heroCtaText="View Market Analysis Tool"
        heroTechnicalText="Technical Implementation"
      />
    </Preloader>
  );
};

export default IMSPage; 