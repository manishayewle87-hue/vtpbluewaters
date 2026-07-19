'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Next.js Global Layout Root Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-luxury-navy text-white min-h-screen flex items-center justify-center font-sans antialiased">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10 px-6 max-w-lg">
          <span className="text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Critical System Recovery</span>
          <h1 className="text-4xl font-display font-light text-white mb-6">
            Global Layout <span className="text-luxury-gold italic">Reset</span>
          </h1>
          <p className="text-gray-400 font-light text-base leading-relaxed mb-10">
            A critical error occurred in the website's root shell. We have isolated the event to protect the interface.
          </p>
          
          <button
            onClick={() => reset()}
            className="bg-luxury-gold hover:bg-white text-luxury-navy px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          >
            Reinitialize Platform
          </button>
        </div>
      </body>
    </html>
  );
}
