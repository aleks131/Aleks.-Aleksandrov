import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  ScatterController,
  TimeScale,
} from 'chart.js';

// Register all chart components
export const registerChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement,
    RadarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    ScatterController,
    TimeScale
  );
};

// Simple chart options to avoid TypeScript errors
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 10,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Get theme colors for charts
export const getChartColors = (theme: string) => {
  switch (theme) {
    case 'blue':
      return {
        primary: 'rgb(59, 130, 246)',
        secondary: 'rgb(99, 102, 241)',
        tertiary: 'rgb(139, 92, 246)',
        quaternary: 'rgb(217, 70, 239)',
        light: 'rgba(59, 130, 246, 0.2)',
      };
    case 'green':
      return {
        primary: 'rgb(16, 185, 129)',
        secondary: 'rgb(52, 211, 153)',
        tertiary: 'rgb(10, 155, 109)',
        quaternary: 'rgb(4, 120, 87)',
        light: 'rgba(16, 185, 129, 0.2)',
      };
    case 'purple':
      return {
        primary: 'rgb(139, 92, 246)',
        secondary: 'rgb(124, 58, 237)',
        tertiary: 'rgb(167, 139, 250)',
        quaternary: 'rgb(196, 181, 253)',
        light: 'rgba(139, 92, 246, 0.2)',
      };
    case 'red':
      return {
        primary: 'rgb(239, 68, 68)',
        secondary: 'rgb(220, 38, 38)',
        tertiary: 'rgb(248, 113, 113)',
        quaternary: 'rgb(252, 165, 165)',
        light: 'rgba(239, 68, 68, 0.2)',
      };
    case 'orange':
      return {
        primary: 'rgb(249, 115, 22)',
        secondary: 'rgb(234, 88, 12)',
        tertiary: 'rgb(251, 146, 60)',
        quaternary: 'rgb(253, 186, 116)',
        light: 'rgba(249, 115, 22, 0.2)',
      };
    default:
      return {
        primary: 'rgb(59, 130, 246)',
        secondary: 'rgb(99, 102, 241)',
        tertiary: 'rgb(139, 92, 246)',
        quaternary: 'rgb(217, 70, 239)',
        light: 'rgba(59, 130, 246, 0.2)',
      };
  }
}; 