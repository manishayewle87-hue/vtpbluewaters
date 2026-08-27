'use client';
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Building, ArrowRight, ShieldCheck, Phone, CheckCircle } from 'lucide-react';

export default function SearchClient({ projects = [] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = searchTerm.toLowerCase().trim();
      const name = (project.name || '').toLowerCase();
      const loc = (project.location || '').toLowerCase();
      const township = (project.township || '').toLowerCase();
      const overview = (project.overview || '').toLowerCase();
      const bhks = Array.isArray(project.floorPlans) 
        ? project.floorPlans.map(f => (f.type || '').toLowerCase()).join(' ')
        : '';
      const reras = Array.isArray(project.maharera) ? project.maharera.join(' ').toLowerCase() : '';

      const matchesQuery = !q || 
        name.includes(q) || 
        loc.includes(q) || 
        township.includes(q) || 
        overview.includes(q) || 
        bhks.includes(q) ||
        reras.includes(q);

      const matchesZone = selectedZone === 'All' || 
        (selectedZone === 'West' && (loc.includes('mahalunge') || loc.includes('hinjawadi') || loc.includes('baner') || loc.includes('sus') || loc.includes('bavdhan') || loc.includes('wakad'))) ||
        (selectedZone === 'East' && (loc.includes('kharadi') || loc.includes('viman') || loc.includes('hadapsar') || loc.includes('wagholi') || loc.includes('keshavnagar'))) ||
        (selectedZone === 'South' && (loc.includes('nibm') || loc.includes('undri') || loc.includes('kondhwa') || loc.includes('pisoli')));

      const matchesBhk = selectedBhk === 'All' || bhks.includes(selectedBhk.toLowerCase());

      return matchesQuery && matchesZone && matchesBhk;
    });
  }, [projects, searchTerm, selectedZone, selectedBhk]);

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-5 h-5 text-luxury-gold pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project name, location (Mahalunge, Kharadi, Baner), BHK, or MahaRERA..."
            className="w-full pl-14 pr-12 py-4 rounded-full bg-white/5 border border-white/15 focus:border-luxury-gold focus:bg-white/10 text-white placeholder-white/40 text-sm md:text-base outline-none transition-all shadow-xl backdrop-blur-md"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-5 text-xs text-white/50 hover:text-white uppercase tracking-wider px-2 py-1 bg-white/10 rounded-full"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <span className="text-white/40 px-2">Zone:</span>
          {['All', 'West', 'East', 'South'].map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedZone === zone ? 'bg-luxury-gold text-luxury-navy font-bold shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <span className="text-white/40 px-2">BHK:</span>
          {['All', '1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa'].map((bhk) => (
            <button
              key={bhk}
              onClick={() => setSelectedBhk(bhk)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedBhk === bhk ? 'bg-luxury-gold text-luxury-navy font-bold shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <span className="text-sm text-luxury-silver">
          Showing <strong className="text-luxury-gold">{filteredProjects.length}</strong> verified properties
          {searchTerm && <span> for &ldquo;<span className="text-white">{searchTerm}</span>&rdquo;</span>}
        </span>
        <a
          href="tel:+917744009295"
          className="inline-flex items-center gap-2 text-xs text-luxury-gold hover:underline"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>VIP Priority Line: +91 7744009295</span>
        </a>
      </div>

      {/* Results Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-2xl p-8">
          <Building className="w-12 h-12 text-luxury-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No exact property match found</h3>
          <p className="text-sm text-luxury-silver max-w-md mx-auto mb-6">
            Try searching for broader terms like &ldquo;Mahalunge&rdquo;, &ldquo;Kharadi&rdquo;, &ldquo;3 BHK&rdquo;, or &ldquo;Township&rdquo;.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedZone('All'); setSelectedBhk('All'); }}
            className="px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-navy font-bold text-xs uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const bhkList = Array.isArray(project.floorPlans) 
              ? project.floorPlans.filter(f => f.type && f.type.toLowerCase() !== 'configuration').map(f => f.type).slice(0, 3)
              : ['2 BHK', '3 BHK'];
            
            const reraNo = Array.isArray(project.maharera) && project.maharera.length > 0
              ? project.maharera[0]
              : 'Registered under MahaRERA';

            return (
              <div
                key={project.slug}
                className="group relative bg-[#0C1425] border border-white/10 hover:border-luxury-gold/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-luxury-gold/5"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-black/40">
                    <Image
                      src={project.image || '/assets/projects/earth-1/hero.jpg'}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1425] via-transparent to-black/30" />
                    
                    {/* Township Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-luxury-gold font-semibold">
                      {project.township || 'VTP Luxury'}
                    </div>

                    {/* Possession Badge */}
                    <div className="absolute top-3 right-3 bg-luxury-gold/90 text-luxury-navy px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {project.possession || '2026/2027'}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-luxury-silver/80 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span className="truncate">{project.location || 'Pune, Maharashtra'}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-luxury-gold transition-colors mb-2">
                      {project.name}
                    </h3>

                    <p className="text-xs text-luxury-silver line-clamp-2 mb-4 leading-relaxed">
                      {project.overview || project.seoDescription || 'Ultra-luxury residences with Maximum Livable Area architecture.'}
                    </p>

                    {/* BHK Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {bhkList.map((bhk, i) => (
                        <span key={i} className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/90">
                          {bhk}
                        </span>
                      ))}
                    </div>

                    {/* MahaRERA */}
                    <div className="flex items-center gap-1 text-[10px] text-white/50 mb-3 truncate">
                      <ShieldCheck className="w-3 h-3 text-green-400 shrink-0" />
                      <span>RERA: {reraNo}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 block">Starting From</span>
                    <span className="text-base font-bold text-luxury-gold">{project.priceStarting || '₹70 Lakhs*'}</span>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-luxury-gold text-luxury-navy text-xs font-bold hover:bg-white transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
