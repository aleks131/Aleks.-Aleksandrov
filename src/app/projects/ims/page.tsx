"use client";

import React, { Suspense, lazy, useEffect } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer } from "@/components/shared";
import {
  FaChartLine,
  FaChartPie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaMicrosoft,
} from "react-icons/fa";
import { SiMysql, SiSpringboot } from "react-icons/si";

const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Radar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Radar })));
const Doughnut = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Doughnut })));

const IMSPage = () => {
  // Register Chart.js components in the browser only
  useEffect(() => {
    import('chart.js').then(({ Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement }) => {
      Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement);
    });
  }, []);

  const metrics = [
    { value: "90%", label: "Analysis Accuracy", icon: <FaCheckCircle className="text-green-500" size={20} /> },
    { value: "50+", label: "Markets Evaluated", icon: <FaSearch className="text-blue-500" size={20} /> },
    { value: "65%", label: "Faster Decision Making", icon: <FaChartLine className="text-purple-500" size={20} /> },
  ];

  const marketAnalysisData = {
    labels: ['Market Size', 'Growth Potential', 'Competition', 'Entry Barriers', 'Regulations', 'Economic Stability'],
    datasets: [{ label: 'Market Score', data: [85, 92, 78, 88, 75, 90], backgroundColor: 'rgba(99, 102, 241, 0.5)', borderColor: 'rgb(99, 102, 241)', borderWidth: 2 }],
  };

  const decisionTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Traditional Method (Days)', data: [30, 32, 28, 30, 35, 31], borderColor: 'rgb(239, 68, 68)', backgroundColor: 'rgba(239, 68, 68, 0.5)', tension: 0.4 },
      { label: 'With IMS Software (Days)', data: [12, 11, 10, 9, 8, 7], borderColor: 'rgb(34, 197, 94)', backgroundColor: 'rgba(34, 197, 94, 0.5)', tension: 0.4 },
    ],
  };

  const marketDistributionData = {
    labels: ['Europe', 'North America', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [{ data: [35, 25, 20, 10, 5, 5], backgroundColor: ['rgba(99,102,241,0.7)', 'rgba(34,197,94,0.7)', 'rgba(239,68,68,0.7)', 'rgba(234,179,8,0.7)', 'rgba(168,85,247,0.7)', 'rgba(14,165,233,0.7)'], borderWidth: 1 }],
  };

  const chartOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } };
  const radarOpts = { ...chartOpts, scales: { r: { ticks: { backdropColor: 'transparent' } } } };

  const customSections = [
    {
      title: "Market Analysis & Performance",
      content: (
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Market Analysis Scores</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Radar data={marketAnalysisData} options={radarOpts} />
              </Suspense>
            </ChartContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Decision Time Improvement</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Line data={decisionTimeData} options={chartOpts} />
              </Suspense>
            </ChartContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Market Distribution</h3>
            <ChartContainer>
              <Suspense fallback={<LoadingSpinner />}>
                <Doughnut data={marketDistributionData} options={chartOpts} />
              </Suspense>
            </ChartContainer>
          </motion.div>
        </div>
      ),
    },
  ];

  const features = [
    { title: "Automated Market Analysis", description: "Sophisticated algorithms analyzing multiple market parameters including economic indicators, competition, and growth potential.", icon: <FaChartLine className="text-blue-500" size={24} /> },
    { title: "Risk Assessment Engine", description: "Comprehensive risk evaluation system considering political, economic, and market-specific factors.", icon: <FaExclamationTriangle className="text-yellow-500" size={24} /> },
    { title: "Decision Support System", description: "AI-powered recommendations based on company-specific requirements and market conditions.", icon: <FaCheckCircle className="text-green-500" size={24} /> },
    { title: "Real-time Dashboard", description: "Interactive visualization platform providing instant access to market insights and comparative analysis.", icon: <FaChartPie className="text-purple-500" size={24} /> },
  ];

  const technicalDetails = [
    "Developed microservices architecture using Spring Boot.",
    "Implemented automated data collection from multiple global data sources.",
    "Created advanced scoring algorithms for market evaluation.",
    "Built interactive Power BI dashboards for data visualization.",
    "Integrated machine learning models for market prediction.",
    "Developed RESTful APIs for system integration.",
  ];

  return (
    <ProjectPage
      title="International Market Selection Software"
      overview="Data-driven software solution for Guldmann A/S, revolutionizing their market expansion strategy through advanced analytics and automated market assessment. Delivered a 65% reduction in decision-making time across 50+ evaluated markets."
      teamSize="4"
      duration="6 weeks"
      role="Lead Analyst"
      metrics={metrics}
      features={features}
      technicalDetails={technicalDetails}
      imagePath="/images/projects/ims.png"
      customSections={customSections}
      heroBackgroundType="grid"
      heroOverlayOpacity={0.15}
      animationIntensity="medium"
      heroTextGradient={true}
      heroCtaText="View Market Analysis Tool"
      heroTechnicalText="Technical Implementation"
    />
  );
};

export default IMSPage;