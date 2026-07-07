'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import projectsData from '@/app/data/projects.json';

import MagneticButton from './MagneticButton';
import Logo from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'locations' | 'portfolio' | null
  const pathname = usePathname();

  const isIntentLandingPage = pathname?.includes('/locations/') && pathname?.split('/').length > 4;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleInterceptClick = (e, link) => {
    if (link.targetId && pathname === '/') {
      e.preventDefault();
      const target = document.getElementById(link.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  const megaMenuData = {
    locations: [
      { name: 'Mahalunge', href: '/locations/mahalunge' },
      { name: 'Kharadi', href: '/locations/kharadi' },
      { name: 'Hinjawadi', href: '/locations/hinjawadi' },
      { name: 'Baner', href: '/locations/baner-sus' },
    ],
    portfolio: projectsData.map(p => ({
      name: p.name,
      href: `/projects/${p.slug}`
    }))
  };

  const navLinks = [
    { label: 'Township', href: '/township', type: 'link', targetId: null },
    { label: 'Overview', href: '/explore/vtp-bluewaters-mahalunge-pune-overview', type: 'link', targetId: 'overview' },
    { label: 'Portfolio', type: 'dropdown', id: 'portfolio', targetId: 'residences', href: '/explore/vtp-bluewaters-mahalunge-pune-luxury-residences' },
    { label: 'Amenities', href: '/explore/vtp-bluewaters-mahalunge-pune-premium-amenities', type: 'link', targetId: 'amenities' },
    { label: 'Locations', type: 'dropdown', id: 'locations', targetId: 'location', href: '/explore/vtp-bluewaters-mahalunge-pune-location' },
    { label: 'Insights', href: '/insights', type: 'link', targetId: null }
  ];

  if (isIntentLandingPage) {
    return (
      <header className="absolute top-0 w-full z-50 py-5 lg:py-10 flex justify-center bg-luxury-navy/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" title="VTP Bluewaters Home">
          <Logo className="w-32 md:w-48 h-auto" />
        </Link>
      </header>
    );
  }

  return (
    <>
    <header>
      <motion.nav 
        aria-label="Main Navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-luxury-navy/80 backdrop-blur-xl border-b border-white/5 py-5' : 'bg-transparent py-5 lg:py-10'}`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative">
          <Link href="/" title="VTP Bluewaters Home" className="flex items-center flex-shrink-0 z-50 relative">
            <Logo className="w-36 md:w-52 lg:w-80 h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center text-[12px] font-medium tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative h-full py-4"
                onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
              >
                {link.type === 'link' ? (
                  <Link 
                    href={link.href} 
                    className="hover:text-luxury-gold transition-colors duration-300"
                    onClick={(e) => handleInterceptClick(e, link)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link 
                    href={link.href}
                    onClick={(e) => handleInterceptClick(e, link)}
                    className="flex items-center gap-1 hover:text-luxury-gold transition-colors duration-300 uppercase tracking-[0.2em]"
                  >
                    {link.label} <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180 text-luxury-gold' : ''}`} />
                  </Link>
                )}

                {/* Desktop Dropdown Panel */}
                <AnimatePresence>
                  {link.type === 'dropdown' && activeDropdown === link.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-gold/20 rounded-xl overflow-hidden shadow-2xl py-4"
                    >
                      <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {megaMenuData[link.id].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="px-6 py-3 text-luxury-silver hover:text-luxury-gold hover:bg-white/5 transition-all duration-300 text-xs tracking-[0.1em]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            <MagneticButton>
              <button className="relative overflow-hidden group bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold px-8 py-3 rounded-full hover:border-luxury-gold hover:text-luxury-navy transition-all duration-500 enquiry-trigger">
                <span className="relative z-10 font-bold tracking-[0.2em]">ENQUIRE NOW</span>
                <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden z-50 relative p-2 text-luxury-gold hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-luxury-navy/95 flex flex-col pt-32 px-8 overflow-y-auto pb-10"
          >
            <div className="flex flex-col gap-8 max-w-sm mx-auto w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                >
                  {link.type === 'link' ? (
                    <Link 
                      href={link.href} 
                      onClick={(e) => handleInterceptClick(e, link)}
                      className="text-2xl font-display font-light text-white hover:text-luxury-gold transition-colors block border-b border-white/10 pb-4"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <div className="border-b border-white/10 pb-4">
                      <Link 
                        href={link.href}
                        onClick={(e) => handleInterceptClick(e, link)}
                        className="text-2xl font-display font-light text-luxury-gold mb-4 block hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                      <div className="flex flex-col gap-3 pl-4 border-l border-luxury-gold/30">
                        {megaMenuData[link.id].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-luxury-silver text-sm tracking-widest hover:text-white transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 text-center"
              >
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-luxury-gold text-luxury-navy px-12 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs hover:bg-white transition-colors duration-300 w-full enquiry-trigger"
                >
                  ENQUIRE NOW
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
