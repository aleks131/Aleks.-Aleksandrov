import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Float, Text3D, OrbitControls, Stars } from '@react-three/drei';

interface ThreeSceneProps {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  effectType?: string;
  sceneId?: string;
  themeColor?: string;
}

// Helper function to convert theme color to THREE.Color
const getThemeColor = (themeColor = 'blue'): THREE.Color => {
  const colorMap: Record<string, string> = {
    blue: '#4f46e5',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f97316',
    red: '#ef4444',
  };
  
  return new THREE.Color(colorMap[themeColor] || colorMap.blue);
};

// Particle system for the Particles effect
const ParticleSystem = ({ count = 1000, themeColor = 'blue', sceneId = 'default' }: { count?: number, themeColor?: string, sceneId?: string }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  
  // Generate unique but deterministic particles for each scene
  const seed = sceneId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (i: number) => {
    const x = Math.sin(i + seed) * 10000;
    return x - Math.floor(x);
  };
  
  // Create a custom geometry based on the scene ID
  const shapeType = seed % 3;
  
  // Create particle instances
  const particles = useMemo(() => {
    const temp = new THREE.Object3D();
    const positions = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;
      
      // Different distribution based on sceneId
      let x, y, z;
      const sceneVariation = seed % 5;
      
      switch(sceneVariation) {
        // Spherical distribution
        case 0:
          x = radius * Math.sin(theta) * Math.cos(Math.random() * Math.PI * 2);
          y = radius * Math.sin(theta) * Math.sin(Math.random() * Math.PI * 2);
          z = radius * Math.cos(theta);
          break;
        // Cylindrical distribution
        case 1:
          x = radius * Math.cos(theta);
          y = (Math.random() - 0.5) * 10;
          z = radius * Math.sin(theta);
          break;
        // Spiral distribution
        case 2:
          const t = i / count * Math.PI * 20;
          const r = Math.max(0.1, 5 * Math.pow(0.8, t / 10));
          x = r * Math.cos(t);
          y = (t - 10) * 0.2;
          z = r * Math.sin(t);
          break;
        // Gaussian distribution
        case 3:
          // Box-Muller transform for Gaussian distribution
          const u1 = random(i * 2);
          const u2 = random(i * 2 + 1);
          const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
          const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
          x = z0 * 5;
          y = z1 * 5;
          z = (random(i) - 0.5) * 10;
          break;
        // Grid with noise
        default:
          x = (Math.floor(i / 10) - count / 20) * 0.5 + (random(i) - 0.5) * 0.2;
          y = (i % 10 - 5) * 0.5 + (random(i + 10) - 0.5) * 0.2;
          z = (random(i * 3) - 0.5) * 5;
      }
      
      positions.push({ x, y, z });
      
      temp.position.set(x, y, z);
      temp.updateMatrix();
      mesh.current?.setMatrixAt(i, temp.matrix);
    }
    return positions;
  }, [count, seed]);
  
  // Animate particles
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    const temp = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const { x, y, z } = particles[i];
      
      // Different animation based on sceneId
      const animVariation = seed % 4;
      
      switch(animVariation) {
        // Pulsating movement
        case 0:
          temp.position.set(
            x * (1 + Math.sin(time * 0.1 + i) * 0.1),
            y * (1 + Math.cos(time * 0.1 + i) * 0.1),
            z * (1 + Math.sin(time * 0.1 + i * 2) * 0.1)
          );
          break;
        // Wave movement
        case 1:
          temp.position.set(
            x,
            y + Math.sin(time * 0.5 + x * 0.5) * 0.3,
            z
          );
          break;
        // Circular movement
        case 2:
          const angle = time * 0.2 + i * 0.01;
          temp.position.set(
            x * Math.cos(angle) - z * Math.sin(angle),
            y,
            x * Math.sin(angle) + z * Math.cos(angle)
          );
          break;
        // Subtle random movement
        default:
          temp.position.set(
            x + Math.sin(time + i) * 0.05,
            y + Math.cos(time + i * 2) * 0.05,
            z + Math.sin(time + i * 3) * 0.05
          );
      }
      
      // Rotate each particle
      temp.rotation.set(time * 0.1 + i, time * 0.2 + i, time * 0.3 + i);
      
      // Scale with breathing effect
      const scale = 0.05 + Math.sin(time * 2 + i * 0.1) * 0.02;
      temp.scale.set(scale, scale, scale);
      
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Animate light
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 5;
      light.current.position.y = Math.sin(time * 0.5) * 3;
      light.current.position.z = Math.cos(time * 0.3) * 5;
    }
  });
  
  const baseColor = getThemeColor(themeColor);
  const lightColor = baseColor.clone().multiplyScalar(1.5);
  
  return (
    <group>
      <pointLight 
        ref={light} 
        color={lightColor} 
        intensity={2} 
        position={[0, 0, 0]} 
        distance={10} 
      />
      
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        {shapeType === 0 ? (
          <dodecahedronGeometry args={[0.2, 0]} />
        ) : shapeType === 1 ? (
          <octahedronGeometry args={[0.2, 0]} />
        ) : (
          <torusKnotGeometry args={[0.1, 0.05, 16, 8]} />
        )}
        <meshStandardMaterial 
          color={baseColor} 
          emissive={baseColor.clone().multiplyScalar(0.2)} 
          metalness={0.8} 
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
};

// 3D text floating in space
const FloatingText = ({ text = '3D', themeColor = 'blue' }: { text?: string, themeColor?: string }) => {
  const baseColor = getThemeColor(themeColor);
  const group = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={[0, 0, -2]}
    >
      <group ref={group}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial 
            color={baseColor} 
            emissive={baseColor.clone().multiplyScalar(0.5)} 
            metalness={0.8} 
            roughness={0.2}
          />
        </Text3D>
      </group>
    </Float>
  );
};

// Grid of lines to create a futuristic floor effect
const GridFloor = ({ themeColor = 'blue' }: { themeColor?: string }) => {
  const baseColor = getThemeColor(themeColor);
  
  return (
    <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[40, 40, baseColor, baseColor.clone().multiplyScalar(0.5)]}
        position={[0, 0, 0]}
      />
      <mesh receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="black" 
          transparent 
          opacity={0.3} 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

// Main ThreeScene component
export default function ThreeScene({ 
  mousePosition, 
  scrollProgress, 
  effectType = 'particles',
  sceneId = 'default',
  themeColor = 'blue'
}: ThreeSceneProps) {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  
  // Subscribe to scroll progress updates
  useEffect(() => {
    const unsubscribe = scrollProgress.onChange(latest => {
      scrollRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollProgress]);
  
  // Use mouse position to move camera slightly
  useFrame(() => {
    if (camera) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 2, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });
  
  return (
    <>
      <color attach="background" args={['transparent']} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Different scene content based on effect type */}
      {effectType === 'particles' && (
        <ParticleSystem themeColor={themeColor} sceneId={sceneId} />
      )}
      
      {effectType === 'text3d' && (
        <FloatingText text={sceneId.toUpperCase()} themeColor={themeColor} />
      )}
      
      {effectType === 'stars' && (
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      )}
      
      {/* Common elements for all scenes */}
      <GridFloor themeColor={themeColor} />
      
      {/* Disable orbit controls for production */}
      {/* <OrbitControls enableZoom={false} /> */}
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={0.3} 
          blendFunction={BlendFunction.SCREEN}
        />
        <ChromaticAberration 
          offset={[0.0005, 0.0005]} 
          blendFunction={BlendFunction.NORMAL}
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>
    </>
  );
} 