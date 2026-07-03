'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const imageRevealVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { 
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
  }
};

export default function ConfigurationsGrid({ projects }) {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
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
    <section ref={containerRef} id="residences" className="py-16 pb-28 lg:pb-0 lg:py-0 lg:h-screen bg-[#050914] relative border-t border-luxury-gold/10 overflow-hidden flex flex-col lg:items-center">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luxury-gold/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl lg:hidden mb-10 pt-4">
        <div className="text-luxury-label text-luxury-gold mb-3">The Collection</div>
        <h2 className="text-display-sm font-display font-light">Signature <span className="italic text-luxury-silver">Residences</span></h2>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col lg:flex-row gap-6 lg:gap-16 px-6 lg:px-[10vw] w-full lg:w-max h-auto lg:h-[70vh] lg:items-center"
      >
        <div className="hidden lg:flex flex-col justify-center w-[40vw] flex-shrink-0 pr-20">
          <div className="text-luxury-label text-luxury-gold mb-4 tracking-[0.3em]">The Collection</div>
          <h2 className="text-display-md font-display font-light mb-6">Signature <br/><span className="italic text-luxury-silver">Residences</span></h2>
          <p className="text-luxury-silver font-light text-editorial max-w-md">
            Explore our curated portfolio of ultra-luxury clusters. Each project represents a unique expression of architectural excellence, tailored for the discerning few.
          </p>
        </div>

        {projects.map((project, index) => {
          const isHovered = hoveredCard === index;

          return (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative w-full lg:w-[450px] h-[72vw] max-h-[340px] lg:h-full lg:max-h-none flex-shrink-0 bg-white/[0.02] border border-white/5 overflow-hidden cursor-pointer"
            >
              <motion.div variants={imageRevealVariants} className="absolute inset-0">
                {project.image ? (
                  <motion.div
                    animate={{ 
                      scale: isHovered ? 1.15 : 1,
                      filter: isHovered ? 'brightness(1.1)' : 'brightness(0.9)'
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src={project.image} 
                      alt={project.name || 'Project image'}
                      fill
                      sizes="(max-width: 1024px) 100vw, 450px"
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full bg-[#0a0f1c]"></div>
                )}
                {/* Complex Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/60 to-transparent"></div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-luxury-gold/20 via-transparent to-transparent mix-blend-screen"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-10">
                <motion.div 
                  className="text-luxury-label text-luxury-gold mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  {project.township}
                </motion.div>
                
                <h3 className="text-3xl lg:text-4xl font-display font-light text-white mb-2">{project.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-luxury-silver/80 font-light mb-8">
                  <span>{project.location}</span>
                  <span className="w-1 h-1 rounded-full bg-luxury-gold"></span>
                  <span>Ultra Luxury</span>
                </div>

                <Link href={`/en/projects/${project.slug}`}>
                  <button className="flex items-center gap-4 text-luxury-caption text-white transition-colors relative group/btn">
                    <span className="tracking-widest uppercase transition-colors duration-300 group-hover/btn:text-luxury-gold">Explore Project</span>
                    <span className="relative flex items-center justify-center">
                      <motion.span 
                        className="w-8 h-[1px] bg-luxury-gold/50"
                        animate={{ width: isHovered ? 64 : 32, backgroundColor: isHovered ? '#D4AF37' : 'rgba(212,175,55,0.5)' }}
                        transition={{ duration: 0.5, type: "spring" }}
                      />
                    </span>
                  </button>
                </Link>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-luxury-gold/30 z-10"></div>
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-luxury-gold/30 z-10"></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
