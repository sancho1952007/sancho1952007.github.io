import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'Omgilibot', 'anthropic-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://sancho.sg-app.com/sitemap.xml',
  }
}
