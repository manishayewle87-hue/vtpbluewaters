import { Inter, Outfit } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
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
  display: 'swap'});
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap'});

// removed generateStaticParams

export const viewport = {
  themeColor: '#0A1128',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark'};

export const metadata = {
  title: 'VTP Bluewaters | Premium Luxury Residences in Pune',
  description: 'Experience ultra-luxury living at VTP Bluewaters Pune. Master-planned township featuring 2, 3, 4, 5 BHK apartments, duplexes, and villas.',

  appleWebApp: {
    capable: true,
    title: 'VTP Bluewaters',
    statusBarStyle: 'black-translucent'},
  metadataBase: new URL('https://vtpbluewaters.com'),
  openGraph: {
    title: 'VTP BLUEWATERS | Ultra Luxury Residences in Pune',
    description: 'Discover the pinnacle of luxury living at VTP BLUEWATERS Township, Mahalunge, Pune.',
    siteName: 'VTP BLUEWATERS',
    type: 'website',
    images: ['/assets/projects/earth-1/hero.jpg']},
  twitter: {
    card: 'summary_large_image',
    title: 'VTP BLUEWATERS | Ultra Luxury Residences in Pune',
    description: 'Discover the pinnacle of luxury living at VTP BLUEWATERS Township, Mahalunge, Pune.',
    images: ['/assets/projects/earth-1/hero.jpg']},
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''},
  icons: {
    icon: '/icon.svg'}};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} ${outfit.variable}`}>
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
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
