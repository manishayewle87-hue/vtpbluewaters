'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TownshipOverview() {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const imagesGroupRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !textGroupRef.current || !imagesGroupRef.current) return;

    // Only enable the pinned scroll experience on desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Pin the entire section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%', // Pin for 2 viewport heights
      pin: true,
      anticipatePin: 1
    });

    const texts = textGroupRef.current.children;
    const images = imagesGroupRef.current.children;

    // Timeline for scrubbing through the content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1 // smooth scrubbing
      }
    });

    // We have 3 "slides" of content
    // Slide 1 is visible initially
    
    // Transition to Slide 2
    tl.to(texts[0], { opacity: 0, y: -20, duration: 1 }, 0)
      .to(images[0], { opacity: 0, scale: 0.95, duration: 1 }, 0)
      .fromTo(texts[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.5)
      .fromTo(images[1], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, 0.5);

    // Transition to Slide 3
    tl.to(texts[1], { opacity: 0, y: -20, duration: 1 }, 2)
      .to(images[1], { opacity: 0, scale: 0.95, duration: 1 }, 2)
      .fromTo(texts[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 2.5)
      .fromTo(images[2], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, 2.5);

    // Refresh scroll calculations after a short delay to account for layout shifts/image loads
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="overview" ref={sectionRef} className="py-20 lg:h-screen bg-luxury-charcoal relative overflow-hidden border-t border-luxury-gold/10 flex items-center">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Storytelling Text — mobile shows only Slide 1 statically */}
          <div className="relative lg:h-[400px] flex items-center" ref={textGroupRef}>
            
            {/* Slide 1 — always visible on mobile, animated on desktop */}
            <div className="lg:absolute w-full">
              <div className="text-luxury-label text-luxury-gold mb-4">The Masterplan</div>
              <h2 className="text-display-sm lg:text-display-md font-display font-light mb-6 leading-tight">
                A City Within <br />
                <span className="italic text-luxury-silver">A City</span>
              </h2>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed max-w-lg">
                Spanning over 200 acres, VTP BLUEWATERS is Pune&apos;s most ambitious township. A meticulously planned ecosystem that integrates residential luxury, commercial hubs, and nature.
              </p>
            </div>

            {/* Slide 2 — desktop GSAP only */}
            <div className="lg:absolute w-full opacity-0 pointer-events-none hidden lg:block">
              <div className="text-luxury-label text-luxury-gold mb-6">Nature&apos;s Canvas</div>
              <h2 className="text-display-sm lg:text-display-md font-display font-light mb-8 leading-tight">
                Embraced By <br />
                <span className="italic text-[#36C5CD]">The River</span>
              </h2>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed max-w-lg">
                Bordered by the serene Mula-Mutha river and lush hills, the township offers an unprecedented 50% open space. Breathe the purest air while enjoying panoramic natural vistas.
              </p>
            </div>

            {/* Slide 3 — desktop GSAP only */}
            <div className="lg:absolute w-full opacity-0 pointer-events-none hidden lg:block">
              <div className="text-luxury-label text-luxury-gold mb-6">Unrivaled Connectivity</div>
              <h2 className="text-display-sm lg:text-display-md font-display font-light mb-8 leading-tight">
                The Heart Of <br />
                <span className="italic text-luxury-silver">New Pune</span>
              </h2>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed max-w-lg">
                Strategically located in Mahalunge, connecting Hinjawadi Phase 1 with Baner. You are minutes away from global IT parks, premium schools, and the upcoming Metro.
              </p>
            </div>

          </div>

          {/* Right Column: Imagery */}
          <div className="relative h-[56vw] max-h-[340px] lg:h-[70vh] lg:max-h-none w-full" ref={imagesGroupRef}>
            {/* Slide 1 Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/images/township_ecosystem.jpg" 
                alt="Masterplan"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-sm opacity-80"
              />
              <div className="absolute inset-0 bg-luxury-navy/20 mix-blend-multiply"></div>
            </div>

            {/* Slide 2 Image */}
            <div className="absolute inset-0 w-full h-full opacity-0">
              <Image 
                src="/images/township_central_garden.jpg" 
                alt="River View"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-sm opacity-80"
              />
              <div className="absolute inset-0 bg-[#36C5CD]/10 mix-blend-overlay"></div>
            </div>

            {/* Slide 3 Image */}
            <div className="absolute inset-0 w-full h-full opacity-0">
              <Image 
                src="/images/township_hero_bg.jpg" 
                alt="Connectivity"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-sm opacity-80"
              />
              <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
