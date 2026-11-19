import { BriefcaseBusiness } from 'lucide-react'
import SectionShell from './section-shell'

export default function WorkExperience() {
  return (
    <SectionShell id="experience" label="Experience">
      <div className="flex flex-col">
        {/* Section Heading & Subtitle */}
        <div className="mb-8 md:mb-10">
          <h2
            className="text-xl md:text-2xl font-normal tracking-tight mb-2"
            style={{
              fontFamily: 'var(--font-geist-pixel-square)',
              color: 'var(--foreground)',
              letterSpacing: '-0.01em',
            }}
          >
            Work Experience
          </h2>
          <p
            className="font-light"
            style={{
              fontSize: '15px',
              color: 'var(--muted-text)',
              lineHeight: 1.7,
              maxWidth: '56ch',
              fontFamily: 'var(--font-geist-pixel-square)',
            }}
          >
            A look at the teams I&apos;ve worked with, communities I&apos;ve built, and projects I&apos;ve contributed to.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="flex flex-col">
          {/* ─── Entry 1: Open to Work (Current Availability) ─── */}
          <div className="flex gap-3.5 sm:gap-4 md:gap-6">
            {/* Timeline node column */}
            <div className="flex flex-col items-center shrink-0 w-10 md:w-11">
              <div
                className="relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0 avatar-background"
                style={{
                  backgroundColor: 'var(--row-hover)',
                  border: '1px solid var(--border-rule)',
                  borderRadius: '50%',
                }}
              >
                <BriefcaseBusiness
                  className="w-4 h-4 md:w-5 md:h-5 text-white relative z-[2]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {/* Subtle availability indicator */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 z-[3]"
                  title="Currently available"
                  aria-label="Available for opportunities"
                >
                  <span
                    className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#22c55e' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-3 w-3 border-2"
                    style={{
                      backgroundColor: '#22c55e',
                      borderColor: 'var(--background)',
                    }}
                  />
                </span>
              </div>
              {/* Vertical line connecting to next entry */}
              <div
                className="w-px flex-1 my-2"
                style={{ borderLeft: '1px dashed var(--border-rule)' }}
                aria-hidden="true"
              />
            </div>

            {/* Content card */}
            <div className="flex-1 pb-8 md:pb-10 min-w-0">
              <div
                className="transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--row-hover)',
                  border: '1px solid rgba(127, 166, 136, 0.35)',
                  borderRadius: '8px',
                  padding: '18px 20px',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3
                      style={{
                        fontSize: '17px',
                        color: 'var(--foreground)',
                        fontFamily: 'var(--font-geist-pixel-square)',
                        fontWeight: 500,
                      }}
                    >
                      Open to Work
                    </h3>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        color: 'var(--accent)',
                        border: '1px solid rgba(127, 166, 136, 0.3)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#22c55e' }}
                        aria-hidden="true"
                      />
                      Available for Opportunities
                    </span>
                  </div>
                </div>

                {/* Secondary metadata */}
                <div
                  className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono mb-3"
                  style={{ color: 'var(--muted-text)' }}
                >
                  <span>November 2026 – Present</span>
                  <span aria-hidden="true">·</span>
                  <span>Mumbai (On-site) / Remote</span>
                </div>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-geist-pixel-square)',
                  }}
                >
                  Currently open to new opportunities, including on-site positions in Mumbai and remote roles. Interested in opportunities where I can contribute to software development, open-source projects, developer tooling, and technology-focused teams.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Entry 2: Dodo Payments (Previous Employment) ─── */}
          <div className="flex gap-3.5 sm:gap-4 md:gap-6">
            {/* Timeline node column */}
            <div className="flex flex-col items-center shrink-0 w-10 md:w-11">
              <div
                className="relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  backgroundColor: 'var(--row-hover)',
                  border: '1px solid var(--border-rule)',
                  borderRadius: '50%',
                }}
              >
                {/* eslint-disable-next-line @next/next/no- -element */}
                <img
                  src="/dodo-logo.webp"
                  alt="Dodo Payments logo"
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Content card */}
            <div className="flex-1 min-w-0">
              <div
                className="transition-colors duration-200"
                style={{
                  border: '1px solid var(--border-rule)',
                  borderRadius: '8px',
                  padding: '18px 20px',
                  backgroundColor: 'transparent',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3
                    style={{
                      fontSize: '17px',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-geist-pixel-square)',
                      fontWeight: 500,
                    }}
                  >
                    Community Manager &amp; OSS Developer
                  </h3>
                  <a
                    href="https://dodopayments.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
                    style={{
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-geist-pixel-square)',
                    }}
                  >
                    Dodo Payments
                    <span aria-hidden="true" style={{ fontSize: '11px' }}>↗</span>
                  </a>
                </div>

                {/* Secondary metadata */}
                <div
                  className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono mb-4"
                  style={{ color: 'var(--muted-text)' }}
                >
                  <span>October 2025 – October 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>Part-time</span>
                  <span aria-hidden="true">·</span>
                  <span>Remote</span>
                </div>

                {/* Introductory overview */}
                <p
                  className="mb-5"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-geist-pixel-square)',
                  }}
                >
                  Managed the Dodo Payments Discord community, overseeing community engagement, provided technical support, and moderation. Alongside community operations, served as a core maintainer across multiple open-source projects, contributing to their development, maintenance, and continuous improvement.
                </p>

                {/* Key Responsibilities & Contributions */}
                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--muted-text)',
                      marginBottom: '12px',
                    }}
                  >
                    Key Responsibilities &amp; Contributions
                  </p>
                  <ul className="flex flex-col gap-2.5" role="list">
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>Managed Discord community operations, including member engagement, support, and moderation.</span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>Served as a core maintainer for multiple open-source projects.</span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>
                        Authored the development of the{' '}
                        <a
                          href="https://github.com/dodopayments/dodopayments-cli"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
                          style={{ color: 'var(--accent)' }}
                        >
                          Dodo Payments CLI{' '}
                          <span aria-hidden="true" style={{ fontSize: '11px' }}>↗</span>
                        </a>{' '}.
                      </span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>
                        Built from scratch and maintained the{' '}
                        <a
                          href="https://github.com/dodopayments/dodo-discord-bot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
                          style={{ color: 'var(--accent)' }}
                        >
                          Discord bot{' '}
                          <span aria-hidden="true" style={{ fontSize: '11px' }}>↗</span>
                        </a>{' '}.
                      </span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>
                        Developed the{' '}
                        <a
                          href="https://github.com/dodopayments/dodo-migrate"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
                          style={{ color: 'var(--accent)' }}
                        >
                          Migration Tool{' '}
                          <span aria-hidden="true" style={{ fontSize: '11px' }}>↗</span>
                        </a>{' '}.
                      </span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>
                        Created and maintained the{' '}
                        <a
                          href="https://github.com/dodopayments/dodo-sync"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
                          style={{ color: 'var(--accent)' }}
                        >
                          Sync Engine{' '}
                          <span aria-hidden="true" style={{ fontSize: '11px' }}>↗</span>
                        </a>{' '}.
                      </span>
                    </li>
                    <li
                      className="flex items-start gap-3 font-light"
                      style={{
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-geist-pixel-square)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true">→</span>
                      <span>Collaborated with contributors, reviewed pull requests, and helped maintain code quality, reliability, and long-term maintainability.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
