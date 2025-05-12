import type { Metric as ProjectMetric } from "@/types/project";

// Define the component metric type locally instead of importing from ProjectPage
interface ComponentMetric {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

/**
 * Converts metrics from project types to component types
 * This helps with type compatibility between different metric formats
 */
export const convertMetrics = (metrics: ProjectMetric[]): ComponentMetric[] => {
  return metrics.map(metric => ({
    ...metric,
    // Ensure value is always a string
    value: String(metric.value)
  }));
};

/**
 * Creates standardized project structure with required props
 * Useful for ensuring all projects have consistent formatting
 */
export const createStandardProject = (projectData: any) => {
  return {
    ...projectData,
    metrics: convertMetrics(projectData.metrics || []),
    results: convertMetrics(projectData.results || []),
  };
}; 