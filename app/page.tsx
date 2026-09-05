'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Skills, Projects, Contact, Footer } from '@/components/sections'
import Preloader from '@/components/preloader'

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)

  return (
    <div style={{ minHeight: '100vh' }}>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
