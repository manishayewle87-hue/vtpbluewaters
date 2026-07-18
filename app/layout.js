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
  title: {
    default: 'VTP Blue Waters Mahalunge | Luxury 2, 3 & 4 BHK Flats in Pune',
    template: '%s | VTP Blue Waters'
  },
  description: 'Looking for luxury flats in Pune? Discover VTP Blue Waters in Mahalunge. Premium 2, 3, 4 & 5 BHK apartments, duplexes, and villas. View Floor Plans, Prices & Offers.',
  appleWebApp: {
    capable: true,
    title: 'VTP Blue Waters',
    statusBarStyle: 'black-translucent'
  },
  metadataBase: new URL('https://vtpbluewaters.com'),
  openGraph: {
    title: 'VTP Blue Waters Mahalunge | Luxury 2, 3 & 4 BHK Flats in Pune',
    description: 'Looking for luxury flats in Pune? Discover VTP Blue Waters in Mahalunge. Premium 2, 3, 4 & 5 BHK apartments. View Floor Plans, Prices & Offers.',
    siteName: 'VTP Blue Waters',
    type: 'website',
    images: ['/assets/projects/earth-1/hero.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTP Blue Waters Mahalunge | Luxury 2, 3 & 4 BHK Flats in Pune',
    description: 'Discover VTP Blue Waters in Mahalunge. Premium luxury apartments in Pune. View Floor Plans & Prices.',
    images: ['/assets/projects/earth-1/hero.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '0ziqnRFUOxCq-61sxxcMTCRrvPIFd0W0pOoyy57XkKw'
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: 'https://vtpbluewaters.com'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
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
