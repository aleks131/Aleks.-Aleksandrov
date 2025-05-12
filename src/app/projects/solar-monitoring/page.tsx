"use client";

import React from "react";
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
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  FaSolarPanel,
  FaChartLine,
  FaServer,
  FaDatabase,
  FaCode,
  FaCloud,
  FaBolt,
  FaChartBar,
  FaClock,
  FaJava,
} from "react-icons/fa";
import { SiPostgresql, SiSpring } from "react-icons/si";

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
  ArcElement
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Chart container component
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
  >
    {children}
  </motion.div>
);

const SolarMonitoringPage = () => {
  // Energy generation data
  const energyGenerationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Energy Generated (kWh)',
        data: [3200, 3800, 4500, 4800, 5200, 5000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Projected Output',
        data: [3000, 3500, 4200, 4600, 5000, 4800],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  // System efficiency data
  const efficiencyData = {
    labels: ['Panel Efficiency', 'Inverter Efficiency', 'Transmission', 'Overall System'],
    datasets: [
      {
        label: 'Efficiency (%)',
        data: [92, 95, 98, 88],
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

  // Cost savings distribution
  const savingsData = {
    labels: ['Direct Energy Savings', 'Maintenance Reduction', 'Peak Load Optimization', 'Carbon Credits'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
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
      y: {
        beginAtZero: true,
      },
    },
  };

  const metrics = [
    { value: "25K", label: "kWh Generated", icon: <FaBolt className="text-yellow-500" size={24} /> },
    { value: "92%", label: "System Efficiency", icon: <FaChartLine className="text-green-500" size={24} /> },
    { value: "45%", label: "Cost Reduction", icon: <FaChartBar className="text-blue-500" size={24} /> },
  ];

  const MetricsGrid = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center mb-4">
            {metric.icon}
          </div>
          <h4 className="text-lg font-semibold mb-2 text-center">{metric.label}</h4>
          <p className="text-3xl font-bold text-blue-500 text-center">{metric.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  const projectData = {
    title: "Solar Panel Monitoring System",
    overview: "A comprehensive monitoring system for tracking solar panel performance and energy generation at Ejby Maskinfabrik, featuring advanced analytics and reporting capabilities.",
    teamSize: "3",
    duration: "8 weeks",
    role: "Lead Developer",
    metrics: metrics,
    features: [
      {
        title: "Real-time Monitoring",
        description: "Continuous tracking of energy generation, panel efficiency, and system performance metrics.",
        icon: <FaChartLine className="text-blue-500" size={24} />,
      },
      {
        title: "Predictive Analytics",
        description: "Machine learning algorithms for forecasting energy generation and maintenance needs.",
        icon: <FaChartBar className="text-green-500" size={24} />,
      },
      {
        title: "Data Visualization",
        description: "Interactive dashboards and reports for performance analysis and decision-making.",
        icon: <FaChartLine className="text-purple-500" size={24} />,
      },
      {
        title: "Cloud Integration",
        description: "Secure cloud storage and processing of monitoring data with real-time access.",
        icon: <FaCloud className="text-yellow-500" size={24} />,
      },
    ],
    technologies: [
      { name: "Java", icon: <FaJava className="text-red-400" size={20} /> },
      { name: "Spring Boot", icon: <SiSpring className="text-green-400" size={20} /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" size={20} /> },
      { name: "IoT Sensors", icon: <FaSolarPanel className="text-yellow-400" size={20} /> },
      { name: "RESTful APIs", icon: <FaServer className="text-purple-400" size={20} /> },
      { name: "Cloud Services", icon: <FaCloud className="text-blue-400" size={20} /> },
    ],
    results: [
      { value: "25K", label: "kWh Generated Monthly" },
      { value: "92%", label: "System Efficiency" },
      { value: "45%", label: "Cost Reduction" },
    ],
    technicalDetails: [
      "Developed microservices architecture using Spring Boot",
      "Implemented real-time data processing with Apache Kafka",
      "Created RESTful APIs for system integration",
      "Designed PostgreSQL database for time-series data",
      "Integrated IoT sensors with cloud infrastructure",
      "Implemented machine learning models for predictive maintenance",
    ],
    imagePath: "/images/projects/solar-monitoring-hero.jpg",
    customSections: [
      {
        title: "Performance Analytics",
        content: (
          <div className="space-y-8">
            <ChartContainer>
              <h3 className="text-xl font-semibold mb-4">Energy Generation Trends</h3>
              <div className="h-[300px]">
                <Line data={energyGenerationData} options={chartOptions} />
              </div>
            </ChartContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartContainer>
                <h3 className="text-xl font-semibold mb-4">System Efficiency Analysis</h3>
                <div className="h-[300px]">
                  <Bar data={efficiencyData} options={chartOptions} />
                </div>
              </ChartContainer>

              <ChartContainer>
                <h3 className="text-xl font-semibold mb-4">Cost Savings Distribution</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <Doughnut data={savingsData} options={chartOptions} />
                </div>
              </ChartContainer>
            </div>

            <MetricsGrid />
          </div>
        ),
      },
    ],
  };

  return <ProjectPage {...projectData} />;
};

export default SolarMonitoringPage; 