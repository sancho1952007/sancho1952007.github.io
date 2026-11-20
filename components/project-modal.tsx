'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

type ProjectModalProps = {
  project: Project
  open: boolean
  originRect: DOMRect | null
  animateFromCard: boolean
  onClose: () => void
  onExitComplete: () => void
}

export default function ProjectModal({
  project,
  open,
  originRect,
  animateFromCard,
  onClose,
  onExitComplete,
}: ProjectModalProps) {
  const [measuredModalHeight, setMeasuredModalHeight] = useState(0)
  const [viewport, setViewport] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1200, height: 800 }
  )
  const modalNodeRef = useRef<HTMLDivElement | null>(null)

  const setModalNode = useCallback((node: HTMLDivElement | null) => {
    modalNodeRef.current = node
    if (node) {
      const height = node.offsetHeight
      if (height > 0) {
        setMeasuredModalHeight((prev) => (prev === height ? prev : height))
      }
    }
  }, [])

  useEffect(() => {
    const updateViewport = () => {
      setViewport((prev) => {
        const width = window.innerWidth
        const height = window.innerHeight
        return prev.width === width && prev.height === height
          ? prev
          : { width, height }
      })
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    const node = modalNodeRef.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(() => {
      const height = node.offsetHeight
      if (height > 0) {
        setMeasuredModalHeight((prev) => (prev === height ? prev : height))
      }
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const targetRect = originRect
  const canMorph = !!targetRect && targetRect.width > 0 && targetRect.height > 0

  const { width: vw, height: vh } = viewport
  const isDesktop = vw >= 768
  const modalWidth = Math.min(672, vw - (isDesktop ? 64 : 32))

  const initialScale = canMorph ? targetRect.width / modalWidth : 0.95
  const imgHeight = canMorph ? modalWidth * (targetRect.height / targetRect.width) : 380
  const actualModalHeight = measuredModalHeight || (imgHeight + (isDesktop ? 200 : 180))

  const deltaX = canMorph ? (targetRect.left + targetRect.width / 2) - vw / 2 : 0
  const deltaY = canMorph
    ? targetRect.top + (actualModalHeight * initialScale) / 2 - vh / 2
    : 0

  const animDuration = open ? 0.65 : 0.55
  const animEase = [0.25, 0.1, 0.25, 1] as const

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          key="project-modal-backdrop"
          initial={animateFromCard ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animDuration, ease: animEase }}
          className="fixed inset-0 z-50 cursor-pointer"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={onClose}
        />
      )}
      {open && (
        <motion.div
          key="project-modal-card-wrapper"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: animDuration }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          style={{ perspective: 1200 }}
        >
          <motion.div
            key="project-modal-card"
            ref={setModalNode}
            initial={
              !animateFromCard
                ? false
                : canMorph
                  ? { x: deltaX, y: deltaY, scale: initialScale, rotateY: 0, opacity: 1 }
                  : { scale: 0.95, opacity: 0, rotateY: 0 }
            }
            animate={{ x: 0, y: 0, scale: 1, rotateY: 360, opacity: 1 }}
            exit={
              canMorph
                ? { x: deltaX, y: deltaY, scale: initialScale, rotateY: 0, opacity: 1 }
                : { scale: 0.95, opacity: 0, rotateY: 0 }
            }
            transition={{
              duration: animDuration,
              ease: animEase,
            }}
            className="relative w-full max-w-2xl max-h-[90vh] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Face (Modal content, visible 0-90° and 270-360°) */}
            <div
              className="w-full h-full overflow-hidden rounded-xl bg-[var(--background)] border border-[var(--border-rule)] flex flex-col max-h-[90vh] shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity duration-200 border-none cursor-pointer"
                style={{
                  opacity: open ? 1 : 0,
                  pointerEvents: open ? 'auto' : 'none',
                }}
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="w-full bg-[var(--border-rule)] shrink-0" style={{ maxHeight: '50vh', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  className="w-full h-auto object-cover"
                  style={{ backgroundColor: 'white' }}
                  decoding="async"
                />
              </div>

              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <h3
                  className="text-2xl md:text-3xl font-medium mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-base md:text-lg mb-8 leading-relaxed font-light"
                  style={{ color: 'var(--muted-text)' }}
                >
                  {project.description}
                </p>

                {project.techStack?.length ? (
                  <div className="mb-8">
                    <p
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono, monospace)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--muted-text)',
                        marginBottom: '10px',
                      }}
                    >
                      Tech stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-light"
                          style={{
                            fontSize: '12px',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border-rule)',
                            borderRadius: '4px',
                            padding: '3px 9px',
                            lineHeight: 1.6,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-opacity duration-200 hover:opacity-80 font-medium"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', textDecoration: 'none' }}
                >
                  Visit Project <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Back Face (visible 90-270° during 3D flip) */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden bg-[var(--background)] border border-[var(--border-rule)] select-none shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 opacity-20 bg-center bg-cover filter blur-sm"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
