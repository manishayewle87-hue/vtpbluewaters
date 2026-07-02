export default function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  // We use the built-in Cloudflare Image Resizing /cdn-cgi/image/ path
  
  // If the src is an absolute URL, we can use it directly
  if (src.startsWith('http')) {
    return `/cdn-cgi/image/${params.join(',')}/${src}`;
  }
  
  // If it's relative, just append it
  return `/cdn-cgi/image/${params.join(',')}${src}`;
}
