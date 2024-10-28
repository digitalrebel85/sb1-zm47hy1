/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://findanadvisor.online',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*']
      }
    ],
    additionalSitemaps: [
      'https://findanadvisor.online/sitemap-advisors.xml',
      'https://findanadvisor.online/sitemap-cities.xml'
    ]
  },
  exclude: ['/api/*', '/admin/*'],
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7
}