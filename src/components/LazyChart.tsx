'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from './LoadingIndicator';

// Types for chart props
type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';

interface ChartData {
  labels?: string[];
  datasets: any[];
  [key: string]: any;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  [key: string]: any;
}

interface LazyChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  width?: number | string;
  height?: number | string;
  className?: string;
  fallback?: React.ReactNode;
  threshold?: number;
  forceRender?: boolean;
}

// Lazy load all chart components individually
const Line = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Line })));
const Bar = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Bar })));
const Pie = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Pie })));
const Doughnut = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Doughnut })));
const Radar = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Radar })));
const PolarArea = lazy(() => import('react-chartjs-2').then(module => ({ default: module.PolarArea })));
const Bubble = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Bubble })));
const Scatter = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Scatter })));

/**
 * LazyChart component that only loads and renders charts when they are visible
 * Significantly improves page performance by deferring chart rendering
 */
export default function LazyChart({
  type,
  data,
  options = {},
  width = '100%',
  height = 300,
  className = '',
  fallback = <ChartSkeleton />,
  threshold = 0.1,
  forceRender = false,
}: LazyChartProps) {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  // Ensure we're running client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Default options for better visuals
  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        cornerRadius: 4,
        boxPadding: 4,
      },
    },
  };

  // Merge default options with user options
  const mergedOptions = { ...defaultOptions, ...options };

  // Don't render on the server to avoid hydration issues
  if (!isClient) return <div ref={ref}>{fallback}</div>;

  // Only render if in view or forced
  if (!inView && !forceRender) {
    return <div ref={ref} className={`relative ${className}`} style={{ width, height }}>{fallback}</div>;
  }

  // Render the appropriate chart component
  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <Suspense fallback={fallback}>
        <div className="absolute inset-0">
          {type === 'line' && <Line data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'bar' && <Bar data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'pie' && <Pie data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'doughnut' && <Doughnut data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'radar' && <Radar data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'polarArea' && <PolarArea data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'bubble' && <Bubble data={data} options={mergedOptions} width={width} height={height} />}
          {type === 'scatter' && <Scatter data={data} options={mergedOptions} width={width} height={height} />}
        </div>
      </Suspense>
    </div>
  );
}

// Skeleton loading state for charts
function ChartSkeleton() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100/50 dark:bg-gray-800/50 rounded-lg animate-pulse">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="md" className="mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
      </div>
    </div>
  );
} 