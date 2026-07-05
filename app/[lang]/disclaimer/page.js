import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export const metadata = {
  title: 'Disclaimer | VTP Bluewaters',
  description: 'Disclaimer for VTP Bluewaters.'};

export default function DisclaimerPage() {
  const lang = 'en';
    return (
    <div className="min-h-screen bg-luxury-navy pt-24 lg:pt-32 pb-12 lg:pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/en" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-display font-light text-luxury-white mb-12 leading-tight border-b border-white/10 pb-8">
          Website <span className="italic text-luxury-silver">Disclaimer</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:text-luxury-white prose-p:text-luxury-silver prose-p:font-light">
          <p>
            The information contained in this website is for general information purposes only. The information is provided by VTP Bluewaters and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          <h2>MahaRERA Registration</h2>
          <p>
            The project has been registered via MahaRERA registration number and is available on the website https://maharera.mahaonline.gov.in under registered projects.
          </p>
          <h2>Images and Representation</h2>
          <p>
            Any reliance you place on such information is therefore strictly at your own risk. The images shown are artist's impressions and are for representation purposes only. The actual layout, design, and amenities may vary.
          </p>
          <p className="mt-12 text-sm text-luxury-silver/60">
            Note: This is a placeholder policy for demonstration purposes. Please update with your official legal Disclaimer.
          </p>
        </div>
      </div>
    </div>
  );
}


export function generateStaticParams() {
  return [{ lang: 'en' }];
}
