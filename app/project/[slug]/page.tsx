import type { Metadata } from 'next'
import Home from '@/app/page'
import { PROJECTS, findProject } from '@/lib/projects'

export function generateStaticParams() {
  const slugs = new Set<string>()
  for (const project of PROJECTS) {
    slugs.add(project.name)
    slugs.add(encodeURIComponent(project.name))
  }
  return Array.from(slugs, (slug) => ({ slug }))
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
    }
  }

  return {
    title: `${project.name} | Sancho Godinho`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Sancho Godinho`,
      description: project.description,
      images: [{ url: project.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Sancho Godinho`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <Home skipPreloader={true} initialProjectSlug={slug} />
}
