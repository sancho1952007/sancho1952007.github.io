'use client'


import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Skills, Projects, Contact, Footer } from '@/components/sections'

export default function Home() {

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
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
