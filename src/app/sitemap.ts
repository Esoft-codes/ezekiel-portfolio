import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';
import { getPosts } from '@/lib/blog';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/blog/', ...projects.map((p) => `/work/${p.slug}/`), ...getPosts().map((p) => `/blog/${p.slug}/`)].map((path) => ({ url: `${site.url}${path}` }));
}
