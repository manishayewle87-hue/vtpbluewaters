import Link from 'next/link';
import { PUNE_MICRO_MARKETS } from '@/app/services/locationEngine';

export const metadata = {
  title: 'Luxury Property Locations in Pune | VTP Blue Waters',
  description: 'Explore premium luxury apartments and real estate properties across prime locations in Pune including Mahalunge, Baner, Hinjawadi, and Wakad.',
  alternates: { canonical: 'https://vtpbluewaters.com/locations' },
};

export default function LocationsIndexPage() {
  return (
    <div className="min-h-screen bg-[#050914] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-white mb-6">
            Prime <span className="text-luxury-gold font-normal">Locations</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-inter">
            Discover the most sought-after micro-markets for luxury real estate investment in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PUNE_MICRO_MARKETS.map((loc) => (
            <Link 
              key={loc.slug} 
              href={`/locations/${loc.slug}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 group"
            >
              <h2 className="text-xl font-outfit text-white group-hover:text-luxury-gold transition-colors mb-2">{loc.name}</h2>
              <div className="text-sm text-luxury-gold/70 mb-4">{loc.tier}</div>
              <p className="text-gray-400 text-sm line-clamp-3">
                {loc.description || `Explore premium luxury properties in ${loc.name}, offering unparalleled connectivity and lifestyle amenities.`}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
