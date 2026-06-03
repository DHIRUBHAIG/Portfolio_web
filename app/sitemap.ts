import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://portfolio-web-zeta-lac.vercel.app',
      lastModified: new Date(),
    },
  ]
}