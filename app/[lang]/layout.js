import { Inter, Outfit } from 'next/font/google';
import '@/app/globals.css';
import SmoothScroll from '@/app/components/ui/SmoothScroll';
import LuxuryNavbar from '@/app/components/ui/LuxuryNavbar';
import Footer from '@/app/components/ui/Footer';
import CustomCursor from '@/app/components/ui/CustomCursor';
import StickyEnquiryWidget from '@/app/components/ui/StickyEnquiryWidget';
import GlobalSchema from '@/app/components/seo/GlobalSchema';
import KnowledgeGraph from '@/app/components/seo/KnowledgeGraph';
import WhatsAppWidget from '@/app/components/ui/WhatsAppWidget';
import ExitIntentModal from '@/app/components/ui/ExitIntentModal';
import GoogleAnalytics from '@/app/components/analytics/GoogleAnalytics';
import Clarity from '@/app/components/analytics/Clarity';
import MobileBottomBar from '@/app/components/ui/MobileBottomBar';
import CanonicalHreflang from '@/app/components/seo/CanonicalHreflang';
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export const metadata = {
  title: 'VTP Bluewaters | Premium Luxury Residences in Pune',
  description: 'Experience ultra-luxury living at VTP Bluewaters Pune. Master-planned township featuring 2, 3, 4, 5 BHK apartments, duplexes, and villas.',
  verification: {
    google: 'YOUR_GSC_VERIFICATION_STRING',
  },
  metadataBase: new URL('https://vtpbluewaters.com'),
  openGraph: {
    title: 'VTP BLUEWATERS | Ultra Luxury Residences in Pune',
    description: 'Discover the pinnacle of luxury living at VTP BLUEWATERS Township, Mahalunge, Pune.',
    siteName: 'VTP BLUEWATERS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTP BLUEWATERS | Ultra Luxury Residences in Pune',
    description: 'Discover the pinnacle of luxury living at VTP BLUEWATERS Township, Mahalunge, Pune.',
  },
};

export default function RootLayout({ children, params: { lang = 'en' } }) {
  return (
    <html lang={lang} className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <CanonicalHreflang />
      </head>
      <body className="bg-luxury-navy text-luxury-white font-sans antialiased cursor-none">
        <GoogleAnalytics />
        <Clarity />
        <KnowledgeGraph />
        <GlobalSchema />
        <CustomCursor />
        <SmoothScroll>
          <LuxuryNavbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <StickyEnquiryWidget />
        <WhatsAppWidget />
        <MobileBottomBar />
        <ExitIntentModal />
      </body>
    </html>
  );
}
