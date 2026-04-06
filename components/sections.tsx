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
  return (
    <SectionShell id="about" label="About">
      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.8,
          color: 'var(--foreground)',
          maxWidth: '52ch',
        }}
      >
        I&apos;m a full-stack developer from Mumbai building Postily — a text-based social
        platform — with Bun, React, and MongoDB. I care about fast infrastructure, clean code,
        GDPR compliance, and occasionally breaking things in the name of security research.
      </p>
    </SectionShell>
  )
}

// ─── Stack ──────────────────────────────────────────────────────────────────

const STACK = [
  'Bun',
  'TypeScript',
  'React',
  'React Native',
  'MongoDB',
  'Docker',
  'Cloudflare',
  'Tailscale',
  'Bash',
]

export function Stack() {
  return (
    <SectionShell id="stack" label="Stack">
      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.8,
          color: 'var(--foreground)',
        }}
      >
        {STACK.map((item, i) => (
          <span key={item}>
            {item}
            {i < STACK.length - 1 && (
              <span style={{ color: 'var(--muted-text)', padding: '0 0.4em' }}>·</span>
            )}
          </span>
        ))}
      </p>
    </SectionShell>
  )
}

// ─── Projects ───────────────────────────────────────────────────────────────

interface Project {
  name: string
  description: string
  year: string
  url?: string
  placeholder?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'Postily',
    description: 'Text-based social media platform built with Bun + React + MongoDB',
    year: '2024',
    url: '#',
  },
  { name: 'Project Name', description: 'Description', year: 'Year', placeholder: true },
  { name: 'Project Name', description: 'Description', year: 'Year', placeholder: true },
  { name: 'Project Name', description: 'Description', year: 'Year', placeholder: true },
]

export function Projects() {
  return (
    <SectionShell id="projects" label="Projects">
      <ul className="w-full" role="list">
        {PROJECTS.map((project, i) => (
          <li key={i}>
            <a
              href={project.placeholder ? undefined : (project.url ?? '#')}
              role={project.placeholder ? 'presentation' : undefined}
              tabIndex={project.placeholder ? -1 : undefined}
              className="group flex items-baseline gap-4 py-4 transition-colors duration-150"
              style={{
                borderBottom: '1px solid var(--border-rule)',
                borderTop: i === 0 ? '1px solid var(--border-rule)' : undefined,
                cursor: project.placeholder ? 'default' : 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!project.placeholder)
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--row-hover)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = ''
              }}
              aria-label={project.placeholder ? undefined : `${project.name} — ${project.description}`}
            >
              {/* Name */}
              <span
                className="shrink-0 font-light"
                style={{
                  fontSize: '15px',
                  color: project.placeholder ? 'var(--muted-text)' : 'var(--foreground)',
                  width: '120px',
                  minWidth: '80px',
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
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

// ─── Connect ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Twitter / X', href: 'https://twitter.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
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
              className="group inline-flex items-center gap-2 py-2 font-light transition-opacity duration-200 hover:opacity-60"
              style={{
                fontSize: '16px',
                color: 'var(--foreground)',
                textDecoration: 'none',
                minHeight: '44px',
              }}
            >
              {link.label}
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
        Open to collaborations and freelance work.
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
          Sancho Godinho · 2025
        </p>
      </div>
    </footer>
  )
}
