import { ReactNode } from 'react';

export interface Metric {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: ReactNode;
  color?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface ProjectData {
  title: string;
  overview: string;
  teamSize?: string;
  duration?: string;
  role?: string;
  metrics?: {
    label: string;
    value: string | number;
  }[];
  features?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  customSections?: {
    title: string;
    content: React.ReactNode;
  }[];
}

export interface EnhancedProjectData extends ProjectData {
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  heroBackgroundType?: 'particles' | 'grid' | 'gradient' | 'waves';
  keyHighlights?: {
    title: string;
    description: string;
    icon?: ReactNode;
    color?: string;
  }[];
  technicalImplementation?: {
    title: string;
    description: string;
    codeSnippet?: string;
    language?: string;
  }[];
  mediaGallery?: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
    size?: 'small' | 'medium' | 'large';
  }[];
  relatedProjects?: {
    title: string;
    path: string;
    image?: string;
  }[];
  animationPreferences?: {
    intensity?: 'low' | 'medium' | 'high';
    enableParallax?: boolean;
    enableScrollEffects?: boolean;
    reducedMotion?: boolean;
  };
}

export interface ChartDataset {
  label?: string;
  data: number[] | { x: number; y: number; r?: number }[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
  yAxisID?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
} 