import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Skills, Footer } from '@/components/sections'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import PreloaderGate from '@/components/preloader-gate'
import ChatWidget from '@/components/chat-widget'

export default function Home({
  skipPreloader = false,
  initialProjectSlug,
}: {
  skipPreloader?: boolean
  initialProjectSlug?: string
} = {}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <PreloaderGate
        skipPreloader={skipPreloader}
        initialProjectSlug={initialProjectSlug}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects initialProjectSlug={initialProjectSlug} />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
