'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const FluidBackground = dynamic(() => import('../canvas/FluidBackground'), {
  ssr: false,
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const titleText = 'BLUEWATERS';
  const [loadWebGL, setLoadWebGL] = useState(false);

  useEffect(() => {
    // Delay heavy WebGL initialization to prioritize text rendering (LCP)
    const timer = setTimeout(() => {
      setLoadWebGL(true);
    }, 500); // 500ms delay gives browser time to paint DOM first

    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(letters, 
      { 
        y: 100,
        opacity: 0,
        rotateX: -90,
        z: -500
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        z: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power4.out'
      }
    );

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-navy">
      {/* 3D WebGL Background Layer (Deferred for Performance) */}
      {loadWebGL && <FluidBackground />}
      
      <div className="relative z-10 text-center flex flex-col items-center max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-luxury-label text-luxury-gold"
        >
          A VTP Realty Masterpiece
        </motion.div>
        
        <div className="mb-8" ref={titleRef}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-luxury-silver/80 font-display font-medium tracking-ultra uppercase mb-3"
          >
            Township Codename
          </motion.div>
          <h1 className="sr-only">VTP Blue Waters - Luxury 2, 3 & 4 BHK Flats in Mahalunge, Pune</h1>
          <div className="flex justify-center" style={{ perspective: '500px' }} aria-hidden="true">
            {titleText.split('').map((char, i) => (
              <span 
                key={i} 
                className="letter inline-block text-4xl sm:text-5xl md:text-display-xl lg:text-display-2xl text-[#36C5CD] font-display font-black uppercase"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-luxury-silver max-w-2xl font-light mb-14 leading-relaxed text-editorial"
        >
          Experience 200+ acres of meticulously crafted luxury living where the Mula-Mutha river meets unparalleled architectural elegance in Mahalunge, West Pune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative overflow-hidden group bg-transparent border border-luxury-gold/50 px-12 py-5 text-luxury-label text-luxury-gold hover:text-luxury-navy transition-colors duration-500"
          >
            <span className="relative z-10">Discover The Vision</span>
            <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-luxury-caption text-luxury-silver/60">Scroll to explore</span>
        <div className="w-[1px] h-14 bg-luxury-gold/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-luxury-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
