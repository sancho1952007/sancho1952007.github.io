'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Stack, Projects, Connect, Footer } from '@/components/sections'

type Theme = 'dark' | 'light'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark')

  // Initialise from system preference on mount
  useEffect(() => {
    setTheme(getSystemTheme())
  }, [])

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
        <Connect />
      </main>
      <Footer />
    </div>
  )
}
