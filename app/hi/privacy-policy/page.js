import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | VTP Bluewaters',
  description: 'Privacy Policy for VTP Bluewaters.'};

export default function PrivacyPolicyPage() {
  const lang = 'hi';
    return (
    <div className="min-h-screen bg-luxury-navy pt-24 lg:pt-32 pb-12 lg:pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-display font-light text-luxury-white mb-12 leading-tight border-b border-white/10 pb-8">
          Privacy <span className="italic text-luxury-silver">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:text-luxury-white prose-p:text-luxury-silver prose-p:font-light">
          <p>
            Welcome to the VTP Bluewaters Privacy Policy page. We value your privacy and are committed to protecting your personal data.
          </p>
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal identification information including your name, email address, phone number, and preferences when you fill out forms on our website.
          </p>
          <h2>2. How We Use Your Information</h2>
          <p>
            The information collected is used to provide you with the services you request, improve our website, and occasionally send you promotional information about VTP Bluewaters properties if you have opted in to receive them.
          </p>
          <h2>3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet is completely secure.
          </p>
          <p className="mt-12 text-sm text-luxury-silver/60">
            Note: This is a placeholder policy for demonstration purposes. Please update with your official legal Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
