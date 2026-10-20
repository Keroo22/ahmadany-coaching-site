import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''); return ['', '/about/', '/programs/', '/pricing/', '/contact/', '/checkout/', '/terms/', '/privacy/', '/refunds/'].map(path => ({ url: `${base}${path}`, lastModified: new Date() })); }
