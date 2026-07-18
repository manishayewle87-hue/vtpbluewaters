import TownshipHero from '@/app/components/township/TownshipHero';
import TownshipInfographics from '@/app/components/township/TownshipInfographics';
import MasterplanDeepDive from '@/app/components/township/MasterplanDeepDive';
import TownshipExperience from '@/app/components/township/TownshipExperience';
import TownshipConnectivity from '@/app/components/township/TownshipConnectivity';
import TownshipLegacy from '@/app/components/township/TownshipLegacy';
import Footer from '@/app/components/ui/Footer';

export const metadata = {
  title: 'VTP Blue Waters Township | 200+ Acres of Luxury in Pune',
  description: 'Explore the masterplan of VTP Blue Waters, a sprawling 200+ acre luxury township in Mahalunge, West Pune. Featuring a 1KM riverfront promenade and world-class high street retail.',
  alternates: { canonical: 'https://vtpbluewaters.com/township' },
  openGraph: {
    title: 'VTP Blue Waters Township | 200+ Acres of Luxury in Pune',
    description: 'Explore the masterplan of VTP Blue Waters — 200+ acres, 1KM riverfront promenade, and world-class amenities in Mahalunge, West Pune.',
    url: 'https://vtpbluewaters.com/township',
    type: 'website',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Blue Waters Township Masterplan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTP Blue Waters Township | 200+ Acres of Luxury in Pune',
    description: 'A 200+ acre integrated luxury township in Mahalunge with a 1KM riverfront promenade.',
    images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
  },
};

export default function TownshipPage() {
  const lang = 'en';

  const townshipSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'Place'],
        '@id': 'https://vtpbluewaters.com/township#township',
        'name': 'VTP Blue Waters Integrated Township',
        'description': 'A 200+ acre integrated luxury township in Mahalunge, West Pune, featuring Earth One, Leonara, and Bel Air residential towers with a 1KM riverfront promenade and world-class amenities.',
        'url': 'https://vtpbluewaters.com/township',
        'image': {
          '@type': 'ImageObject',
          'url': 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg',
          'width': 1200,
          'height': 630,
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '18.5726',
          'longitude': '73.7379',
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Mahalunge, Baner Annex',
          'addressLocality': 'Pune',
          'addressRegion': 'Maharashtra',
          'postalCode': '411045',
          'addressCountry': 'IN',
        },
        'hasMap': 'https://maps.google.com/?q=VTP+Blue+Waters+Mahalunge+Pune',
        'containsPlace': [
          { '@type': 'Residence', 'name': 'VTP Earth One', 'url': 'https://vtpbluewaters.com/projects/earth-one' },
          { '@type': 'Residence', 'name': 'VTP Leonara', 'url': 'https://vtpbluewaters.com/projects/leonara' },
          { '@type': 'Residence', 'name': 'VTP Bel Air', 'url': 'https://vtpbluewaters.com/projects/bel-air' },
        ],
        'amenityFeature': [
          { '@type': 'LocationFeatureSpecification', 'name': '1KM Riverfront Promenade', 'value': true },
          { '@type': 'LocationFeatureSpecification', 'name': 'High Street Retail', 'value': true },
          { '@type': 'LocationFeatureSpecification', 'name': 'Clubhouse', 'value': true },
          { '@type': 'LocationFeatureSpecification', 'name': 'Swimming Pool', 'value': true },
          { '@type': 'LocationFeatureSpecification', 'name': 'RERA Registered', 'value': true },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://vtpbluewaters.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Township Masterplan', 'item': 'https://vtpbluewaters.com/township' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-luxury-navy flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(townshipSchema) }} />
      <TownshipHero />
      <TownshipInfographics />
      <MasterplanDeepDive />
      <TownshipExperience />
      <TownshipConnectivity />
      <TownshipLegacy />
      <Footer />
    </main>
  );
}



