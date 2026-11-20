'use client'

import dynamic from 'next/dynamic'
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import SectionShell from './section-shell'
import { PROJECTS, findProject, type Project } from '@/lib/projects'
import { projectPath } from '@/lib/seo'

// Framer Motion and the modal markup are only needed once a visitor opens a
// project. Keeping this in its own chunk cuts it from the homepage bundle while
// still server-rendering on direct /project/[slug] visits.
const ProjectModal = dynamic(() => import('./project-modal'))

function getVisibleCardButton(projectName: string): HTMLAnchorElement | null {
  const cards = document.querySelectorAll<HTMLAnchorElement>('a[data-project]')
  for (const card of cards) {
    if (card.dataset.project === projectName && card.offsetParent !== null) {
      return card
    }
  }
  return null
}

type ProjectCardProps = {
  project: Project
  onSelect: (project: Project, rect: DOMRect) => void
  mode: 'desktop' | 'mobile'
  isSelected: boolean
}

const ProjectCard = memo(function ProjectCard({
  project,
  onSelect,
  mode,
  isSelected,
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modifier-clicks and middle-clicks open the crawlable project URL.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onSelect(project, e.currentTarget.getBoundingClientRect())
  }

  if (mode === 'desktop') {
    return (
      <a
        data-project={project.name}
        href={projectPath(project)}
        onClick={handleClick}
        className="group hidden md:block relative overflow-hidden w-full text-left cursor-pointer"
        style={{
          borderRadius: '8px',
          breakInside: 'avoid',
          marginBottom: '16px',
          border: 'none',
          padding: 0,
          background: 'none',
          opacity: isSelected ? 0 : 1,
          pointerEvents: isSelected ? 'none' : 'auto',
          color: 'inherit',
          textDecoration: 'none',
        }}
        aria-label={`${project.name} - ${project.description}`}
      >
        {/* Image */}
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            decoding="async"
            onError={() => setImgError(true)}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: 'white' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '4/3',
              backgroundColor: 'var(--row-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
              {project.url.replace(/^https?:\/\//, '')}
            </span>
          </div>
        )}

        {/* Dark tint overlay with fading gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ zIndex: 1 }}>
          <p style={{ fontSize: '15px', color: '#fff', fontWeight: 400, lineHeight: 1.4, marginBottom: '2px' }}>
            {project.name}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
            {project.description}
          </p>
        </div>
      </a>
    )
  }

  if (mode === 'mobile') {
    return (
      <a
        data-project={project.name}
        href={projectPath(project)}
        onClick={handleClick}
        className="group flex md:hidden flex-col overflow-hidden transition-all duration-200 w-full text-left cursor-pointer"
        style={{
          borderRadius: '8px',
          border: '1px solid var(--border-rule)',
          backgroundColor: 'var(--row-hover)',
          padding: 0,
          opacity: isSelected ? 0 : 1,
          pointerEvents: isSelected ? 'none' : 'auto',
          color: 'inherit',
          textDecoration: 'none',
        }}
        aria-label={`${project.name} — ${project.description}`}
      >
        {/* Image — natural height, no fixed aspect ratio */}
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--border-rule)' }}>
          {!imgError ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              decoding="async"
              onError={() => setImgError(true)}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            <div
              className="w-full flex items-center justify-center"
              style={{ aspectRatio: '4/3', backgroundColor: 'var(--row-hover)' }}
            >
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
                {project.url.replace(/^https?:\/\//, '')}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1 p-4">
          <span className="font-light" style={{ fontSize: '15px', color: 'var(--foreground)', lineHeight: 1.4 }}>
            {project.name}
          </span>
          <p className="font-light" style={{ fontSize: '13px', color: 'var(--muted-text)', lineHeight: 1.55 }}>
            {project.description}
          </p>
          <span
            className="mt-2 inline-flex items-center gap-1 font-light transition-opacity duration-200 group-hover:opacity-60"
            style={{ fontSize: '12px', color: 'var(--accent)' }}
            aria-hidden="true"
          >
            {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
          </span>
        </div>
      </a>
    )
  }

  return null
})

interface ProjectsProps {
  initialProjectSlug?: string
}

export default function Projects({ initialProjectSlug }: ProjectsProps = {}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    let slug = initialProjectSlug
    if (!slug && typeof window !== 'undefined') {
      slug = window.location.pathname.match(/^\/project\/(.+)$/)?.[1]
    }
    return findProject(slug)
  })
  const [activeProject, setActiveProject] = useState<Project | null>(selectedProject)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)

  const isDirectVisit = useRef(
    !!initialProjectSlug ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/project/'))
  )

  const handleOpenProject = useCallback((project: Project, rect: DOMRect) => {
    isDirectVisit.current = false
    setOriginRect(rect)
    setSelectedProject(project)
    setActiveProject(project)
    window.history.pushState(null, '', '/project/' + encodeURIComponent(project.name))
  }, [])

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null)
    window.history.pushState(null, '', '/')
  }, [])

  const handleExitComplete = useCallback(() => {
    setOriginRect(null)
    setActiveProject(null)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/project\/(.+)$/)
      const project = match ? findProject(match[1]) : null
      if (!project) {
        handleCloseProject()
        return
      }

      isDirectVisit.current = false
      const button = getVisibleCardButton(project.name)
      if (button) setOriginRect(button.getBoundingClientRect())
      setSelectedProject(project)
      setActiveProject(project)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [handleCloseProject])

  useEffect(() => {
    if (!activeProject) {
      document.body.style.overflow = 'unset'
      return
    }

    // If the card is not already in the viewport (e.g. on direct visit to
    // /project/...), scroll the page so the card is centered behind the modal.
    const button = getVisibleCardButton(activeProject.name)
    if (button) {
      const rect = button.getBoundingClientRect()
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || 800)
      if (!inView) {
        button.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })
      }
      setOriginRect((prev) => prev ?? button.getBoundingClientRect())
    }

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseProject()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject, handleCloseProject])

  const currentProject = selectedProject || activeProject

  return (
    <SectionShell id="projects" label="Projects">
      {/* Desktop: CSS columns masonry */}
      <div
        className="hidden md:block"
        style={{ columns: 2, columnGap: '16px' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onSelect={handleOpenProject}
            mode="desktop"
            isSelected={activeProject?.name === project.name}
          />
        ))}
      </div>

      {/* Mobile: single-column stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onSelect={handleOpenProject}
            mode="mobile"
            isSelected={activeProject?.name === project.name}
          />
        ))}
      </div>

      <div className="mt-8 justify-between flex">
        <a
          href="https://github.com/sancho1952007"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-light transition-opacity duration-200 hover:opacity-60"
          style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}
        >
          View more on GitHub ↗
        </a>

        <a
          href="https://www.sololearn.com/profile/19684449"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-light transition-opacity duration-200 hover:opacity-60"
          style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}
        >
          View more on Sololearn ↗
        </a>
      </div>

      {currentProject && (
        <ProjectModal
          project={currentProject}
          open={!!selectedProject}
          originRect={originRect}
          animateFromCard={!isDirectVisit.current}
          onClose={handleCloseProject}
          onExitComplete={handleExitComplete}
        />
      )}
    </SectionShell>
  )
}
