"use client";

import React, { Suspense, lazy, useEffect } from "react";
import ProjectPage from "@/components/ProjectPage";
import { motion } from "framer-motion";
import { LoadingSpinner, ChartContainer } from "@/components/shared";
import {
  FaDatabase,
  FaChartBar,
  FaCogs,
  FaCheckCircle,
  FaArrowRight,
  FaServer,
} from "react-icons/fa";

const Bar = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })));

const SapMigrationPage = () => {
  useEffect(() => {
    import('chart.js').then(({ Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend }) => {
      Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    });
  }, []);

  const metrics = [
    { value: "100%", label: "Data Integrity Maintained", icon: <FaCheckCircle className="text-green-500" size={20} /> },
    { value: "4 Mo.", label: "Migration Duration", icon: <FaCogs className="text-blue-500" size={20} /> },
    { value: "Automated", label: "Legacy Reporting", icon: <FaChartBar className="text-purple-500" size={20} /> },
  ];

  const beforeAfterData = {
    labels: ['Manual Steps', 'Report Time (hrs)', 'Data Errors', 'Scripts Maintained'],
    datasets: [
      {
        label: 'Before Migration',
        data: [12, 8, 15, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: 'After Migration',
        data: [2, 1.5, 0, 5],
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

  const customSections = [
    {
      title: "Migration Architecture",
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-8 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
          {[
            { icon: <FaDatabase size={28} />, label: "Legacy SQL Scripts", color: "text-red-400" },
            { icon: <FaArrowRight size={20} />, label: "", color: "text-gray-400", isArrow: true },
            { icon: <FaCogs size={28} />, label: "R Automation Layer", color: "text-yellow-400" },
            { icon: <FaArrowRight size={20} />, label: "", color: "text-gray-400", isArrow: true },
            { icon: <FaServer size={28} />, label: "SAP DataSphere", color: "text-blue-400" },
            { icon: <FaArrowRight size={20} />, label: "", color: "text-gray-400", isArrow: true },
            { icon: <FaChartBar size={28} />, label: "Live Dashboards", color: "text-green-400" },
          ].map((step, i) =>
            step.isArrow ? (
              <span key={i} className={`${step.color} text-xl rotate-90 md:rotate-0 shrink-0`}><FaArrowRight /></span>
            ) : (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[110px] p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <span className={step.color}>{step.icon}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{step.label}</span>
              </div>
            )
          )}
        </div>
      ),
    },
    {
      title: "Before vs After Migration",
      content: (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <ChartContainer>
            <Suspense fallback={<LoadingSpinner />}>
              <Bar data={beforeAfterData} options={barOptions} />
            </Suspense>
          </ChartContainer>
        </div>
      ),
    },
  ];

  const features = [
    { title: "Legacy Analysis", description: "Audited 30+ legacy scripts for full coverage.", icon: <FaDatabase className="text-blue-500" size={24} /> },
    { title: "R Automation", description: "Automated transformations into SAP DataSphere.", icon: <FaCogs className="text-purple-500" size={24} /> },
    { title: "Data Integrity", description: "Guaranteed 100% accuracy during migration.", icon: <FaCheckCircle className="text-green-500" size={24} /> },
    { title: "Live Reporting", description: "Deployed real-time dashboards in SAP.", icon: <FaChartBar className="text-amber-500" size={24} /> },
  ];

  const technicalDetails = [
    "Audited 30+ legacy SQL and R reporting scripts across multiple domains.",
    "Integrated automated data transformation pipelines using R.",
    "Validated all migrated data against source systems for 100% accuracy.",
    "Delivered live analytical views and dashboards within SAP DataSphere.",
  ];

  return (
    <ProjectPage
      title="SAP DataSphere Reporting Migration"
      overview="Led the end-to-end migration of 30+ legacy reporting scripts into SAP DataSphere, using SQL and R automation to eliminate manual processes and establish a scalable data reporting infrastructure."
      teamSize="1"
      duration="4 Months"
      role="Data & Automation Engineer"
      metrics={metrics}
      features={features}
      technicalDetails={technicalDetails}
      imagePath="/images/projects/sap_migration.png"
      customSections={customSections}
      heroBackgroundType="waves"
      heroOverlayOpacity={0.2}
      animationIntensity="medium"
      heroTextGradient={true}
      heroCtaText="View Migration Details"
      heroTechnicalText="Technical Architecture"
    />
  );
};

export default SapMigrationPage;
