"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { registerChart } from '@/utils/chartUtils';

// Dynamically import chart components
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });
const Radar = dynamic(() => import('react-chartjs-2').then(mod => mod.Radar), { ssr: false });
const PolarArea = dynamic(() => import('react-chartjs-2').then(mod => mod.PolarArea), { ssr: false });

interface LazyChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  data: any;
  options?: any;
  height?: number;
  width?: number;
  className?: string;
}

/**
 * LazyChart component that only loads chart data when it comes into view
 * This prevents unnecessary chart rendering and improves initial page load performance
 */
const LazyChart: React.FC<LazyChartProps> = ({
  type,
  data,
  options = {},
  height = 300,
  width = 600,
  className = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isClient, setIsClient] = useState(false);
  const [isChartReady, setIsChartReady] = useState(false);
  
  // Initialize chart.js only on client side when in view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);
  
  useEffect(() => {
    if (inView && isClient && !isChartReady) {
      // Register chart components when in view
      registerChart();
      setIsChartReady(true);
    }
  }, [inView, isClient, isChartReady]);

  // Placeholder loading state
  const renderPlaceholder = () => (
    <div 
      className={`w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`} 
      style={{ height: `${height}px` }}
    >
      <div className="text-gray-400 flex flex-col items-center">
        <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">Loading chart...</p>
      </div>
    </div>
  );

  // Render the appropriate chart type
  const renderChart = () => {
    if (!isClient || !isChartReady) {
      return renderPlaceholder();
    }

    switch (type) {
      case 'line':
        return <Line data={data} options={options} height={height} width={width} />;
      case 'bar':
        return <Bar data={data} options={options} height={height} width={width} />;
      case 'pie':
        return <Pie data={data} options={options} height={height} width={width} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} height={height} width={width} />;
      case 'radar':
        return <Radar data={data} options={options} height={height} width={width} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} height={height} width={width} />;
      default:
        return <Line data={data} options={options} height={height} width={width} />;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative chart-container ${className}`}
      style={{ height: `${height}px`, width: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isChartReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {renderChart()}
    </motion.div>
  );
};

export default LazyChart; 