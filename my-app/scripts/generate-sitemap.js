// generate-sitemap.js
const fs = require('fs');
const { SitemapStream } = require('sitemap');

const sitemap = new SitemapStream({ hostname: 'https://www.pilotseal.com' });

const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/logbook', changefreq: 'monthly', priority: 0.8 },
  { url: '/endorsement-generator', changefreq: 'monthly', priority: 0.8 },
  { url: '/flight-brief', changefreq: 'monthly', priority: 0.8 }
];

(async () => {
  const writeStream = fs.createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);
  links.forEach(link => sitemap.write(link));
  sitemap.end();
})();