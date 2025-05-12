import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaLightbulb, FaCogs, FaTools, FaServer, FaDatabase, FaLock, FaMobile, FaCloud, FaTachometerAlt } from 'react-icons/fa';
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  BubbleController,
  ScatterController,
} from 'chart.js';
import { Radar, Line, Bubble } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BubbleController,
  ScatterController
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  color?: string;
}

interface TechnicalImplementationProps {
  details: string[];
  metrics?: Metric[];
}

const TechnicalImplementation: React.FC<TechnicalImplementationProps> = ({ details, metrics = [] }) => {
  // Group technical details into categories
  const categories = {
    architecture: details.filter(d => d.toLowerCase().includes('architecture') || d.toLowerCase().includes('system') || d.toLowerCase().includes('pipeline')),
    development: details.filter(d => d.toLowerCase().includes('develop') || d.toLowerCase().includes('implement') || d.toLowerCase().includes('creat')),
    optimization: details.filter(d => d.toLowerCase().includes('optim') || d.toLowerCase().includes('performance') || d.toLowerCase().includes('improv')),
    security: details.filter(d => d.toLowerCase().includes('secur') || d.toLowerCase().includes('authentica') || d.toLowerCase().includes('encrypt')),
    database: details.filter(d => d.toLowerCase().includes('data') || d.toLowerCase().includes('database') || d.toLowerCase().includes('storage')),
    other: details.filter(d => 
      !d.toLowerCase().includes('architecture') && 
      !d.toLowerCase().includes('system') && 
      !d.toLowerCase().includes('pipeline') && 
      !d.toLowerCase().includes('develop') && 
      !d.toLowerCase().includes('implement') && 
      !d.toLowerCase().includes('creat') &&
      !d.toLowerCase().includes('optim') && 
      !d.toLowerCase().includes('performance') && 
      !d.toLowerCase().includes('improv') &&
      !d.toLowerCase().includes('secur') && 
      !d.toLowerCase().includes('authentica') && 
      !d.toLowerCase().includes('encrypt') &&
      !d.toLowerCase().includes('data') && 
      !d.toLowerCase().includes('database') && 
      !d.toLowerCase().includes('storage')
    )
  };

  const categoryIcons = {
    architecture: <FaCogs className="text-blue-500" size={24} />,
    development: <FaCode className="text-green-500" size={24} />,
    optimization: <FaTachometerAlt className="text-yellow-500" size={24} />,
    security: <FaLock className="text-red-500" size={24} />,
    database: <FaDatabase className="text-purple-500" size={24} />,
    other: <FaTools className="text-indigo-500" size={24} />
  };

  const categoryTitles = {
    architecture: "System Architecture",
    development: "Development & Implementation",
    optimization: "Optimization & Performance",
    security: "Security & Compliance",
    database: "Data Management",
    other: "Additional Features"
  };

  // Performance metrics data for radar chart
  const performanceData = {
    labels: ['Scalability', 'Performance', 'Reliability', 'Security', 'Maintainability', 'Efficiency'],
    datasets: [
      {
        label: 'Project Metrics',
        data: [85, 92, 88, 95, 85, 90],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
      {
        label: 'Industry Average',
        data: [70, 65, 75, 70, 60, 65],
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(107, 114, 128, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(107, 114, 128, 1)',
        borderDash: [5, 5],
      },
    ],
  };

  // Risk assessment matrix data
  const riskData = {
    datasets: [
      {
        label: 'Critical Risks',
        data: [
          { x: 4.2, y: 4.5, r: 12 },
          { x: 4.5, y: 3.9, r: 14 },
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
      },
      {
        label: 'High Risks',
        data: [
          { x: 3.3, y: 3.2, r: 10 },
          { x: 3.7, y: 2.8, r: 11 },
          { x: 2.8, y: 3.5, r: 10 },
        ],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgba(245, 158, 11, 1)',
      },
      {
        label: 'Medium Risks',
        data: [
          { x: 2.0, y: 2.0, r: 8 },
          { x: 2.5, y: 1.5, r: 9 },
          { x: 1.5, y: 2.5, r: 8 },
        ],
        backgroundColor: 'rgba(251, 191, 36, 0.7)',
        borderColor: 'rgba(251, 191, 36, 1)',
      },
      {
        label: 'Low Risks',
        data: [
          { x: 1.2, y: 1.0, r: 6 },
          { x: 1.0, y: 1.2, r: 5 },
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  // Performance trend data
  const performanceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [120, 95, 75, 60, 45, 30],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Baseline (ms)',
        data: [120, 120, 120, 120, 120, 120],
        borderColor: 'rgba(209, 213, 219, 0.8)',
        backgroundColor: 'rgba(209, 213, 219, 0.1)',
        tension: 0.4,
        borderDash: [5, 5],
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
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'rgba(243, 244, 246, 1)',
        bodyColor: 'rgba(243, 244, 246, 1)',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: 'rgba(107, 114, 128, 0.8)',
        },
      },
    },
  };

  // Risk matrix options
  const riskMatrixOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const dataPoint = context.raw;
            return `Likelihood: ${dataPoint.x.toFixed(1)}, Impact: ${dataPoint.y.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'Likelihood',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
      },
      y: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'Impact',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
      },
    },
  };

  // Custom animated metric component
  const AnimatedMetric = ({ metric }: { metric: Metric }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <motion.div
        ref={ref}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex items-center mb-3">
          {metric.icon && (
            <div className={`mr-3 text-${metric.color || 'blue'}-500`}>{metric.icon}</div>
          )}
          <h4 className="text-lg font-semibold">{metric.label}</h4>
        </div>
        <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${metric.color || 'blue'}-500 to-${metric.color || 'blue'}-700`}>
          {isInView ? (
            <>
              {metric.prefix || ''}
              <CountUp 
                end={parseInt(metric.value.replace(/\D/g, '')) || 0} 
                duration={2} 
                separator="," 
                decimals={metric.value.includes('.') ? 1 : 0}
              />
              {metric.suffix || ''}
            </>
          ) : (
            '0'
          )}
        </p>
      </motion.div>
    );
  };

  // Metrics grid component
  const MetricsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <AnimatedMetric key={index} metric={metric} />
      ))}
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Project Metrics Section */}
      {metrics && metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Metrics</h2>
          <MetricsGrid />
        </motion.div>
      )}
      
      {/* Performance Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
            <div className="h-[300px]">
              <Suspense fallback={<LoadingSpinner />}>
                <Radar data={performanceData} options={chartOptions} />
              </Suspense>
            </div>
          </motion.div>
          
          {/* Risk Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
            <div className="h-[300px]">
              <Suspense fallback={<LoadingSpinner />}>
                <Bubble data={riskData} options={riskMatrixOptions} />
              </Suspense>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs">Critical Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs">High Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs">Low Risk</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Performance Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
          <div className="h-[250px]">
            <Suspense fallback={<LoadingSpinner />}>
              <Line data={performanceTrendData} options={chartOptions} />
            </Suspense>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Technical Details Categorized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([category, items]) => items.length > 0 && (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {categoryIcons[category as keyof typeof categoryIcons]}
                <h3 className="text-xl font-semibold">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h3>
              </div>
              <ul className="space-y-3">
                {items.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-2 group"
                  >
                    <span className="text-blue-500 mt-1.5 transform group-hover:scale-125 transition-transform duration-300">•</span>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalImplementation; 