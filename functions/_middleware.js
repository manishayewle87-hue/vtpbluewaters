/**
 * Cloudflare Pages Edge Middleware for Advanced Technical SEO
 * 
 * Intercepts requests at the edge (before hitting Next.js static files).
 * Used for:
 * 1. Enforcing trailing slashes (canonical consistency)
 * 2. Geo-IP based routing or personalization (future-proofing)
 * 3. Dynamic header injection
 */

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Next.js App router handles canonical URLs. Enforcing trailing slashes here 
  // conflicts with Cloudflare Pages internal asset routing and causes redirect loops.
  // We simply pass through the request.

  // Pass through the request to the static Next.js export
  const response = await next();

  // 2. Clone the response to modify headers (since static responses are immutable)
  const newResponse = new Response(response.body, response);

  // 3. Set Server-Timing headers for performance monitoring
  newResponse.headers.set('Server-Timing', 'cfEdge;desc="Cloudflare Edge Middleware"');

  // Example: Bot Detection / Dynamic A/B Testing (Advanced Edge SEO)
  // const userAgent = request.headers.get('user-agent') || '';
  // const isGooglebot = userAgent.toLowerCase().includes('googlebot');
  // if (isGooglebot) {
  //   newResponse.headers.set('X-Bot-Detected', 'true');
  // }

  return newResponse;
}
