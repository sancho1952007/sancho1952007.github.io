'use client'

import React from 'react'

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--muted-text)',
  lineHeight: 1.4,
  paddingTop: '2px',
  fontFamily: 'var(--font-mono, monospace)',
}

const RULE_STYLE: React.CSSProperties = {
  borderColor: 'var(--border-rule)',
  borderTopWidth: '1px',
  marginBottom: '48px',
}

// ─── Shared section wrapper ─────────────────────────────────────────────────

function SectionShell({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="px-6 md:px-12 lg:px-20 py-20"
      aria-labelledby={`${id}-label`}
    >
      <div className="max-w-5xl mx-auto w-full">
        <hr style={RULE_STYLE} />
        <div className="flex flex-col md:flex-row md:gap-16 lg:gap-24">
          <div className="mb-8 md:mb-0 md:w-28 shrink-0">
            <span id={`${id}-label`} style={SECTION_LABEL_STYLE}>
              {label}
            </span>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
  )
}

// ─── About ──────────────────────────────────────────────────────────────────

export function About() {
  const focuses = [
    'Exploring payment systems and integrations',
    'Contributing to open-source projects',
    'Researching web security and vulnerabilities',
    'Building practical developer tools and utilities',
  ]

  return (
    <SectionShell id="about" label="About">
      <div className="flex flex-col gap-8">
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.8,
            color: 'var(--foreground)',
            maxWidth: '56ch',
            fontFamily: 'var(--font-geist-pixel-square)',
          }}
        >
          I&apos;m a developer passionate about making new projects and constantly learning.
          Whether it&apos;s building practical tools like QR code generators and cloud notepads,
          or creating fun experiments, I love bringing ideas to life through code. My work spans
          web development, cybersecurity research, and open-source contributions — always
          focusing on tools that are useful and accessible.
        </p>
        <div>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono, monospace)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--muted-text)',
              marginBottom: '14px',
            }}
          >
            Currently focused on
          </p>
          <ul className="flex flex-col gap-2" role="list">
            {focuses.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-light"
                style={{ fontSize: '15px', color: 'var(--foreground)', lineHeight: 1.6, fontFamily: 'var(--font-geist-pixel-square)' }}
              >
                <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--muted-text)', lineHeight: 1.6, fontFamily: 'var(--font-geist-pixel-square)' }}>
          Active open-source contributor to{' '}
          <a
            href="https://github.com/sancho1952007"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Dodo Payments, Dokploy, Elysia.js, and more ↗
          </a>
        </p>
      </div>
    </SectionShell>
  )
}

// ─── Skills ─────────────────────────────────────────────────────────────────

const SKILLS: { level: string; items: string[] }[] = [
  {
    level: 'Expert',
    items: ['Bun', 'Node.js', 'Socket.io', 'HTML', 'CSS', 'JavaScript', 'Tailscale', 'Server Management', 'Infrastructure Optimization', 'Server Security'],
  },
  {
    level: 'Proficient',
    items: ['React', 'Expo', 'Python', 'Bash', 'MongoDB', 'Cyber Security', 'Docker', 'UFW'],
  },
]

const PRACTICES = [
  'RESTful API Design',
  'WebSocket Communication',
  'Security Best Practices',
  'Git & Version Control',
  'Responsive Web Design',
  'Performance Optimization',
]

export function Skills() {
  return (
    <SectionShell id="skills" label="Skills">
      <div className="flex flex-col gap-8">
        {SKILLS.map((group) => (
          <div key={group.level}>
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
              {group.level}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-light"
                  style={{
                    fontSize: '14px',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-rule)',
                    borderRadius: '4px',
                    padding: '3px 10px',
                    lineHeight: 1.6,
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-geist-pixel-square)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div>
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
            Practices
          </p>
          <div className="flex flex-wrap gap-2">
            {PRACTICES.map((item) => (
              <span
                key={item}
                className="font-light"
                style={{
                  fontSize: '14px',
                  color: 'var(--muted-text)',
                  border: '1px solid var(--border-rule)',
                  borderRadius: '4px',
                  padding: '3px 10px',
                  lineHeight: 1.6,
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-geist-pixel-square)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

// ─── Projects ───────────────────────────────────────────────────────────────

interface Project {
  name: string
  description: string
  url: string
  image: string
}

const PROJECTS: Project[] = [
  {
    name: 'Postily',
    description: 'The Next Gen Social Media Site (Under Development)',
    url: 'https://postily.social',
    image: 'https://wsrv.nl/?url=https://postily.social/og-image.png?maxage=15d',
  },
  {
    name: 'Smart Notes',
    description: 'Free cloud notepad with live-collaborative editing and rich text support (It has been shut down now).',
    url: 'https://smart-notes.sg-app.com',
    image: 'https://i.ibb.co/307TKL1/Screenshot-2024-06-06-163943.png',
  },
  {
    name: 'SG Apps',
    description: 'At SG Apps, We Aim To Build Apps For The Best!',
    url: 'https://sg-app.com',
    image: 'https://i.ibb.co/6gp6Sqt/Smart-Select-20240219-211006-Chrome.jpg',
  },
  {
    name: 'Tiles Game',
    description: 'A simple yet fun game to play in your free time!',
    url: 'https://sg-app.com/Tiles-Game/',
    image: 'https://i.ibb.co/GW0J8P5/Screenshot-2024-06-06-164126.png',
  },
  {
    name: 'Encli',
    description: 'A free cross platform file encryption/decryption tool.',
    url: 'https://github.com/sancho1952007/Encli',
    image: 'https://i.ibb.co/rb53gx6/encli.png',
  },
  {
    name: 'Clokie',
    description: 'An amazing customizable clock to be kept on display.',
    url: 'https://sancho1952007.github.io/Clokie/',
    image: 'https://i.ibb.co/DzWMry8/Capture.png',
  },
  {
    name: 'AOS Web',
    description: 'An OS-like system made only with web technology.',
    url: 'https://sancho1952007.github.io/AOS-Web/',
    image: 'https://i.ibb.co/1G4Qwpp/AOS-Web.png',
  },
  {
    name: 'Modern GUI',
    description: 'A beautiful window replacement for Tkinter (Python) apps.',
    url: 'https://github.com/sancho1952007/Modern-GUI-v3.0',
    image: 'https://i.ibb.co/DzWMry8/Capture.png',
  },
  {
    name: 'iPhone 11 Clone',
    description: 'An iPhone 11 Pro made using only HTML & CSS.',
    url: 'https://sancho1952007.github.io/iPhone-11-Clone/',
    image: 'https://i.ibb.co/fxRWxzq/i-Phone-Preview.png',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <>
      {/* ── Desktop tile (md+): image-only with hover overlay ── */}
      <a
        href={project.url}
        target="_blank"
        className="group hidden md:block relative overflow-hidden"
        style={{
          borderRadius: '8px',
          breakInside: 'avoid',
          marginBottom: '16px',
          textDecoration: 'none',
        }}
        aria-label={`${project.name} — ${project.description}`}
      >
        {/* Image */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} preview`}
            onError={() => setImgError(true)}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ width: '100%', height: 'auto', display: 'block' }}
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

        {/* Hover overlay with fading blur */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* Dark tint overlay with fading gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
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

      {/* ── Mobile card (below md): image + body ── */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex md:hidden flex-col overflow-hidden transition-all duration-200"
        style={{
          borderRadius: '8px',
          border: '1px solid var(--border-rule)',
          backgroundColor: 'var(--row-hover)',
          textDecoration: 'none',
        }}
        aria-label={`${project.name} — ${project.description}`}
      >
        {/* Image — natural height, no fixed aspect ratio */}
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--border-rule)' }}>
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.name} preview`}
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
    </>
  )
}

export function Projects() {
  return (
    <SectionShell id="projects" label="Projects">
      {/* Desktop: CSS columns masonry */}
      <div
        className="hidden md:block"
        style={{ columns: 2, columnGap: '16px' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {/* Mobile: single-column stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className="mt-8">
        <a
          href="https://github.com/sancho1952007"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-light transition-opacity duration-200 hover:opacity-60"
          style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}
        >
          View all on GitHub ↗
        </a>
      </div>
    </SectionShell>
  )
}

// ─── Contact ────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [formState, setFormState] = React.useState<FormState>('idle')
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('loading')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'c8c6b430-aff8-49ab-b354-920b54a50063',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFormState('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--row-hover)',
    border: '1px solid var(--border-rule)',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--foreground)',
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontFamily: 'var(--font-geist-pixel-square)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted-text)',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <SectionShell id="contact" label="Contact">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <div>
            <label htmlFor="contact-name" style={labelStyle}>Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              disabled={formState === 'loading' || formState === 'success'}
            />
          </div>

          <div>
            <label htmlFor="contact-email" style={labelStyle}>Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              disabled={formState === 'loading' || formState === 'success'}
            />
          </div>

          <div>
            <label htmlFor="contact-message" style={labelStyle}>Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              placeholder="What would you like to say?"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
              disabled={formState === 'loading' || formState === 'success'}
            />
          </div>

          {formState === 'success' && (
            <p style={{ fontSize: '14px', color: 'var(--accent)' }}>
              Message sent! I&apos;ll get back to you within 6-24 hours.
            </p>
          )}
          {formState === 'error' && (
            <p style={{ fontSize: '14px', color: '#e07070' }}>
              Something went wrong. Please try again or reach out using another source.
            </p>
          )}

          <button
            type="submit"
            disabled={formState === 'loading' || formState === 'success'}
            className="self-start font-light transition-opacity duration-200 hover:opacity-70 disabled:opacity-40"
            style={{
              fontSize: '14px',
              color: 'var(--background)',
              backgroundColor: 'var(--accent)',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 24px',
              cursor: formState === 'loading' || formState === 'success' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              minHeight: '44px',
            }}
          >
            {formState === 'loading' ? 'Sending…' : formState === 'success' ? 'Sent!' : 'Send Message'}
          </button>
        </form>

        {/* Social sidebar */}
        <div className="flex flex-col gap-6 lg:w-56 shrink-0">
          <div>
            <p style={{ ...labelStyle, marginBottom: '14px' }}>Or find me on</p>
            <ul className="flex flex-col gap-0" role="list">
              {[
                { label: 'GitHub', handle: '@sancho1952007', href: 'https://github.com/sancho1952007' },
                { label: 'Twitter', handle: '@sanchogodinho', href: 'https://x.com/sanchogodinho' },
                { label: 'Discord', handle: 'sanchogodinho', href: 'https://discord.com/users/1053386709737414739' },
                { label: 'Email', handle: 'sancho@sg-app.com', href: 'mailto:sancho@sg-app.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-1 py-2 font-light transition-opacity duration-200 hover:opacity-60"
                    style={{ fontSize: '15px', color: 'var(--foreground)', textDecoration: 'none', minHeight: '44px', fontFamily: 'var(--font-geist-pixel-square)' }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: 'var(--muted-text)', fontSize: '13px' }}>{link.handle}</span>
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: 'var(--accent)', fontSize: '13px' }}
                      aria-hidden="true"
                    >→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted-text)', lineHeight: 1.6, fontFamily: 'var(--font-geist-pixel-square)' }}>
            I typically respond within 6-24 hours. In rare cases there may be a small delay.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      className="px-6 md:px-12 lg:px-20 pb-12"
      aria-label="Footer"
    >
      <div className="max-w-5xl mx-auto w-full">
        <hr style={RULE_STYLE} />
        <p
          className="font-light"
          style={{ fontSize: '12px', color: 'var(--muted-text)' }}
        >
          &copy; Sancho Godinho · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
