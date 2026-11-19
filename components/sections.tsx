import SectionShell, { RULE_STYLE } from './section-shell'
export { default as WorkExperience } from './work-experience'

// ─── About ──────────────────────────────────────────────────────────────────

const FOCUSES = [
  'Exploring various systems and integrations',
  'Contributing to open-source projects',
  'Researching web security and vulnerabilities',
  'Building practical developer tools and utilities',
]

const VULNERABILITY_COMPANIES = [
  { name: 'Amazon', website: 'https://www.amazon.com/' },
  { name: 'LemonSqueezy', website: 'https://www.lemonsqueezy.com' },
  { name: 'Dodo Payments', website: 'https://dodopayments.com' },
  { name: 'Crazy Games', website: 'https://www.crazygames.com' },
  { name: 'Smash Karts', website: 'https://tall.team/games' },
  { name: 'Codesphere', website: 'https://codesphere.com/' },
]

export function About() {
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
          Whether it&apos;s building practical tools, or creating fun experiments, I love bringing ideas to life through code. My work spans across
          software development, security research, open-source contributions and DevOPS, always
          focusing on tools that are useful and accessible. I bring my cybersecurity expertise to my code building highly secure applications as well as deploying them securely.
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
            {FOCUSES.map((item) => (
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
            Found &amp; reported vulnerabilities in
          </p>
          <ul className="flex flex-col gap-2" role="list">
            {VULNERABILITY_COMPANIES.map((item) => (
              <li
                key={item.name}
                className="flex items-start gap-3 font-light"
                style={{ fontSize: '15px', color: 'var(--foreground)', lineHeight: 1.6, fontFamily: 'var(--font-geist-pixel-square)' }}
              >
                <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                <a rel="noopener noreferrer" href={item.website} target="_blank">
                  {item.name}
                </a>
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
    items: ['React', 'Expo', 'Python', 'Bash', 'MongoDB', 'Docker', 'UFW'],
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

// ─── Footer ─────────────────────────────────────────────────────────────────

const COPYRIGHT_YEAR = new Date().getFullYear()

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
          &copy; Sancho Godinho · {COPYRIGHT_YEAR}
        </p>
      </div>
    </footer>
  )
}
