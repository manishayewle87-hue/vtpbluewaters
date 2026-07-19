'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
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
    let p = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Center the grid
        const posX = (x - count / 2) * 0.45;
        const posZ = (z - count / 2) * 0.45;
        
        pos[i] = posX;
        pos[i + 1] = 0; // Y will be animated
        pos[i + 2] = posZ;
        
        // Random phase offset for waves
        phs[p] = Math.random() * Math.PI * 2;
        
        i += 3;
        p++;
      }
    }
    return [pos, phs];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.4;
    const count = 100;
    const array = points.current.geometry.attributes.position.array;
    
    let i = 0;
    let p = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Multi-frequency wave formula for natural fluid motion
        const posX = array[i];
        const posZ = array[i + 2];
        
        const dist = Math.sqrt(posX * posX + posZ * posZ) * 0.15;
        const wave1 = Math.sin(dist - time + phases[p]) * 0.8;
        const wave2 = Math.cos(posX * 0.1 + time) * Math.sin(posZ * 0.1 + time) * 0.5;
        
        array[i + 1] = wave1 + wave2;
        i += 3;
        p++;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
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
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(support);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Beautiful CSS gradient fallback matching our luxury theme
    return (
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#050914] via-[#0A1128] to-[#0A111F]"
        style={{
          backgroundAttachment: 'fixed',
          backgroundImage: 'radial-gradient(circle at top left, rgba(212,175,55,0.03), transparent 40%), radial-gradient(circle at bottom right, rgba(54,197,205,0.03), transparent 45%)'
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 bg-luxury-navy overflow-hidden">
      <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
        <fog attach="fog" args={['#0A1128', 10, 45]} />
        <ParticleWave />
      </Canvas>
    </div>
  );
}
