"use client";

import React, { Suspense, lazy, useEffect } from "react";
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
} from "react-icons/fa";
import { SiNextdotjs, SiNodedotjs } from "react-icons/si";

const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const WarehouseAppsPage = () => {
  useEffect(() => {
    import('chart.js').then(({ Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend }) => {
      Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    });
  }, []);

  const metrics = [
    { value: "3 Apps", label: "In Active Production", icon: <FaRocket className="text-blue-500" size={20} /> },
    { value: "1+ Year", label: "Continuous Operation", icon: <FaCheckCircle className="text-green-500" size={20} /> },
    { value: "Digital", label: "Eliminated Paperwork", icon: <FaDatabase className="text-purple-500" size={20} /> },
  ];

  const appImpactData = {
    labels: ['Manual Time (min)', 'Error Rate (%)', 'Pages/Week'],
    datasets: [
      { label: 'Traditional', data: [45, 18, 100], backgroundColor: 'rgba(255, 99, 132, 0.6)' },
      { label: 'Digital Apps', data: [5, 1, 0], backgroundColor: 'rgba(54, 162, 235, 0.6)' },
    ],
  };

  const apps = [
    { name: "Inventory Register", description: "Real-time stock tracking replacing paper logs." },
    { name: "Task Dispatcher", description: "Live digital task assignment system." },
    { name: "Inspection Logger", description: "Mobile quality inspection reporting tool." },
  ];

  const customSections = [
    {
      title: "Internal Digital Solutions",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <FaLaptopCode className="text-blue-500" size={22} />
                <h4 className="font-bold">{app.name}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{app.description}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Impact Metrics",
      content: (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <ChartContainer>
            <Suspense fallback={<LoadingSpinner />}>
              <Bar data={appImpactData} options={{ responsive: true, maintainAspectRatio: false }} />
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
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center shadow border border-gray-100 dark:border-gray-700">
              <div className="text-blue-500 mb-1">{tech.icon}</div>
              <span className="text-xs font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const features = [
    { title: "Next.js / Node.js", description: "Full-stack apps for fast, reliable warehouse floor use.", icon: <FaLaptopCode className="text-blue-500" size={24} /> },
    { title: "Paper-Free", description: "Eliminated 100+ pages of paperwork weekly.", icon: <FaCheckCircle className="text-green-500" size={24} /> },
    { title: "1+ Year Live", icon: <FaRocket className="text-amber-500" size={24} />, description: "Continuous production uptime in warehouse floor environments." },
  ];

  const technicalDetails = [
    "Built 3 custom full-stack apps targeting specific warehouse friction points.",
    "Implemented mobile-responsive UIs for inventory and task tracking.",
    "Eliminated manual paperwork errors through digital validation.",
  ];

  return (
    <ProjectPage
      title="Internal Full-Stack Warehouse Applications"
      overview="Designed and deployed three independent web applications that digitized core warehouse operations. These apps replaced weekly paperwork and have been running reliably in production for over one year."
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
      heroTextGradient={true}
      heroCtaText="Explore Applications"
      heroTechnicalText="Technical Stack"
    />
  );
};

export default WarehouseAppsPage;
