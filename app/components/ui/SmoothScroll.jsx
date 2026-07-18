'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check UX preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    if (!mediaQuery.matches) {
      function update(time) {
        lenisRef.current?.lenis?.raf(time * 1000);
      }
      
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      
      return () => {
        gsap.ticker.remove(update);
        mediaQuery.removeEventListener('change', handler);
      };
    }
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // UX Hardening: If user prefers reduced motion, disable Lenis completely
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root options={{ lerp: 0.05, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
