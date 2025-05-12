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
  ArcElement,
} from 'chart.js';
import {
  FaPaintBrush,
  FaUsers,
  FaComments,
  FaShoppingCart,
  FaChartLine,
  FaPalette,
  FaHandHolding,
  FaTruck,
  FaStar,
  FaHeart,
  FaHandshake,
  FaCertificate,
} from "react-icons/fa";

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

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));
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

const HandmadePage = () => {
  // Chart data for user engagement
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Artisans',
        data: [50, 65, 85, 95, 120, 150],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Customer Interactions',
        data: [100, 150, 200, 280, 350, 450],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for product categories
  const categoryData = {
    labels: ['Jewelry', 'Home Decor', 'Fashion', 'Art', 'Ceramics', 'Other'],
    datasets: [
      {
        data: [30, 25, 20, 15, 7, 3],
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

  // Chart data for customer satisfaction
  const satisfactionData = {
    labels: ['Product Quality', 'Communication', 'Shipping', 'Customization', 'Value'],
    datasets: [
      {
        label: 'Satisfaction Score',
        data: [4.8, 4.6, 4.3, 4.7, 4.5],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
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

  const metrics: Metric[] = [
    { value: "150+", label: "Artisan Interviews" },
    { value: "500+", label: "Survey Responses" },
    { value: "12", label: "Focus Groups" },
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

  const projectData = {
    title: "Handmade",
    overview: "An innovative e-commerce platform connecting artisans with customers, celebrating handcrafted products while empowering creative entrepreneurs.",
    teamSize: "3",
    duration: "9 weeks",
    role: "UX Designer",
    metrics: metrics,
    features: [
      {
        title: "Artisan Storytelling",
        description: "Immersive profile pages allowing artisans to share their creative journey, techniques, and inspiration behind their work.",
        icon: <FaHeart className="text-red-500" size={24} />,
      },
      {
        title: "Customer-Creator Connection",
        description: "Direct messaging system and live product customization features fostering meaningful interactions between buyers and artisans.",
        icon: <FaHandshake className="text-blue-500" size={24} />,
      },
      {
        title: "Smart Logistics",
        description: "Optimized shipping solutions with real-time tracking and special handling for delicate handcrafted items.",
        icon: <FaTruck className="text-green-500" size={24} />,
      },
      {
        title: "Authentication System",
        description: "Robust verification process ensuring product authenticity and maintaining the integrity of handmade items.",
        icon: <FaCertificate className="text-yellow-500" size={24} />,
      },
    ],
    technologies: [
      { name: "UX Research", icon: <FaUsers className="text-blue-400" size={20} /> },
      { name: "User Testing", icon: <FaComments className="text-green-400" size={20} /> },
      { name: "E-commerce", icon: <FaShoppingCart className="text-purple-400" size={20} /> },
      { name: "Analytics", icon: <FaChartLine className="text-red-400" size={20} /> },
      { name: "Artisan Tools", icon: <FaPaintBrush className="text-yellow-400" size={20} /> },
      { name: "Logistics", icon: <FaTruck className="text-gray-400" size={20} /> },
    ],
    results: [
      { value: "85%", label: "User Satisfaction" },
      { value: "40%", label: "Sales Increase" },
      { value: "60%", label: "Engagement Growth" },
    ],
    technicalDetails: [
      "Conducted comprehensive user research through interviews and surveys",
      "Created detailed user personas and journey maps",
      "Developed interactive prototypes using Figma",
      "Implemented A/B testing for key features",
      "Designed responsive UI components",
      "Created accessibility guidelines",
      "Developed user testing protocols",
      "Implemented analytics tracking system",
    ],
    imagePath: "/images/projects/handmade.webp",
    customSections: [
      {
        title: "Platform Performance & Insights",
        content: (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Platform Growth & Engagement</h3>
              <ChartContainer>
                <Line data={engagementData} options={chartOptions} />
              </ChartContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Product Categories</h3>
                <ChartContainer>
                  <Doughnut data={categoryData} options={chartOptions} />
                </ChartContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Customer Satisfaction Metrics</h3>
                <ChartContainer>
                  <Bar data={satisfactionData} options={chartOptions} />
                </ChartContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Research Metrics</h3>
              <MetricsGrid />
            </motion.div>
          </div>
        ),
      },
    ],
  };

  return <ProjectPage {...projectData} />;
};

export default HandmadePage; 