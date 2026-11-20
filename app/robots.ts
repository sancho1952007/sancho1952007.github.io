import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

/**
 * Search crawlers, AI search/retrieval agents, and model-training crawlers are
 * listed deliberately. The portfolio is public and contains no private data,
 * so all three groups are allowed to read it. Deprecated agent names
 * (Claude-Web, anthropic-ai, Omgilibot) are replaced by current ones.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Traditional search crawlers.
        userAgent: ['Googlebot', 'Bingbot', 'Applebot'],
        allow: '/',
      },
      {
        // AI search indexes and user-triggered retrieval/fetching agents.
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
        ],
        allow: '/',
      },
      {
        // Model-training crawlers. Content is public, so training is allowed.
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'CCBot',
          'Applebot-Extended',
          'meta-externalagent',
          'Amazonbot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
