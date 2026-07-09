'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const FluidBackground = dynamic(() => import('../canvas/FluidBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-luxury-navy z-0"></div>
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const titleText = 'BLUEWATERS';

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into characters for 3D letter reveal
    // Using simple querySelectorAll since we map the spans manually in JSX below
    const letters = titleRef.current.querySelectorAll('.letter');
    
    // Slight delay to ensure DOM and fonts are fully painted before 3D transforms
    setTimeout(() => {
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
          duration: 1.5,
          stagger: 0.05,
          delay: 0.2, // reduced delay since setTimeout adds some
          ease: 'power4.out'
        }
      );
    }, 100);

    // Scroll-linked parallax effect
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

  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Background Layer */}
      <FluidBackground />
      
      {/* Overlay removed for maximum brightness */}

      <div className="relative z-10 text-center flex flex-col items-center max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mb-4 text-luxury-label text-luxury-gold"
        >
          A VTP Realty Masterpiece
        </motion.div>
        
        <div className="mb-8" ref={titleRef}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-luxury-silver/80 font-display font-medium tracking-ultra uppercase mb-3"
          >
            Township Codename
          </motion.div>
          <h1 className="flex justify-center" style={{ perspective: '500px' }}>
            {titleText.split('').map((char, i) => (
              <span 
                key={i} 
                className="letter inline-block text-4xl sm:text-5xl md:text-display-xl lg:text-display-2xl text-[#36C5CD] font-display font-black uppercase"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-base md:text-lg text-luxury-silver max-w-2xl font-light mb-14 leading-relaxed text-editorial"
        >
          Experience 200+ acres of meticulously crafted luxury living where the Mula-Mutha river meets unparalleled architectural elegance in Mahalunge, West Pune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
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
        transition={{ delay: 3, duration: 1 }}
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
