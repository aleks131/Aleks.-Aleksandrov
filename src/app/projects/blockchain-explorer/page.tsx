"use client";

import React from "react";
import ProjectPage from "@/components/ProjectPage";
import { FaChartLine, FaNetworkWired, FaShieldAlt, FaSearch, FaCode, FaDatabase } from "react-icons/fa";
import { SiBlockchaindotcom, SiEthereum, SiReact, SiTypescript } from "react-icons/si";
import Preloader from "@/components/shared/Preloader";

const BlockchainExplorerPage = () => {
  const metrics = [
    { value: "5M+", label: "Transactions Indexed", icon: <FaDatabase className="text-blue-500" size={24} /> },
    { value: "99.9%", label: "Uptime", icon: <FaShieldAlt className="text-green-500" size={24} /> },
    { value: "3s", label: "Avg. Response Time", icon: <FaSearch className="text-purple-500" size={24} /> },
  ];

  const features = [
    {
      title: "Real-time Tracking",
      description: "Track transactions, blocks, and wallet activities in real-time with comprehensive data visualization.",
      icon: <FaChartLine className="text-blue-500" size={24} />,
    },
    {
      title: "Network Analytics",
      description: "Advanced network analytics providing insights into blockchain health, transaction volume, and gas usage.",
      icon: <FaNetworkWired className="text-green-500" size={24} />,
    },
    {
      title: "Security Monitoring",
      description: "Built-in security monitoring for detecting suspicious transactions and potential vulnerabilities.",
      icon: <FaShieldAlt className="text-purple-500" size={24} />,
    },
    {
      title: "Powerful Search",
      description: "Comprehensive search capabilities for transactions, addresses, blocks, and smart contracts.",
      icon: <FaSearch className="text-amber-500" size={24} />,
    },
  ];

  const technologies = [
    { name: "React", icon: <SiReact className="text-blue-400" size={20} /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" size={20} /> },
    { name: "Ethereum APIs", icon: <SiEthereum className="text-purple-400" size={20} /> },
    { name: "Web3.js", icon: <SiBlockchaindotcom className="text-green-400" size={20} /> },
    { name: "Node.js", icon: <FaCode className="text-green-600" size={20} /> },
  ];

  const technicalDetails = [
    "Implemented real-time data synchronization with multiple blockchain networks",
    "Developed custom indexing system for efficient blockchain data retrieval",
    "Created advanced visualization components using D3.js and Chart.js",
    "Built secure API endpoints for data access with rate limiting and caching",
    "Designed responsive interface optimized for both desktop and mobile devices"
  ];

  return (
    <Preloader text="Loading blockchain explorer data...">
      <ProjectPage
        title="Blockchain Network Explorer"
        overview="A comprehensive blockchain explorer providing real-time insights into transaction history, smart contracts, and network analytics for multiple blockchain networks."
        teamSize="3"
        duration="4 months"
        role="Lead Developer"
        metrics={metrics}
        features={features}
        technologies={technologies}
        technicalDetails={technicalDetails}
        results={metrics}
        imagePath="/images/projects/blockchain-explorer.jpg"
        heroBackgroundType="gradient"
        heroOverlayOpacity={0.3}
        animationIntensity="medium"
        heroTextGradient={true}
        heroCtaText="Explore Platform Features"
        heroTechnicalText="Technical Architecture"
      />
    </Preloader>
  );
};

export default BlockchainExplorerPage; 