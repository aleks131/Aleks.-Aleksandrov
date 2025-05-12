import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface ProjectNavigationProps {
  previousProject?: {
    name: string;
    path: string;
  };
  nextProject?: {
    name: string;
    path: string;
  };
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ previousProject, nextProject }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-4 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2"
      >
        {previousProject && (
          <Link href={previousProject.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 cursor-pointer"
            >
              <FaArrowLeft className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {previousProject.name}
              </span>
            </motion.div>
          </Link>
        )}

        {nextProject && (
          <Link href={nextProject.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {nextProject.name}
              </span>
              <FaArrowRight className="text-gray-600 dark:text-gray-300" />
            </motion.div>
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectNavigation; 