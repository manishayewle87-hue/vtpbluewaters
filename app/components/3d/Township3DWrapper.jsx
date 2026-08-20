'use client';

import dynamic from 'next/dynamic';

const Township3DCanvas = dynamic(() => import('@/app/components/3d/Township3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#050914] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-1 bg-luxury-gold mx-auto mb-4 animate-pulse" />
        <p className="text-luxury-silver text-sm tracking-widest uppercase">Loading Luxury Experience</p>
      </div>
    </div>
  ),
});

export default function Township3DWrapper() {
  return <Township3DCanvas />;
}
