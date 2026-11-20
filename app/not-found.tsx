import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found | Sancho Godinho',
  // Keep this consistent with the noindex tag Next.js emits for 404 routes.
  // Clearing alternates stops the layout's homepage canonical being attached
  // to an error page.
  robots: {
    index: false,
    follow: true,
  },
  alternates: {},
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto w-full">
        <p
          className="font-mono"
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted-text)',
            marginBottom: '18px',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-geist-pixel-square)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.05,
            color: 'var(--foreground)',
            marginBottom: '18px',
          }}
        >
          Page not found
        </h1>
        <p
          className="font-light"
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--muted-text)',
            maxWidth: '52ch',
            marginBottom: '28px',
          }}
        >
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/"
            style={{ color: 'var(--accent)', fontSize: '14px' }}
          >
            Back to Sancho Godinho&apos;s portfolio →
          </Link>
          <Link
            href="/#projects"
            style={{ color: 'var(--accent)', fontSize: '14px' }}
          >
            Browse projects →
          </Link>
        </div>
      </div>
    </main>
  )
}
