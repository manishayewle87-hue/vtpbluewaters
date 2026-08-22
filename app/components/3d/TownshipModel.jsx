'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Environment, ContactShadows, Text } from '@react-three/drei';

function Tower({ position, scale, name, color, href }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = href;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color={hovered ? '#D4AF37' : color} // Hover turns it to Luxury Gold
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Floating HTML Annotation (Only shows on hover) */}
      {hovered && (
        <Html position={[0, scale[1] / 2 + 1, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-luxury-navy/90 border border-luxury-gold text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md whitespace-nowrap min-w-[200px] transform transition-all duration-300 pointer-events-none">
            <h3 className="font-heading text-xl text-luxury-gold m-0">{name}</h3>
            <p className="text-xs text-luxury-silver mt-1 uppercase tracking-widest">Click to explore floor plans</p>
          </div>
        </Html>
      )}

      {/* Permanent Label below tower */}
      <Text
        position={[0, -scale[1] / 2 - 0.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

    </group>
  );
}

function Riverfront() {
  const riverRef = useRef();

  useFrame((state) => {
    if (riverRef.current) {
      // Create a gentle flowing effect
      riverRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={riverRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 10, 32, 32]} />
      <meshPhysicalMaterial 
        color="#0A1128"
        metalness={1}
        roughness={0.1}
        clearcoat={1}
        transparent={true}
        opacity={0.8}
        envMapIntensity={3}
      />
    </mesh>
  );
}

function BaseGround() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 40]} />
      <meshStandardMaterial color="#050914" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function TownshipModel() {
  return (
    <group position={[0, -2, 0]}>
      {/* Lighting & Environment */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#D4AF37" />
      <Environment preset="city" />

      {/* Base Landscape */}
      <BaseGround />
      <Riverfront />

      {/* Shadows */}
      <ContactShadows position={[0, -0.4, 0]} opacity={0.7} scale={40} blur={2} far={4.5} />

      {/* Premium Clusters */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Tower 
          position={[-6, 2, -2]} 
          scale={[2, 6, 2]} 
          name="VTP Earth 1" 
          color="#1A2A42"
          href="/projects/vtp-earth-one-mahalunge-pune"
        />
        <Tower 
          position={[0, 3, 2]} 
          scale={[2.5, 8, 2.5]} 
          name="VTP Monarque" 
          color="#141E30"
          href="/projects/vtp-monarque-hinjawadi-pune"
        />
        <Tower 
          position={[6, 1.5, -1]} 
          scale={[2, 5, 2]} 
          name="VTP Volare" 
          color="#1A2A42"
          href="/projects/vtp-volare-hinjawadi-pune"
        />
      </Float>
      
      {/* Secondary amenities / retail (Town Square) */}
      <Tower 
        position={[3, 0.5, 5]} 
        scale={[4, 1.5, 2]} 
        name="Town Square Retail" 
        color="#2C3E50"
        href="/#commercial"
      />
    </group>
  );
}
