import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Home from '@/app/page'
import { PROJECTS, findProject } from '@/lib/projects'
import {
  projectMarkdownPath,
  projectMetaDescription,
  projectStructuredData,
  projectUrl,
} from '@/lib/seo'

// Unknown project slugs should return the static 404 rather than a thin page.
export const dynamicParams = false

export function generateStaticParams() {
  // Only the real project names are emitted. Browser/static hosts decode
  // percent-encoded URLs (for example /project/SG%20Apps) onto these files,
  // so generating encoded duplicates would create conflicting 404 pages.
  return PROJECTS.map((project) => ({ slug: project.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = findProject(slug)

  if (!project) {
    return {
      title: 'Project | Sancho Godinho',
      robots: { index: false, follow: true },
    }
  }

  const title = `${project.name} | Sancho Godinho`
  const description = projectMetaDescription(project)
  const canonical = projectUrl(project)

  return {
    title,
    description,
    keywords: [
      project.name,
      'Sancho Godinho',
      ...(project.applicationCategory ? [project.applicationCategory] : []),
      ...(project.genre ? [project.genre] : []),
      'project',
      'portfolio',
    ],
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
      types: {
        'text/markdown': projectMarkdownPath(project),
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Sancho Godinho Portfolio',
      locale: 'en_US',
      title,
      description,
      images: [
        {
          url: project.image,
          alt: `${project.name} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: project.image, alt: `${project.name} preview` }],
      creator: '@iamsgxd',
      site: '@iamsgxd',
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = findProject(slug)

  if (!project) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectStructuredData(project) }}
      />
      <Home
        skipPreloader={true}
        initialProjectSlug={slug}
        structuredData={false}
      />
    </>
  )
}
