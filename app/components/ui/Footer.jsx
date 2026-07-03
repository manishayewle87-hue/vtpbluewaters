'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import contentData from '@/app/data/content-hub.json';

const quickLinks = [
  { label: 'Residences', href: '/en/explore/vtp-bluewaters-mahalunge-pune-luxury-residences', targetId: 'residences' },
  { label: 'Amenities', href: '/en/explore/vtp-bluewaters-mahalunge-pune-premium-amenities', targetId: 'amenities' },
  { label: 'About VTP Realty', href: 'https://vtprealty.in/about-vtp-realty', targetId: null },
  { label: 'Contact Us', href: 'https://vtprealty.in/contact-us', targetId: null },
];

const townships = [
  { label: 'BLUEWATERS — Mahalunge', href: '/' },
  { label: 'Pegasus — Kharadi', href: 'https://vtprealty.in/township/township-codename-pegasus-kharadi-pune' },
  { label: 'Skylights — Baner Sus', href: 'https://vtprealty.in/township/township-codename-skylights-baner-sus-road-pune' },
];

export default function Footer() {
  const pathname = usePathname();
  const isIntentLandingPage = pathname?.includes('/locations/') && pathname?.split('/').length > 4;

  if (isIntentLandingPage) return null;

  const handleInterceptClick = (e, link) => {
    if (link.targetId && pathname === '/en') {
      e.preventDefault();
      const target = document.getElementById(link.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer aria-label="Site Footer" className="bg-[#050914] border-t border-white/5">
      {/* Main Footer */}
      <div className="container mx-auto px-6 max-w-7xl pt-10 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 lg:gap-12">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Logo className="w-48 mb-8 opacity-80" />
            <p className="text-sm text-luxury-silver font-light leading-relaxed mb-8">
              200+ acres of meticulously crafted luxury living where architectural elegance meets the serene landscape of West Pune.
            </p>
            <div className="luxury-divider"></div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-luxury-label text-luxury-gold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleInterceptClick(e, link)}
                    className="text-sm text-luxury-silver hover:text-luxury-white transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Townships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-luxury-label text-luxury-gold mb-8">Townships</h4>
            <ul className="space-y-4">
              {townships.map((township) => (
                <li key={township.label}>
                  <Link 
                    href={township.href}
                    className="text-sm text-luxury-silver hover:text-luxury-white transition-colors font-light"
                  >
                    {township.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-luxury-label text-luxury-gold mb-8">Contact</h4>
            <div className="space-y-6">
              <div>
                <p className="text-luxury-caption text-luxury-silver mb-2">Sales Enquiry</p>
                <a href="tel:+912067770000" className="text-lg font-display font-light text-luxury-white hover:text-luxury-gold transition-colors">
                  +91 20 6777 0000
                </a>
              </div>
              <div>
                <p className="text-luxury-caption text-luxury-silver mb-2">Email</p>
                <a href="mailto:sales@vtprealty.in" className="text-sm text-luxury-white hover:text-luxury-gold transition-colors font-light">
                  sales@vtprealty.in
                </a>
              </div>
              <div>
                <p className="text-luxury-caption text-luxury-silver mb-2">Corporate Office</p>
                <p className="text-sm text-luxury-silver font-light leading-relaxed">
                  VTP Realty, 9th Floor, Cerebrum IT Park, Kalyani Nagar, Pune 411006
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SEO Mega-Footer Section (Blends Seamlessly into UI) */}
      <div className="border-t border-white/5 bg-[#030610]">
        <div className="container mx-auto px-6 max-w-7xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Blogs & Articles Hub */}
            <div className="col-span-1">
              <h5 className="text-luxury-caption text-white/40 mb-6 border-b border-white/5 pb-4">Knowledge & Articles</h5>
              <ul className="space-y-3">
                {contentData.blogs.map((blog, i) => (
                  <li key={i}>
                    <Link href={`/en/blog/${blog.slug}`} className="text-xs text-white/30 hover:text-luxury-gold transition-colors leading-relaxed line-clamp-1">
                      {blog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Artifacts Hub */}
            <div className="col-span-1">
              <h5 className="text-luxury-caption text-white/40 mb-6 border-b border-white/5 pb-4">Mahalunge & Baner Annex</h5>
              <ul className="space-y-3">
                {contentData.locations.map((loc, i) => (
                  <li key={i}>
                    <Link href={`/en/locations/${loc.slug}`} className="text-xs text-white/30 hover:text-luxury-gold transition-colors leading-relaxed line-clamp-1">
                      {loc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs Hub */}
            <div className="col-span-1">
              <h5 className="text-luxury-caption text-white/40 mb-6 border-b border-white/5 pb-4">Frequently Asked Questions</h5>
              <ul className="space-y-3">
                {contentData.faqs.slice(0, 5).map((faq, i) => (
                  <li key={i}>
                    <Link href="/en/faq" className="text-xs text-white/30 hover:text-luxury-gold transition-colors leading-relaxed line-clamp-1">
                      {faq.question}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/en/faq" className="text-xs text-luxury-gold hover:text-luxury-white transition-colors flex items-center gap-1 mt-2">
                    View All FAQs →
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 pb-12 lg:pb-24 lg:pb-0">
        <div className="container mx-auto px-6 max-w-7xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-luxury-caption text-white/30 text-center md:text-left">
              © {new Date().getFullYear()} VTP Realty. All Rights Reserved. | BLUEWATERS Township, Mahalunge, Pune.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link href="/en/privacy-policy" className="text-luxury-caption text-white/30 hover:text-luxury-silver transition-colors">Privacy Policy</Link>
              <Link href="/en/terms-of-use" className="text-luxury-caption text-white/30 hover:text-luxury-silver transition-colors">Terms of Use</Link>
              <Link href="/en/disclaimer" className="text-luxury-caption text-white/30 hover:text-luxury-silver transition-colors">Disclaimer</Link>
            </div>
          </div>
          <p className="text-[8px] tracking-widest text-white/20 uppercase mt-6 text-center leading-relaxed max-w-4xl mx-auto">
            The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images shown are for representational purposes only. This is not the official site of VTP Realty and is intended for informational and promotional purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
