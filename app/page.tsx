'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Stack, Projects, Contact, Footer } from '@/components/sections'

type Theme = 'dark' | 'light'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  // Read the class already stamped by the blocking inline script in layout.tsx
  // so React's initial state matches the DOM and avoids a second re-render flash.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getSystemTheme)

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  function handleThemeToggle() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Navbar theme={theme} onThemeToggle={handleThemeToggle} />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
