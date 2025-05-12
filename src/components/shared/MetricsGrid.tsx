import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Metric } from '@/types/project';

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h4 className="text-lg font-semibold mb-2">{metric.label}</h4>
            <p className="text-3xl font-bold text-blue-500">{metric.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {metrics.map((metric) => (
        <motion.div
          key={metric.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="text-lg font-semibold mb-2">{metric.label}</h4>
          <p className="text-3xl font-bold text-blue-500">{metric.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MetricsGrid; 