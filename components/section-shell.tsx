import type { CSSProperties, ReactNode } from 'react'

export const SECTION_LABEL_STYLE: CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--muted-text)',
  lineHeight: 1.4,
  paddingTop: '2px',
  fontFamily: 'var(--font-mono, monospace)',
}

export const RULE_STYLE: CSSProperties = {
  borderColor: 'var(--border-rule)',
  borderTopWidth: '1px',
  borderStyle: 'dashed',
  marginBottom: '48px',
}

export default function SectionShell({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
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
