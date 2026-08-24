'use client';
import React, { useState } from 'react';

const HUBS = [
  {
    name: 'Hinjewadi IT Park (Phase 1)',
    landmark: 'Infosys, Wipro, TCS, Cognizant Hub',
    distBlueWaters: '3.2 KM (5-7 Mins)',
    distPegasus: '24 KM (40 Mins)',
    metroBlueWaters: 'Direct Line 3 Station (2 Mins)',
    icon: '💻'
  },
  {
    name: 'Upcoming Metro Line 3 Station',
    landmark: 'Hinjewadi - Shivajinagar Metro Corridor',
    distBlueWaters: '800 Meters (2 Mins)',
    distPegasus: 'Kharadi Metro Station (1.2 KM)',
    metroBlueWaters: 'Direct Access',
    icon: '🚇'
  },
  {
    name: 'EON Free Zone & WTC Kharadi',
    landmark: 'Barclays, UBS, Credit Suisse, Zensar Hub',
    distBlueWaters: '25 KM (45 Mins)',
    distPegasus: '1.8 KM (4-6 Mins)',
    metroBlueWaters: 'Via Outer Ring Road',
    icon: '🏢'
  },
  {
    name: 'Balewadi High Street & Baner',
    landmark: 'Fine Dining, Retail Boulevards & Commercial Hub',
    distBlueWaters: '4.5 KM (8-10 Mins)',
    distPegasus: '20 KM (35 Mins)',
    metroBlueWaters: 'Direct via Baner-Mahalunge Road',
    icon: '🍸'
  },
  {
    name: 'Pune International Airport (Lohegaon)',
    landmark: 'Domestic & International Flights Terminal',
    distBlueWaters: '22 KM (35-45 Mins)',
    distPegasus: '9.5 KM (15-20 Mins)',
    metroBlueWaters: 'Via Airport Road / Metro Phase 2',
    icon: '✈️'
  },
  {
    name: 'Mumbai-Pune Expressway Toll Plaza',
    landmark: 'Gahunje / Somatane Toll Naka',
    distBlueWaters: '12 KM (12-15 Mins)',
    distPegasus: '32 KM (50 Mins)',
    metroBlueWaters: 'Expressway Direct Arterial Link',
    icon: '🛣️'
  }
];

export default function CommuteMatrix() {
  const [selectedTownship, setSelectedTownship] = useState('bluewaters');

  return (
    <div className="w-full bg-[#070D1E] border border-luxury-gold/20 rounded-2xl p-6 md:p-10 text-white shadow-2xl backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Micro-Market Connectivity</span>
        <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">Live Commute & Transit Matrix</h2>
        <p className="text-sm text-luxury-silver/80 mt-2">
          Real-time distance and estimated travel times from VTP Townships to major Pune IT hubs, Metro stations, and transit corridors.
        </p>

        {/* Township Switcher */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl mt-6">
          <button
            type="button"
            onClick={() => setSelectedTownship('bluewaters')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedTownship === 'bluewaters'
                ? 'bg-luxury-gold text-luxury-navy font-bold shadow-md'
                : 'text-luxury-silver hover:text-white'
            }`}
          >
            Township Blue Waters (Mahalunge/Hinjewadi)
          </button>
          <button
            type="button"
            onClick={() => setSelectedTownship('pegasus')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedTownship === 'pegasus'
                ? 'bg-luxury-gold text-luxury-navy font-bold shadow-md'
                : 'text-luxury-silver hover:text-white'
            }`}
          >
            Township Pegasus (Kharadi EON)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HUBS.map((hub, i) => (
          <div
            key={i}
            className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 hover:border-luxury-gold/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl mb-3">{hub.icon}</div>
              <h3 className="text-lg font-heading text-white font-semibold">{hub.name}</h3>
              <p className="text-xs text-luxury-silver/70 mt-1">{hub.landmark}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40">Drive Time:</span>
                <span className="text-luxury-gold font-bold">
                  {selectedTownship === 'bluewaters' ? hub.distBlueWaters : hub.distPegasus}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40">Metro / Rapid Link:</span>
                <span className="text-white font-medium">
                  {hub.metroBlueWaters}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
