import { Inter, Outfit } from 'next/font/google';
import CustomGTM from '@/app/components/analytics/CustomGTM';
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
import Clarity from '@/app/components/analytics/Clarity';
import MobileBottomBar from '@/app/components/ui/MobileBottomBar';
import CanonicalHreflang from '@/app/components/seo/CanonicalHreflang';
import ReCaptchaProvider from '@/app/components/providers/ReCaptchaProvider';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap'
});

export const viewport = {
  themeColor: '#0A1128',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark'
};

export const metadata = {
  title: 'VTP Bluewaters Pune | Buy Luxury 2, 3 & 4 BHK Flats in Mahalunge',
  description: 'Invest in VTP Bluewaters Pune. Buy premium 2, 3, 4 & 5 BHK luxury apartments, duplexes, and villas in Mahalunge. Zero Brokerage. View Floor Plans & Price.',
  appleWebApp: {
    capable: true,
    title: 'VTP Bluewaters',
    statusBarStyle: 'black-translucent'
  },
  metadataBase: new URL('https://vtpbluewaters.com'),
  openGraph: {
    title: 'VTP Bluewaters Pune | Buy Luxury 2, 3 & 4 BHK Flats',
    description: 'Invest in VTP Bluewaters Pune. Buy premium 2, 3, 4 & 5 BHK luxury apartments in Mahalunge. Zero Brokerage. View Floor Plans & Price.',
    siteName: 'VTP BLUEWATERS',
    type: 'website',
    images: ['/assets/projects/earth-1/hero.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTP Bluewaters Pune | Buy Luxury 2, 3 & 4 BHK Flats',
    description: 'Invest in VTP Bluewaters Pune. Buy premium luxury apartments in Mahalunge. Zero Brokerage.',
    images: ['/assets/projects/earth-1/hero.jpg']
  },
  verification: {
    google: '0ziqnRFUOxCq-61sxxcMTCRrvPIFd0W0pOoyy57XkKw'
  },
  icons: {
    icon: '/icon.svg'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <CanonicalHreflang />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#050914] text-white selection:bg-luxury-gold selection:text-luxury-navy`}>
        <ReCaptchaProvider>
          <KnowledgeGraph />
          <GlobalSchema />
          <Clarity />
          <CustomCursor />
          <SmoothScroll>
            <LuxuryNavbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
          <StickyEnquiryWidget />
          <WhatsAppWidget />
          <MobileBottomBar />
          <ExitIntentModal />
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <CustomGTM gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
