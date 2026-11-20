import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'
import { projectUrl, SITE_LAST_MODIFIED, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_LAST_MODIFIED)

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...PROJECTS.map((project) => ({
      url: projectUrl(project),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
