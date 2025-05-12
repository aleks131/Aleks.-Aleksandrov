"use client";

import React, { Suspense, lazy, useEffect, useState, useRef } from "react";
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
  ScatterController,
  ScatterDataPoint,
} from 'chart.js';
import {
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaTable,
  FaDatabase,
  FaServer,
  FaExchangeAlt,
  FaLightbulb,
  FaTachometerAlt,
  FaCloud,
  FaCog,
  FaSearchDollar,
  FaRegChartBar,
  FaWindows,
} from "react-icons/fa";
import { SiTableau, SiDatabricks } from "react-icons/si";
import { useInView } from "framer-motion";
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
  ArcElement,
  ScatterController
);

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));
const Doughnut = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Doughnut })));
const Scatter = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Scatter })));
const Bubble = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bubble })));

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
  icon?: React.ReactNode;
}

// Custom counter component for animated numbers
const AnimatedCounter = ({ value, label, icon }: Metric) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const targetValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  
  useEffect(() => {
    if (isInView && count < targetValue) {
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const increment = targetValue / totalFrames;
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const newCount = Math.ceil(countRef.current + increment);
        countRef.current = newCount > targetValue ? targetValue : newCount;
        setCount(countRef.current);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(targetValue);
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    }
  }, [isInView, targetValue, count]);
  
  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-3">
        {icon && <div className="mr-3">{icon}</div>}
        <h4 className="text-lg font-semibold">{label}</h4>
      </div>
      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        {isInView ? `${count}${suffix}` : "0"}
      </p>
    </motion.div>
  );
};

// Risk Assessment Matrix component
const RiskMatrix = () => {
  // Risk data points: [likelihood, impact, size (optional), label (optional)]
  const riskData = {
    datasets: [
      {
        label: 'Critical Risks',
        data: [
          { x: 4.5, y: 4.8, r: 15 },
          { x: 4.2, y: 4.5, r: 12 },
          { x: 4.7, y: 4.0, r: 14 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'High Risks',
        data: [
          { x: 3.8, y: 3.2, r: 10 },
          { x: 3.2, y: 3.7, r: 11 },
          { x: 2.8, y: 4.3, r: 12 },
          { x: 4.1, y: 2.9, r: 9 },
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Medium Risks',
        data: [
          { x: 3.0, y: 2.0, r: 8 },
          { x: 2.5, y: 2.5, r: 9 },
          { x: 2.0, y: 3.0, r: 8 },
          { x: 1.8, y: 3.5, r: 7 },
          { x: 3.5, y: 1.8, r: 7 },
        ],
        backgroundColor: 'rgba(255, 205, 86, 0.7)',
        borderColor: 'rgba(255, 205, 86, 1)',
      },
      {
        label: 'Low Risks',
        data: [
          { x: 1.2, y: 1.5, r: 6 },
          { x: 1.5, y: 1.2, r: 5 },
          { x: 1.8, y: 1.0, r: 6 },
          { x: 1.0, y: 1.8, r: 5 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Simplified matrix options to avoid TypeScript errors
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
            return `Risk ID: R${context.datasetIndex + 1}-${context.dataIndex + 1} (Likelihood: ${dataPoint.x.toFixed(1)}, Impact: ${dataPoint.y.toFixed(1)})`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Project Risk Assessment Matrix</h3>
      <div className="h-[400px]">
        <Suspense fallback={<LoadingSpinner />}>
          <Bubble data={riskData} options={riskMatrixOptions} />
        </Suspense>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center">
          <span className="w-4 h-4 inline-block mr-2 rounded-full bg-red-400"></span>
          <span className="text-sm">Critical Risk</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 inline-block mr-2 rounded-full bg-orange-400"></span>
          <span className="text-sm">High Risk</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 inline-block mr-2 rounded-full bg-yellow-400"></span>
          <span className="text-sm">Medium Risk</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 inline-block mr-2 rounded-full bg-teal-400"></span>
          <span className="text-sm">Low Risk</span>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Risk Matrix Guide:</strong> Bubbles represent individual project risks. The horizontal axis shows likelihood (from very low to very high), while the vertical axis shows impact. Larger bubbles indicate more significant risks requiring immediate attention.
        </p>
      </div>
    </div>
  );
};

// Add this interface definition before the CustomSectionHeader component
interface SectionHeaderProps {
  title: string;
}

const CustomSectionHeader = ({ title }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="mb-6"
  >
    <h2 className="text-2xl md:text-3xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
      {title}
    </h2>
    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
  </motion.div>
);

const DataVizPage = () => {
  // Performance data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Query Response Time (ms)',
        data: [120, 115, 105, 90, 75, 65, 55, 50, 45, 40, 38, 35],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Baseline (ms)',
        data: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  // Data source distribution
  const dataSourceData = {
    labels: ['SQL Database', 'NoSQL Database', 'APIs', 'Flat Files', 'Real-time Streams', 'IoT Sensors'],
    datasets: [
      {
        data: [35, 20, 15, 10, 12, 8],
        backgroundColor: [
          'rgba(53, 162, 235, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(252, 211, 77, 0.7)',
          'rgba(167, 139, 250, 0.7)',
          'rgba(248, 113, 113, 0.7)',
          'rgba(52, 211, 153, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // User engagement data
  const userEngagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Active Users',
        data: [220, 350, 470, 590, 650, 720, 830, 945],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Avg. Session Duration (sec)',
        data: [120, 145, 155, 175, 190, 205, 220, 240],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  // ROI Over Time - Using separate datasets for the bar and line charts
  const roiBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Year 2 Q1', 'Year 2 Q2'],
    datasets: [
      {
        label: 'Investment ($K)',
        data: [120, 80, 60, 40, 30, 30],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Return ($K)',
        data: [0, 30, 90, 150, 200, 250],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        yAxisID: 'y',
      },
    ],
  };
  
  const roiLineData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Year 2 Q1', 'Year 2 Q2'],
    datasets: [
      {
        label: 'Cumulative ROI (%)',
        data: [0, -35, -5, 40, 90, 130],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        yAxisID: 'y1',
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

  // Multi-axis chart options
  const multiAxisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const metrics: Metric[] = [
    { 
      value: "72%", 
      label: "Decision Accuracy", 
      icon: <FaLightbulb className="text-yellow-500" size={24} />
    },
    { 
      value: "395K", 
      label: "Daily Data Points", 
      icon: <FaDatabase className="text-blue-500" size={24} />
    },
    { 
      value: "65%", 
      label: "Time Saved", 
      icon: <FaTachometerAlt className="text-green-500" size={24} />
    },
    { 
      value: "120%", 
      label: "ROI", 
      icon: <FaSearchDollar className="text-purple-500" size={24} />
    },
  ];

  const MetricsGrid = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {metrics.map((metric: Metric, index: number) => (
        <AnimatedCounter 
          key={metric.label} 
          value={metric.value} 
          label={metric.label} 
          icon={metric.icon}
        />
      ))}
    </motion.div>
  );

  const customSections = [
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-8">
          <CustomSectionHeader title="Performance Analytics" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Query Performance Optimization</h3>
            <ChartContainer>
              <Line data={performanceData} options={chartOptions} />
            </ChartContainer>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Visualization shows continuous improvement in query performance over 12 months, with a 71% reduction in response time through optimization.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Data Sources Distribution</h3>
              <ChartContainer>
                <Doughnut data={dataSourceData} options={chartOptions} />
              </ChartContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">User Engagement Metrics</h3>
              <ChartContainer>
                <Line data={userEngagementData} options={multiAxisOptions} />
              </ChartContainer>
            </div>
          </motion.div>

          <MetricsGrid />
        </div>
      ),
    },
    {
      title: "Project Risk Analysis",
      content: (
        <div className="space-y-8">
          <CustomSectionHeader title="Project Risk Analysis" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RiskMatrix />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">ROI Analysis</h3>
            <div className="space-y-4">
              <ChartContainer>
                <Bar data={roiBarData} options={multiAxisOptions} />
              </ChartContainer>
              <ChartContainer>
                <Line data={roiLineData} options={multiAxisOptions} />
              </ChartContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Charts show initial investment, returns and cumulative ROI over time. Break-even was achieved in Q4 with 40% ROI, reaching 130% by Year 2 Q2.</p>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  const projectData = {
    title: "Enterprise Data Visualization Dashboard",
    overview: "A comprehensive enterprise dashboard solution that transforms complex data into actionable insights through interactive visualizations, advanced analytics, and customizable reporting capabilities.",
    teamSize: "6",
    duration: "8 months",
    role: "Lead Data Visualization Engineer",
    metrics: metrics,
    features: [
      {
        title: "Real-time Data Integration",
        description: "Seamless integration with multiple data sources including SQL databases, APIs, and streaming data platforms with automated ETL processes.",
        icon: <FaExchangeAlt className="text-blue-500" size={24} />,
      },
      {
        title: "Interactive Visualizations",
        description: "Custom interactive charts, graphs, and dashboards with drill-down capabilities, cross-filtering, and responsive design for all devices.",
        icon: <FaChartBar className="text-purple-500" size={24} />,
      },
      {
        title: "Advanced Analytics",
        description: "Built-in statistical analysis, trend forecasting, anomaly detection, and what-if scenario modeling powered by machine learning algorithms.",
        icon: <FaChartLine className="text-green-500" size={24} />,
      },
      {
        title: "Risk Assessment Matrix",
        description: "Visual tool for identifying, analyzing, and prioritizing risks based on likelihood and impact, with automated monitoring and alerting.",
        icon: <FaChartPie className="text-red-500" size={24} />,
      },
    ],
    technologies: [
      { name: "React.js", icon: <FaCog className="text-blue-400" size={20} /> },
      { name: "D3.js", icon: <FaChartPie className="text-orange-400" size={20} /> },
      { name: "Python", icon: <FaDatabase className="text-green-400" size={20} /> },
      { name: "SQL/NoSQL", icon: <FaTable className="text-yellow-400" size={20} /> },
      { name: "AWS/Azure", icon: <FaCloud className="text-blue-300" size={20} /> },
      { name: "Power BI", icon: <FaRegChartBar className="text-yellow-500" size={20} /> },
      { name: "Tableau", icon: <SiTableau className="text-blue-500" size={20} /> },
      { name: "Databricks", icon: <SiDatabricks className="text-red-500" size={20} /> },
      { name: "Microsoft Analytics", icon: <FaWindows className="text-blue-600" size={20} /> },
    ],
    results: [
      { value: "72%", label: "Decision Accuracy" },
      { value: "65%", label: "Time Saved" },
      { value: "120%", label: "ROI" },
    ],
    technicalDetails: [
      "Developed microservices architecture for scalable data processing",
      "Implemented real-time data streaming with Apache Kafka",
      "Built ETL pipelines for data cleaning and transformation",
      "Designed responsive dashboards with React.js and D3.js",
      "Created custom visualization components for complex data rendering",
      "Integrated machine learning models for predictive analytics",
      "Implemented secure multi-tenant data access controls",
      "Built automated testing framework for visualization accuracy",
      "Designed flexible reporting engine with exportable formats",
      "Implemented role-based access control system"
    ],
    imagePath: "/images/projects/data-viz-hero.jpg",
    customSections,
  };

  return (
    <Preloader text="Loading data visualization experience...">
      <ProjectPage
        title={projectData.title}
        overview={projectData.overview}
        teamSize={projectData.teamSize}
        duration={projectData.duration}
        role={projectData.role}
        metrics={metrics}
        features={projectData.features}
        technologies={projectData.technologies}
        results={projectData.results}
        technicalDetails={projectData.technicalDetails}
        imagePath="/images/projects/data.png"
        customSections={customSections}
        heroBackgroundType="particles"
        heroOverlayOpacity={0.15}
        animationIntensity="high"
        secondaryImagePath="/images/projects/data.png"
        heroTextGradient={true}
        heroCtaText="Explore Visualization Suite"
        heroTechnicalText="Technical Architecture"
      />
    </Preloader>
  );
};

export default DataVizPage; 