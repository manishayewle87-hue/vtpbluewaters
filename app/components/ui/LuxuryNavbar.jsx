'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import MagneticButton from './MagneticButton';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

export default function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isIntentLandingPage = pathname?.includes('/locations/') && pathname?.split('/').length > 4;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Township', href: '/township', targetId: null },
    { label: 'Overview', href: '/explore/vtp-bluewaters-mahalunge-pune-overview', targetId: 'overview' },
    { label: 'Residences', href: '/explore/vtp-bluewaters-mahalunge-pune-luxury-residences', targetId: 'residences' },
    { label: 'Amenities', href: '/explore/vtp-bluewaters-mahalunge-pune-premium-amenities', targetId: 'amenities' },
    { label: 'Location', href: '/explore/vtp-bluewaters-mahalunge-pune-location', targetId: 'location' }
  ];

  const handleInterceptClick = (e, link) => {
    if (link.targetId && pathname === '/en') {
      e.preventDefault();
      const target = document.getElementById(link.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

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
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link href="/" title="VTP Bluewaters Home" className="flex items-center flex-shrink-0 z-50 relative">
            <Logo className="w-36 md:w-52 lg:w-80 h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12 items-center text-[13px] font-medium tracking-[0.25em] uppercase">
            {navLinks.map((link) => (
               <Link 
                 key={link.label} 
                 href={link.href} 
                 title={`Navigate to ${link.label}`} 
                 className="hover:text-luxury-gold transition-colors duration-300"
                 onClick={(e) => handleInterceptClick(e, link)}
               >
                 {link.label}
               </Link>
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
            className="fixed inset-0 z-40 bg-luxury-navy/95 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    title={`Navigate to ${link.label}`}
                    onClick={(e) => {
                      if (link.targetId && pathname === '/en') {
                        handleInterceptClick(e, link);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="text-3xl font-display font-light text-luxury-silver hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <Link 
                  href="/explore/vtp-bluewaters-mahalunge-pune-enquiry"
                  onClick={(e) => {
                    if (pathname === '/') {
                      handleInterceptClick(e, { targetId: 'enquiry' });
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="bg-luxury-gold text-luxury-navy px-12 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] enquiry-trigger"
                >
                  ENQUIRE NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
