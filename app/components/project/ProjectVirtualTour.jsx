'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Pannellum to avoid SSR window errors
const Pannellum = dynamic(
  () => import('pannellum-react').then(mod => mod.Pannellum),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-luxury-charcoal flex items-center justify-center border border-white/5">
        <div className="text-luxury-silver font-display animate-pulse text-lg">Initializing Virtual Experience...</div>
      </div>
    )
  }
);

export default function ProjectVirtualTour({ tourImage, projectName }) {
  // Fallback high-res 360 image if none provided
  const imageSrc = tourImage || 'https://pannellum.org/images/alma.jpg'; 

  return (
    <section className="py-12 lg:py-24 bg-[#050914] border-t border-luxury-gold/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-luxury-label text-luxury-gold mb-4">Immersive Experience</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light mb-6">
            Virtual <span className="italic text-luxury-silver">Tour</span>
          </h2>
          <p className="text-luxury-silver max-w-2xl mx-auto font-light leading-relaxed">
            Step inside {projectName || 'VTP Blue Waters'} and experience the unparalleled luxury of our sample residences in 360 degrees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.05)]"
        >
          <Pannellum
            width="100%"
            height="100%"
            image={imageSrc}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            showZoomCtrl={true}
            showFullscreenCtrl={true}
            onLoad={() => {
                console.log("360 panorama loaded");
            }}
          >
          </Pannellum>
          
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
            <svg className="w-5 h-5 text-luxury-gold animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-xs text-white uppercase tracking-wider">Drag to Explore 360°</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
