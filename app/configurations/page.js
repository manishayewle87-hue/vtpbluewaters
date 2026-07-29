import Link from 'next/link';

export const metadata = {
  title: 'Luxury Property Configurations in Pune | VTP Blue Waters',
  description: 'Explore premium luxury real estate by configuration: 2 BHK, 3 BHK, 4 BHK, Duplex, and Villas in Pune.',
  alternates: { canonical: 'https://vtpbluewaters.com/configurations' },
};

const CONFIGURATIONS = [
  { id: '2-bhk', name: '2 BHK Luxury Apartments', description: 'Perfect for young professionals and small families seeking premium lifestyle amenities.', icon: '🏢' },
  { id: '3-bhk', name: '3 BHK Premium Residences', description: 'Spacious layouts designed with the Maximum Livable Area philosophy for growing families.', icon: '🏢' },
  { id: '4-bhk', name: '4 BHK Mansions', description: 'Ultra-luxury expansive homes offering unparalleled panoramic views and exclusivity.', icon: '👑' },
  { id: 'duplex', name: 'Luxury Duplexes', description: 'Double-height ceilings and private terraces for the ultimate luxury living experience.', icon: '✨' },
  { id: 'villas', name: 'Premium Villas', description: 'Exclusive independent living within a secure, world-class township ecosystem.', icon: '🏡' },
];

export default function ConfigurationsIndexPage() {
  return (
    <div className="min-h-screen bg-[#050914] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-white mb-6">
            Property <span className="text-luxury-gold font-normal">Configurations</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-inter">
            Find your perfect home tailored to your space requirements and lifestyle aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIGURATIONS.map((config) => (
            <Link 
              key={config.id} 
              href={`/configurations/${config.id}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="text-4xl mb-6">{config.icon}</div>
              <h2 className="text-2xl font-outfit text-white group-hover:text-luxury-gold transition-colors mb-4">{config.name}</h2>
              <p className="text-gray-400 text-sm flex-grow leading-relaxed">
                {config.description}
              </p>
              <div className="mt-8 text-luxury-gold text-xs tracking-widest uppercase font-bold group-hover:translate-x-2 transition-transform">
                Explore Projects →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
