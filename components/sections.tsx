const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: '11px',
  fontFamily: 'var(--font-mono, monospace)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--muted-text)',
  lineHeight: 1.4,
  paddingTop: '2px',
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
                style={{ fontSize: '15px', color: 'var(--foreground)', lineHeight: 1.6 }}
              >
                <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--muted-text)', lineHeight: 1.6 }}>
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

// ─── Stack ──────────────────────────────────────────────────────────────────

const STACK: { level: string; items: string[] }[] = [
  {
    level: 'Expert',
    items: ['Bun', 'Node.js', 'Socket.io', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    level: 'Proficient',
    items: ['React', 'Expo', 'Python', 'Bash'],
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

export function Stack() {
  return (
    <SectionShell id="stack" label="Stack">
      <div className="flex flex-col gap-8">
        {STACK.map((group) => (
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
  year: string
  url?: string
  previewUrl?: string
  placeholder?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'Postily',
    description: 'Next-gen social media platform (under development)',
    year: '2024',
    url: 'https://postily.app',
    previewUrl: 'https://postily.app',
  },
  {
    name: 'Smart Notes',
    description: 'Free cloud notepad with live-collaborative editing and rich text',
    year: '2023',
    url: 'https://sancho1952007.github.io/smart-notes/',
    previewUrl: 'https://sancho1952007.github.io/smart-notes/',
  },
  {
    name: 'SG Apps',
    description: 'App studio — building tools for everyone',
    year: '2023',
    url: 'https://sg-apps.netlify.app',
    previewUrl: 'https://sg-apps.netlify.app',
  },
  {
    name: 'Tiles Game',
    description: 'Simple and fun tile-based browser game',
    year: '2023',
    url: 'https://sancho1952007.github.io/tiles-game/',
    previewUrl: 'https://sancho1952007.github.io/tiles-game/',
  },
  {
    name: 'Encli',
    description: 'Free cross-platform file encryption / decryption CLI tool',
    year: '2022',
    url: 'https://github.com/sancho1952007/encli',
    previewUrl: 'https://github.com/sancho1952007/encli',
  },
  {
    name: 'Clokie',
    description: 'Customizable always-on-display clock app',
    year: '2022',
    url: 'https://github.com/sancho1952007/clokie',
    previewUrl: 'https://github.com/sancho1952007/clokie',
  },
  {
    name: 'AOS Web',
    description: 'OS-like system built entirely with web technology',
    year: '2022',
    url: 'https://sancho1952007.github.io/AOS-Web/',
    previewUrl: 'https://sancho1952007.github.io/AOS-Web/',
  },
  {
    name: 'Modern GUI',
    description: 'Beautiful Tkinter window replacement for Python apps',
    year: '2021',
    url: 'https://github.com/sancho1952007/Modern-GUI',
    previewUrl: 'https://github.com/sancho1952007/Modern-GUI',
  },
  {
    name: 'iPhone 11 Clone',
    description: 'iPhone 11 Pro replica in pure HTML & CSS — no images',
    year: '2021',
    url: 'https://sancho1952007.github.io/iPhone-11-Pro/',
    previewUrl: 'https://sancho1952007.github.io/iPhone-11-Pro/',
  },
]

function ProjectRow({ project, isFirst }: { project: Project; isFirst: boolean }) {
  const [hovered, setHovered] = React.useState(false)
  const [imgPos, setImgPos] = React.useState({ x: 0, y: 0 })
  const rowRef = React.useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect()
    if (!rect) return
    setImgPos({
      x: e.clientX - rect.left + 16,
      y: e.clientY - rect.top - 80,
    })
  }

  const previewSrc = project.previewUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(project.previewUrl)}&screenshot=true&meta=false&embed=screenshot.url`
    : null

  return (
    <li className="relative">
      <a
        ref={rowRef}
        href={project.placeholder ? undefined : (project.url ?? '#')}
        role={project.placeholder ? 'presentation' : undefined}
        tabIndex={project.placeholder ? -1 : undefined}
        target={project.placeholder ? undefined : '_blank'}
        rel={project.placeholder ? undefined : 'noopener noreferrer'}
        className="group flex items-baseline gap-4 py-4 transition-colors duration-150"
        style={{
          borderBottom: '1px solid var(--border-rule)',
          borderTop: isFirst ? '1px solid var(--border-rule)' : undefined,
          cursor: project.placeholder ? 'default' : 'pointer',
          textDecoration: 'none',
          backgroundColor: hovered && !project.placeholder ? 'var(--row-hover)' : '',
        }}
        onMouseEnter={() => !project.placeholder && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        aria-label={project.placeholder ? undefined : `${project.name} — ${project.description}`}
      >
        {/* Name */}
        <span
          className="shrink-0 font-light"
          style={{
            fontSize: '15px',
            color: project.placeholder ? 'var(--muted-text)' : 'var(--foreground)',
            width: '140px',
            minWidth: '100px',
          }}
        >
          {project.name}
        </span>

        {/* Description */}
        <span
          className="flex-1 font-light hidden sm:block"
          style={{ fontSize: '14px', color: 'var(--muted-text)' }}
        >
          {project.description}
        </span>

        {/* Year */}
        <span
          className="shrink-0 font-light"
          style={{
            fontSize: '13px',
            color: 'var(--muted-text)',
            fontVariantNumeric: 'tabular-nums',
            width: '40px',
            textAlign: 'right',
          }}
        >
          {project.year}
        </span>

        {/* Arrow */}
        {!project.placeholder && (
          <span
            className="shrink-0 ml-2 transition-opacity duration-150"
            style={{ fontSize: '14px', color: 'var(--accent)', opacity: 0.7 }}
            aria-hidden="true"
          >
            ↗
          </span>
        )}

        {/* Hover preview */}
        {hovered && previewSrc && (
          <span
            className="pointer-events-none absolute z-50 rounded overflow-hidden shadow-xl"
            style={{
              left: imgPos.x,
              top: imgPos.y,
              width: '260px',
              height: '160px',
              border: '1px solid var(--border-rule)',
              backgroundColor: 'var(--row-hover)',
              display: 'block',
            }}
            aria-hidden="true"
          >
            {/* Browser chrome bar */}
            <span
              className="flex items-center gap-1.5 px-3"
              style={{
                height: '28px',
                backgroundColor: 'var(--background)',
                borderBottom: '1px solid var(--border-rule)',
                display: 'flex',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-rule)', display: 'inline-block' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-rule)', display: 'inline-block' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-rule)', display: 'inline-block' }} />
              <span
                className="flex-1 ml-2 font-mono"
                style={{
                  fontSize: '10px',
                  color: 'var(--muted-text)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.url?.replace(/^https?:\/\//, '')}
              </span>
            </span>
            {/* Screenshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt={`Preview of ${project.name}`}
              style={{ width: '100%', height: '132px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          </span>
        )}
      </a>
    </li>
  )
}

export function Projects() {
  return (
    <SectionShell id="projects" label="Projects">
      <ul className="w-full" role="list">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.name} project={project} isFirst={i === 0} />
        ))}
      </ul>
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

// ─── Connect ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: '@sancho1952007', href: 'https://github.com/sancho1952007' },
  { label: 'Twitter', handle: '@sanchogodinho', href: 'https://twitter.com/sanchogodinho' },
  { label: 'Discord', handle: 'sanchogodinho', href: 'https://discord.com/users/sanchogodinho' },
]

export function Connect() {
  return (
    <SectionShell id="connect" label="Connect">
      <ul className="flex flex-col" role="list">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 py-2 font-light transition-opacity duration-200 hover:opacity-60"
              style={{
                fontSize: '16px',
                color: 'var(--foreground)',
                textDecoration: 'none',
                minHeight: '44px',
              }}
            >
              <span>{link.label}</span>
              <span style={{ color: 'var(--muted-text)', fontSize: '14px' }}>{link.handle}</span>
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: 'var(--accent)', fontSize: '14px' }}
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p
        className="mt-8 font-light"
        style={{ fontSize: '14px', color: 'var(--muted-text)' }}
      >
        I typically respond within 6–24 hours. Open to collaborations, open-source contributions, and new projects.
      </p>
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
          Sancho Godinho · 2026
        </p>
      </div>
    </footer>
  )
}
