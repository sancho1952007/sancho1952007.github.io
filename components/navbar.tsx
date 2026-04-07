'use client'

import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Close drawer on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        drawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [drawerOpen])

  // Close drawer on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  function handleNavClick() {
    setDrawerOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20"
        style={{ paddingTop: '28px', paddingBottom: '28px' }}
      >
        <nav
          className="flex items-center justify-between max-w-5xl mx-auto"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="text-sm font-light tracking-widest transition-opacity duration-200 hover:opacity-60"
            style={{
              color: 'var(--foreground)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'var(--font-geist-pixel-square)',
            }}
            aria-label="Sancho Godinho — home"
          >
            SG
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light tracking-wide transition-opacity duration-200 hover:opacity-60"
                style={{
                  color: 'var(--muted-text)',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-geist-pixel-square)',
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              ref={hamburgerRef}
              onClick={() => setDrawerOpen((v) => !v)}
              className="flex flex-col justify-center items-center gap-[5px] transition-opacity duration-200 hover:opacity-60"
              style={{ minHeight: '44px', minWidth: '44px', color: 'var(--foreground)' }}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <span
                className="block h-px w-5 transition-transform duration-200"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: drawerOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-px w-5 transition-opacity duration-200"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: drawerOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-5 transition-transform duration-200"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: drawerOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col pt-24 px-8 pb-10 transition-transform duration-300"
        style={{
          width: '72vw',
          maxWidth: '320px',
          backgroundColor: 'var(--background)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          borderLeft: '1px solid var(--border-rule)',
        }}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-base font-light tracking-wide py-3 transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'var(--muted-text)', minHeight: '44px', display: 'flex', alignItems: 'center',fontFamily: 'var(--font-geist-pixel-square)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="transition-opacity duration-200 hover:opacity-60 flex items-center justify-center"
      style={{ color: 'var(--muted-text)', minHeight: '44px', minWidth: '44px' }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.93" y1="2.93" x2="4.34" y2="4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.66" y1="11.66" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.93" y1="13.07" x2="4.34" y2="11.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.66" y1="4.34" x2="13.07" y2="2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.5 9.5A6 6 0 1 1 6.5 2.5a4.5 4.5 0 0 0 7 7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
