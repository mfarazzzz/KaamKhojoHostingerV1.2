import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://kaamkhojo.com';
  
  const staticPages = [
    '',
    '/jobs',
    '/news',
    '/services',
    '/freelance',
    '/learning',
    '/post-job',
    '/connect',
    '/login',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : page === '/jobs' || page === '/news' ? 'hourly' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/jobs' || page === '/news' ? '0.9' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  
  <!-- Job Category Pages -->
  <url>
    <loc>${baseUrl}/jobs/professional</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/jobs/blue-collar</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Location Pages -->
  ${['delhi', 'mumbai', 'bangalore', 'chennai', 'hyderabad', 'pune']
    .map(
      (city) => `
  <url>
    <loc>${baseUrl}/jobs/${city}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}