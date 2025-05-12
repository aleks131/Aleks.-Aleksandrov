import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaSpinner } from 'react-icons/fa';
import Preloader from './Preloader';

// Export Preloader to fix build error
export { Preloader };

// Shared loading spinner for asynchronous content
export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-48">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaSpinner className="text-blue-500 w-8 h-8" />
      </motion.div>
    </div>
  );
};

// Shared container for all chart components with consistent styling
export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[300px] w-full mx-auto">
      {children}
    </div>
  );
};

// Interface for metric items
export interface Metric {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: string;
}

// Animated metric grid component
export const MetricsGrid = ({ metrics }: { metrics: Metric[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
      {metrics.map((metric, index) => {
        // Parse number value for CountUp if it's a string with just numbers
        const numericValue = typeof metric.value === 'string' 
          ? parseFloat(metric.value.replace(/[^\d.-]/g, '')) 
          : metric.value;
        
        const isNumeric = !isNaN(numericValue as number);
        
        const getColorClass = () => {
          switch (metric.color) {
            case 'blue': return 'bg-blue-500/10 border-blue-200 dark:border-blue-900';
            case 'green': return 'bg-green-500/10 border-green-200 dark:border-green-900';
            case 'purple': return 'bg-purple-500/10 border-purple-200 dark:border-purple-900';
            case 'red': return 'bg-red-500/10 border-red-200 dark:border-red-900';
            case 'amber': return 'bg-amber-500/10 border-amber-200 dark:border-amber-900';
            default: return 'bg-blue-500/10 border-blue-200 dark:border-blue-900';
          }
        };
        
        return (
          <motion.div
            key={index}
            className={`rounded-xl p-4 border ${getColorClass()} flex flex-col items-center justify-center text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.03 }}
          >
            {metric.icon && <div className="mb-2">{metric.icon}</div>}
            
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400">
              {isNumeric ? (
                <CountUp 
                  start={0} 
                  end={numericValue as number} 
                  duration={2} 
                  separator="," 
                  decimals={
                    typeof numericValue === 'number' && numericValue % 1 !== 0 
                      ? String(numericValue).split('.')[1]?.length || 0
                      : 0
                  }
                  decimal="."
                  prefix={metric.prefix || ''}
                  suffix={metric.suffix || ''}
                />
              ) : (
                <>{metric.prefix || ''}{metric.value}{metric.suffix || ''}</>
              )}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {metric.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Custom section header component with gradient background
export const CustomSectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="relative mb-8">
      <motion.div
        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <h2 className="relative text-2xl md:text-3xl font-bold py-2 px-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-800">
        {title}
      </h2>
    </div>
  );
}; 