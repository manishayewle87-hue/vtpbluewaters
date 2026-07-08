import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#050914] relative overflow-hidden px-4">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl text-center glass-frost p-12 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
        <h1 className="text-8xl md:text-9xl font-display font-light text-luxury-gold/20 mb-4 select-none">404</h1>
        
        <div className="inline-block px-4 py-1 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-luxury-gold/5">
          Page Not Found
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-light text-white mb-6">
          Uncharted <span className="italic text-luxury-silver">Territory</span>
        </h2>
        
        <p className="text-luxury-silver font-light text-lg mb-10 max-w-lg mx-auto">
          The exclusive page you are looking for has been moved or no longer exists. 
          Let us guide you back to our curated luxury portfolio.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/explore"
            className="w-full sm:w-auto bg-luxury-gold text-luxury-navy px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            Explore Directory
          </Link>
          <Link 
            href="/"
            className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-sm hover:bg-white/10 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
