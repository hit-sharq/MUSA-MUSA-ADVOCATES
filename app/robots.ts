import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.musadvocates.co.ke'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

