import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://vtpbluewaters.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className="w-full py-4 relative z-10 bg-transparent">
        <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-light tracking-wide text-luxury-silver">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-luxury-gold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      href={item.href || '#'} 
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                    <span className="text-white/20 select-none">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
