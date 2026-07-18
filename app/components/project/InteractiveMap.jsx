'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import to prevent SSR issues with leaflet window object
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function InteractiveMap({ locationName }) {
  // We'll use a default center for Pune/Mahalunge area if precise coordinates aren't provided
  // 18.5724° N, 73.7431° E (Mahalunge roughly)
  const center = [18.5724, 73.7431];

  useEffect(() => {
    // Fix leaflet marker icon issue in Next.js
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%', background: '#0a0f1d' }}
      >
        {/* Dark theme luxury map tiles (CartoDB Dark Matter) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={center}>
          <Popup>
            <div className="text-luxury-navy font-display font-medium">
              VTP Blue Waters<br />{locationName}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
