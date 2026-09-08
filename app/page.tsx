'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Skills, Projects, Contact, Footer } from '@/components/sections'
import Preloader from '@/components/preloader'

export default function Home({
  skipPreloader = false,
  initialProjectSlug,
}: {
  skipPreloader?: boolean
  initialProjectSlug?: string
} = {}) {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (skipPreloader) return false
    if (initialProjectSlug) return false
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/project/')) {
      return false
    }
    return true
  })

  return (
    <div style={{ minHeight: '100vh' }}>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects initialProjectSlug={initialProjectSlug} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
