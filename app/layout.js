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
  keywords: [
    'VTP Blue Waters', 'VTP Realty Pune', 'Luxury Flats in Pune', 'Luxury Apartments Mahalunge',
    '2 BHK Flats Pune', '3 BHK Flats Pune', '4 BHK Flats Pune', 'Township in Pune',
    'VTP Earth 1', 'VTP Monarque', 'VTP Volare', 'Maximum Livable Area'
  ],
  authors: [{ name: 'VTP Realty', url: 'https://vtprealty.in' }],
  creator: 'VTP Realty',
  publisher: 'VTP Realty',
  category: 'Real Estate',
  classification: 'Luxury Residential Real Estate',
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
    locale: 'en_IN',
    images: [
      {
        url: '/assets/projects/earth-1/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'VTP Blue Waters Mahalunge Pune - Luxury Township'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VTPRealty',
    creator: '@VTPRealty',
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
    canonical: 'https://vtpbluewaters.com',
    languages: {
      'en-IN': 'https://vtpbluewaters.com',
    }
  },
  // Geo meta tags for local SEO (Pune)
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Mahalunge, Pune, Maharashtra',
    'geo.position': '18.5837;73.7703',
    'ICBM': '18.5837, 73.7703',
    'DC.title': 'VTP Blue Waters — Luxury Township Mahalunge Pune',
    'DC.subject': 'Luxury Real Estate, Pune Apartments, VTP Realty',
    'DC.description': 'VTP Blue Waters is a 200+ acre luxury township in Mahalunge, West Pune.',
    'DC.creator': 'VTP Realty',
    'DC.language': 'en-IN',
    'rating': 'general',
    'revisit-after': '3 days',
    'theme-color': '#D4AF37',
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en-IN" dir="ltr" className={`${inter.variable} ${outfit.variable}`}>
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
