import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://wilsoncueva-qa.vercel.app';
  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
