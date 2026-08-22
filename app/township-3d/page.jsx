'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

// Dynamically load Canvas with SSR disabled to prevent Three.js SSR/WebGL hydration errors
const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then((mod) => mod.OrbitControls), { ssr: false });
const BakeShadows = dynamic(() => import('@react-three/drei').then((mod) => mod.BakeShadows), { ssr: false });
const Preload = dynamic(() => import('@react-three/drei').then((mod) => mod.Preload), { ssr: false });
const TownshipModel = dynamic(() => import('@/app/components/3d/TownshipModel'), { ssr: false });


export default function Township3DPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050914] overflow-hidden flex flex-col">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full z-10 p-6 pt-24 md:px-12 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: '3D Township Experience', href: '/township-3d' }
          ]} />
          <h1 className="text-3xl md:text-5xl font-heading text-white mt-6 mb-2">
            Interactive <span className="text-luxury-gold italic">Master Plan</span>
          </h1>
          <p className="text-sm md:text-base text-luxury-silver max-w-md">
            Drag to rotate. Scroll to zoom. Click on any premium cluster to explore floor plans and RERA details. Experience 200+ acres of VTP Blue Waters.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full flex-grow relative cursor-grab active:cursor-grabbing">
        {mounted && (
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-luxury-gold">Loading 3D Experience...</div>}>
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 8, 15], fov: 45 }}
              gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
              <color attach="background" args={['#050914']} />
              <fog attach="fog" args={['#050914', 10, 40]} />
              <TownshipModel />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={25}
                maxPolarAngle={Math.PI / 2 - 0.1}
                minPolarAngle={0.1}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
              <BakeShadows />
              <Preload all />
            </Canvas>
          </Suspense>
        )}
      </div>
    </div>
  );
}

