'use client';
import { Phone, Mail } from 'lucide-react';

export default function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-luxury-navy/90 backdrop-blur-md border-t border-luxury-gold/20 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex h-16">
        <a 
          href="tel:+918888888888" 
          className="flex-1 flex flex-col items-center justify-center text-luxury-silver hover:bg-white/5 transition-colors border-r border-white/10"
        >
          <Phone size={20} strokeWidth={1.5} className="mb-1" />
          <span className="text-[9px] tracking-widest uppercase">Call Us</span>
        </a>
        <a 
          href="#enquiry" 
          className="flex-1 flex flex-col items-center justify-center text-luxury-silver hover:bg-white/5 transition-colors enquiry-trigger"
        >
          <Mail size={20} strokeWidth={1.5} className="mb-1" />
          <span className="text-[9px] tracking-widest uppercase">Enquire</span>
        </a>
        <a 
          href="#enquiry" 
          className="flex-[1.5] bg-luxury-gold flex flex-col items-center justify-center text-luxury-navy hover:bg-white transition-colors enquiry-trigger"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Register</span>
        </a>
      </div>
    </div>
  );
}
