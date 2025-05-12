"use client";

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
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
import ProjectPage from '@/components/ProjectPage';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaShoppingCart, 
  FaUsers, 
  FaLeaf, 
  FaChartLine,
  FaCheckCircle,
  FaRecycle,
  FaHandshake,
  FaSpinner,
} from 'react-icons/fa';
import { SiTypescript, SiMysql, SiTailwindcss, SiDocker } from 'react-icons/si';

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
    <FaSpinner className="animate-spin text-4xl text-blue-500" />
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

// Chart data and options
const userGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Active Users',
      data: [100, 250, 400, 600, 850, 1200],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.4,
    },
    {
      label: 'Verified Sellers',
      data: [20, 50, 120, 200, 350, 500],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      tension: 0.4,
    },
  ],
};

const impactMetricsData = {
  labels: ['Carbon Footprint', 'Waste Reduction', 'Sustainable Products', 'Community Impact'],
  datasets: [
    {
      label: 'Impact Score',
      data: [85, 92, 78, 88],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(99, 102, 241, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(234, 179, 8, 0.6)',
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(99, 102, 241)',
        'rgb(236, 72, 153)',
        'rgb(234, 179, 8)',
      ],
      borderWidth: 1,
    },
  ],
};

const productCategoriesData = {
  labels: ['Eco-friendly Home', 'Sustainable Fashion', 'Zero Waste', 'Organic Food', 'Clean Beauty', 'Green Tech'],
  datasets: [
    {
      data: [30, 25, 15, 12, 10, 8],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(14, 165, 233, 0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

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
  { 
    value: "500+", 
    label: "Verified Sellers",
    icon: <FaUsers className="text-blue-500" size={24} />,
  },
  { 
    value: "10K+", 
    label: "Monthly Users",
    icon: <FaShoppingCart className="text-green-500" size={24} />,
  },
  { 
    value: "85%", 
    label: "User Satisfaction",
    icon: <FaCheckCircle className="text-purple-500" size={24} />,
  },
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

const SustainovationHubPage = () => {
  const projectData = {
    title: "SustainovationHub",
    overview: "An innovative e-commerce platform connecting eco-conscious consumers with sustainable products, featuring advanced seller verification, impact tracking, and community engagement systems.",
    teamSize: "4",
    duration: "10 weeks",
    role: "Lead Developer & Project Manager",
    metrics: metrics,
    features: [
      {
        title: "Seller Verification System",
        description: "Robust verification process ensuring only authentic sustainable sellers join the platform",
        icon: <FaCheckCircle className="text-blue-500" size={24} />,
      },
      {
        title: "Impact Tracking",
        description: "Real-time monitoring of environmental impact metrics for each transaction",
        icon: <FaLeaf className="text-green-500" size={24} />,
      },
      {
        title: "Community Engagement",
        description: "Interactive forums and educational resources for sustainable living",
        icon: <FaHandshake className="text-purple-500" size={24} />,
      },
      {
        title: "Sustainability Metrics",
        description: "Comprehensive tracking of environmental impact and sustainable practices",
        icon: <FaRecycle className="text-yellow-500" size={24} />,
      },
    ],
    technologies: [
      { name: "React", icon: <FaReact className="text-blue-400" size={20} /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={20} /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-600" size={20} /> },
      { name: "MySQL", icon: <SiMysql className="text-orange-500" size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400" size={20} /> },
      { name: "Docker", icon: <SiDocker className="text-blue-500" size={20} /> },
    ],
    results: [
      { value: "500+", label: "Verified Sellers" },
      { value: "10K+", label: "Monthly Active Users" },
      { value: "85%", label: "User Satisfaction Rate" },
    ],
    technicalDetails: [
      // Architecture
      "Implemented microservices architecture using Node.js and Express",
      "Designed scalable database schema with MySQL and Sequelize ORM",
      "Set up containerized deployment using Docker and Docker Compose",
      "Created real-time event processing pipeline for impact tracking",
      
      // Development
      "Developed responsive frontend using React and TailwindCSS",
      "Implemented TypeScript for type-safe development",
      "Created RESTful APIs for seller verification and product management",
      "Built real-time chat system using WebSocket",
      
      // Optimization
      "Optimized database queries for improved performance",
      "Implemented caching strategy using Redis",
      "Added lazy loading and code splitting for faster page loads",
      "Optimized images and assets for better loading times",
      
      // Additional Features
      "Integrated payment processing with Stripe",
      "Added automated email notifications using SendGrid",
      "Implemented full-text search using Elasticsearch",
      "Created automated testing suite with Jest and React Testing Library"
    ],
    imagePath: "/images/projects/sustainovationhub-hero.jpg",
    customSections: [
      {
        title: "Platform Performance & Impact",
        content: (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">User Growth & Engagement</h3>
              <ChartContainer>
                <Line data={userGrowthData} options={chartOptions} />
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
                  <Doughnut data={productCategoriesData} options={chartOptions} />
                </ChartContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Impact Metrics</h3>
                <ChartContainer>
                  <Bar data={impactMetricsData} options={chartOptions} />
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
              <h3 className="text-xl font-semibold mb-4">Key Performance Metrics</h3>
              <MetricsGrid />
            </motion.div>
          </div>
        ),
      },
    ],
  };

  return <ProjectPage {...projectData} />;
};

export default SustainovationHubPage; 