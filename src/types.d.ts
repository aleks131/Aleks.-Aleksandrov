import { MotionValue } from 'framer-motion';

declare module '../components/3d/ThreeScene' {
  interface ThreeSceneProps {
    mousePosition: { x: number; y: number };
    scrollProgress: MotionValue<number>;
    effectType?: string;
    sceneId?: string;
    themeColor?: string;
  }
  
  export default function ThreeScene(props: ThreeSceneProps): JSX.Element;
} 