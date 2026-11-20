import type { Metadata } from 'next'
import ProjectIndexRedirect from '@/components/project-index-redirect'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Projects | Sancho Godinho',
  description:
    'Selected software, open-source, security, and web projects by Sancho Godinho.',
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      'x-default': SITE_URL,
    },
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/#projects`,
    siteName: 'Sancho Godinho Portfolio',
    locale: 'en_US',
    title: 'Projects | Sancho Godinho',
    description:
      'Selected software, open-source, security, and web projects by Sancho Godinho.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Sancho Godinho',
    description:
      'Selected software, open-source, security, and web projects by Sancho Godinho.',
    creator: '@iamsgxd',
    site: '@iamsgxd',
  },
}

export default function ProjectIndexPage() {
  return <ProjectIndexRedirect />
}
