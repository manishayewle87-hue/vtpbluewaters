import { redirect } from 'next/navigation';



export default function RootPage() {
  // Automatically redirect visitors at the root / to the default /en locale
  redirect('/en');
}
