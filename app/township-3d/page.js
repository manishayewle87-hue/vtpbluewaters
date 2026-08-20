import Township3DWrapper from '@/app/components/3d/Township3DWrapper';

export const metadata = {
  title: 'Interactive 3D Township Map | VTP Blue Waters',
  description: 'Explore VTP Blue Waters 200+ acre township in an immersive interactive 3D experience. Rotate, zoom, and discover every premium cluster.',
  robots: { index: true, follow: true },
};

export default function Township3DPage() {
  return <Township3DWrapper />;
}
