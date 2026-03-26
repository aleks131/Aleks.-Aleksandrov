"use client";

import React, { Suspense, lazy } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer } from "@/components/shared";
import {
  FaLaptopCode,
  FaRocket,
  FaCheckCircle,
  FaCogs,
  FaDatabase,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import { SiNextdotjs, SiNodedotjs } from "react-icons/si";

const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const WarehouseAppsPage = () => {
  const metrics = [
    { value: "3 Apps", label: "In Active Production", icon: <FaRocket className="text-blue-500" size={20} /> },
    { value: "1+ Year", label: "Continuous Operation", icon: <FaCheckCircle className="text-green-500" size={20} /> },
    { value: "100 pp/wk", label: "Paper Waste Eliminated", icon: <FaDatabase className="text-purple-500" size={20} /> },
  ];

  const appData = {
    labels: ['Manual Process Time (min)', 'Error Rate (%)', 'Pages Printed/Week'],
    datasets: [
      {
        label: 'Before Apps',
        data: [45, 18, 100],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: 'After Apps',
        data: [5, 1, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const } },
  };

  const apps = [
    {
      name: "Inventory Register",
      description: "A live inventory tracking system that replaced paper-based stock logs, giving warehouse staff real-time item availability at a glance.",
    },
    {
      name: "Task Dispatcher",
      description: "A digital task management app allowing supervisors to assign and track warehouse tasks in real-time, eliminating handwritten task sheets.",
    },
    {
      name: "Inspection Logger",
      description: "A mobile-friendly quality inspection log replacing paper checklists and enabling instant reporting of non-conformances.",
    },
  ];

  const customSections = [
    {
      title: "The 3 Internal Applications",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaLaptopCode className="text-blue-500" size={22} />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{app.name}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{app.description}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: "Impact Before vs After",
      content: (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <ChartContainer>
            <Suspense fallback={<LoadingSpinner />}>
              <Bar data={appData} options={barOptions} />
            </Suspense>
          </ChartContainer>
        </div>
      ),
    },
    {
      title: "Technology Stack",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <SiNextdotjs size={24} />, name: "Next.js" },
            { icon: <SiNodedotjs size={24} />, name: "Node.js" },
            { icon: <FaCode size={24} />, name: "JavaScript" },
            { icon: <FaDatabase size={24} />, name: "Persistent Storage" },
          ].map((tech, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center text-center shadow border border-gray-100 dark:border-gray-700">
              <div className="text-blue-500 mb-2">{tech.icon}</div>
              <span className="font-medium text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const features = [
    {
      title: "Full-Stack Development",
      description: "Built end-to-end with Next.js for the frontend and Node.js for the backend, providing a seamless user experience even on warehouse floor devices.",
      icon: <FaLaptopCode className="text-blue-500" size={24} />,
    },
    {
      title: "Paper-Free Workflows",
      description: "Replaced 100+ pages of weekly paper checklists, forms, and task sheets with digital alternatives accessible from any browser.",
      icon: <FaCheckCircle className="text-green-500" size={24} />,
    },
    {
      title: "Production Reliability",
      description: "All three applications have been running continuously in a live warehouse environment for over a year with zero major incidents.",
      icon: <FaRocket className="text-amber-500" size={24} />,
    },
    {
      title: "Automated Processes",
      description: "Each app was engineered to automate its specific business process—removing the need for supervisor follow-up and manual tracking.",
      icon: <FaCogs className="text-purple-500" size={24} />,
    },
  ];

  const technicalDetails = [
    "Developed three independent full-stack applications tailored to specific warehouse operations.",
    "Used Next.js for fast, server-side rendered frontends compatible with warehouse hardware.",
    "Implemented Node.js backends with persistent data storage for live tracking.",
    "Designed mobile-responsive UIs for use on tablets and floor-level devices.",
    "Managed solo full deployment and rollout with staff training included.",
    "All three apps remain in active use over one year after launch.",
  ];

  return (
    <ProjectPage
      title="Internal Full-Stack Warehouse Applications"
      overview="Designed and deployed three independent internal web applications that digitized and automated core warehouse operations, eliminating over 100 pages of weekly paperwork. All applications remain in active production use more than one year after launch."
      teamSize="1"
      duration="Ongoing"
      role="Full-Stack Developer"
      metrics={metrics}
      features={features}
      technicalDetails={technicalDetails}
      imagePath="/images/projects/sustain.png"
      customSections={customSections}
      heroBackgroundType="grid"
      heroOverlayOpacity={0.2}
      animationIntensity="medium"
      secondaryImagePath="/images/projects/sustain.png"
      heroTextGradient={true}
      heroCtaText="Explore Applications"
      heroTechnicalText="Technical Stack"
    />
  );
};

export default WarehouseAppsPage;
