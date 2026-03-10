const fs = require('fs');
const path = require('path');
const routes = require('../src/routes');

const siteRoot = 'https://www.pilotseal.com';

const sitemapEntries = routes.map((route) => {
  const loc = `${siteRoot}${route.path}`;
  const changefreq = route.changefreq || 'monthly';
  const priority = route.priority || '0.8';

  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`Sitemap generated: ${outputPath}`);
