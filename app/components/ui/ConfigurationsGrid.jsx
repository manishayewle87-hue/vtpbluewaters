'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConfigurationsGrid({ projects }) {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    // Check if device is desktop for horizontal scroll
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
      const scrollWidth = scrollWrapperRef.current.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      const tween = gsap.to(scrollWrapperRef.current, {
        x: -amountToScroll,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${amountToScroll}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="residences" className="py-24 lg:py-0 lg:h-screen bg-[#050914] relative border-t border-luxury-gold/10 overflow-hidden flex items-center">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luxury-gold/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl lg:hidden mb-16">
        <div className="text-luxury-label text-luxury-gold mb-4">The Collection</div>
        <h2 className="text-display-sm font-display font-light">Signature <span className="italic text-luxury-silver">Residences</span></h2>
      </div>

      {/* Horizontal Scroll Wrapper for Desktop, Grid for Mobile */}
      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 lg:px-[10vw] w-full lg:w-max h-auto lg:h-[70vh] items-center"
      >
        {/* Intro Slide (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center w-[40vw] flex-shrink-0 pr-20">
          <div className="text-luxury-label text-luxury-gold mb-4">The Collection</div>
          <h2 className="text-display-md font-display font-light mb-6">Signature <br/><span className="italic text-luxury-silver">Residences</span></h2>
          <p className="text-luxury-silver font-light text-editorial max-w-md">
            Explore our curated portfolio of ultra-luxury clusters. Each project represents a unique expression of architectural excellence, tailored for the discerning few.
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative w-full lg:w-[450px] aspect-[4/5] lg:h-full flex-shrink-0 bg-white/[0.02] border border-white/5 overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {project.heroImage ? (
                <Image 
                  src={project.heroImage} 
                  alt={project.name || 'Project image'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                />
              ) : (
                <div className="w-full h-full bg-[#0a0f1c] opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/80 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
              <div className="text-luxury-label text-luxury-gold mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                {project.type}
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-display font-light text-white mb-2">{project.name}</h3>
              
              <div className="flex items-center gap-4 text-sm text-luxury-silver/80 font-light mb-8">
                <span>{project.configurations}</span>
                <span className="w-1 h-1 rounded-full bg-luxury-gold"></span>
                <span>{project.status}</span>
              </div>

              <Link href={`/projects/${project.slug}`}>
                <button className="flex items-center gap-4 text-luxury-caption text-white group-hover:text-luxury-gold transition-colors">
                  <span className="tracking-widest uppercase">Explore Project</span>
                  <span className="w-8 h-[1px] bg-luxury-gold/50 group-hover:w-16 group-hover:bg-luxury-gold transition-all duration-500"></span>
                </button>
              </Link>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-luxury-gold/30"></div>
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-luxury-gold/30"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
