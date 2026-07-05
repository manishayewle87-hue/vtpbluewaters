'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    
    // Periodically refresh ScrollTrigger to catch image loads
    const interval = setInterval(() => {
      ScrollTrigger.refresh();
    }, 2000);
    
    return () => {
      gsap.ticker.remove(update);
      clearInterval(interval);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root options={{ lerp: 0.05, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
