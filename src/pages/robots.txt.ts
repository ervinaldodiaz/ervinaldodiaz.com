import type { APIContext } from 'astro';

export function GET(context: APIContext): Response {
  const sitemapUrl: URL = new URL('sitemap-index.xml', context.site);
  const body: string = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl.href}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
