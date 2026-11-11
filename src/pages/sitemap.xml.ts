import type { APIRoute } from 'astro';
import { portfolioProjects } from '../data/projects';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://wilsoncueva-qa.vercel.app';

  const staticRoutes = [
    '/',
    '/about',
    '/projects',
    '/dashboard',
    '/evidence',
    '/contact',
  ];

  const projectRoutes = portfolioProjects.map((p) => `/projects/${p.slug}`);
  const allRoutes = [...staticRoutes, ...projectRoutes, '/projects/hotel-asturias/report'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
