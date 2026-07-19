'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to your monitoring system
    console.error('Next.js Page-Level Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-luxury-navy flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Branded decorative bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      
      <div className="text-center relative z-10 max-w-lg">
        <span className="text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Security & System Alert</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-6">
          System <span className="text-luxury-gold italic">Recovered</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed mb-10">
          The application encountered a transient runtime exception. To guarantee data and security integrity, the session has been isolated.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-luxury-gold hover:bg-white text-luxury-navy px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            Reload Session
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-white/10 hover:border-luxury-gold text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
