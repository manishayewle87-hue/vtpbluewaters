import dynamic from 'next/dynamic';

// CRITICAL: The 3D Canvas uses WebGL (Three.js) which is browser-only.
// Disabling SSR prevents Cloudflare's Node.js build from crashing while
// pre-rendering this page, which was causing the 404 error.
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

export const metadata = {
  title: 'Interactive 3D Township Map | VTP Blue Waters',
  description: 'Explore VTP Blue Waters 200+ acre township in an immersive interactive 3D experience. Rotate, zoom, and discover every premium cluster.',
  robots: { index: true, follow: true },
};

export default function Township3DPage() {
  return <Township3DCanvas />;
}
