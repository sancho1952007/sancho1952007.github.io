import type { Metadata } from 'next'
import Home from '@/app/page'
import { PROJECTS } from '@/lib/projects'

export function generateStaticParams() {
  const slugs = new Set<string>()
  for (const p of PROJECTS) {
    slugs.add(p.name)
    slugs.add(encodeURIComponent(p.name))
  }
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const decoded = decodeURIComponent(slug).trim()
  const project = PROJECTS.find(
    (p) => p.name.toLowerCase() === decoded.toLowerCase() || p.name === decoded
  )

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

export default function ProjectPage() {
  return <Home skipPreloader={true} />
}
