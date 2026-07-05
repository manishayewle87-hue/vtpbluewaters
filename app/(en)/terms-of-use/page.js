import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | VTP Bluewaters',
  description: 'Terms of Use for VTP Bluewaters.'};

export default function TermsOfUsePage() {
  const lang = 'en';
    return (
    <div className="min-h-screen bg-luxury-navy pt-24 lg:pt-32 pb-12 lg:pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-display font-light text-luxury-white mb-12 leading-tight border-b border-white/10 pb-8">
          Terms of <span className="italic text-luxury-silver">Use</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:text-luxury-white prose-p:text-luxury-silver prose-p:font-light">
          <p>
            Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice.
          </p>
          <h2>2. Intellectual Property</h2>
          <p>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice.
          </p>
          <h2>3. Limitation of Liability</h2>
          <p>
            Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
          </p>
          <p className="mt-12 text-sm text-luxury-silver/60">
            Note: This is a placeholder policy for demonstration purposes. Please update with your official legal Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}
