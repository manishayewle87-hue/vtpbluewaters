export default function cloudflareLoader({ src }) {
  // Passthrough local and external images directly. 
  // Next.js <Image> will render but Cloudflare Image Resizing (/cdn-cgi/image/) 
  // is bypassed to prevent 404 errors if the feature isn't enabled on the zone.
  return src;
}
