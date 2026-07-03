// Cloudflare Image Resizing Loader
// Documentation: https://developers.cloudflare.com/images/image-resizing/

export default function cloudflareLoader({ src, width, quality }) {
  // Bypass Cloudflare Image Resizing in local development or if not explicitly on Cloudflare
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_USE_CF_LOADER !== 'true') {
    return src;
  }

  const params = [`width=${width}`];
  
  if (quality) {
    params.push(`quality=${quality}`);
  }
  
  // Format 'auto' will automatically serve WebP/AVIF if the browser supports it
  params.push('format=auto');

  const paramsString = params.join(',');

  // Check if it's an external URL (e.g. https://images.unsplash.com/...)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // For external URLs, Cloudflare requires them to be appended to the current zone
    // example: /cdn-cgi/image/width=500/https://images.unsplash.com/photo.jpg
    return `/cdn-cgi/image/${paramsString}/${src}`;
  }

  // For relative URLs (local images)
  // Ensure src starts with a slash
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return `/cdn-cgi/image/${paramsString}${cleanSrc}`;
}
