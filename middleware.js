import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};

export function middleware(request) {
  // Extract country from Cloudflare or Vercel edge headers
  const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country') || 'IN';
  
  // Clone the request headers and inject the detected country
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-country', country);

  // Return the response with the modified headers so Server Components can read them
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
