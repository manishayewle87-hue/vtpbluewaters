'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

const ParticleWave = () => {
  const points = useRef();
  
  // Create a grid of points
  const [positions, phases] = useMemo(() => {
    const count = 100; // grid size (100x100)
    const pos = new Float32Array(count * count * 3);
    const phs = new Float32Array(count * count);
    
    let i = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Center the grid around origin
        pos[i * 3] = (x - count / 2) * 0.5; // x
        pos[i * 3 + 1] = 0;                 // y (will be animated)
        pos[i * 3 + 2] = (z - count / 2) * 0.5; // z
        
        // Phase offset for wave math
        phs[i] = Math.sqrt((x - count / 2) ** 2 + (z - count / 2) ** 2);
        
        i++;
      }
    }
    return [pos, phs];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posArray = points.current.geometry.attributes.position.array;
    
    // Animate the Y position to create a smooth, undulating wave
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      // Complex wave combining multiple sine waves for a fluid look
      const y = Math.sin(phase * 0.5 - time * 2) * 1.5 
              + Math.cos(phase * 0.3 + time) * 0.5;
      
      posArray[i * 3 + 1] = y;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire system
    points.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00FFFF"
        transparent
        opacity={1.0}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-luxury-navy overflow-hidden">
      <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
        <fog attach="fog" args={['#0A1128', 10, 45]} />
        <ParticleWave />
      </Canvas>
    </div>
  );
}
