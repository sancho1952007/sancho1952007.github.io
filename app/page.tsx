import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import { About, Skills, WorkExperience, Footer } from '@/components/sections'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import PreloaderGate from '@/components/preloader-gate'
import ChatWidget from '@/components/chat-widget'
import { HOME_STRUCTURED_DATA } from '@/lib/seo'

export default function Home({
  skipPreloader = false,
  initialProjectSlug,
  structuredData = true,
}: {
  skipPreloader?: boolean
  initialProjectSlug?: string
  structuredData?: boolean
} = {}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: HOME_STRUCTURED_DATA }}
        />
      )}
      <PreloaderGate
        skipPreloader={skipPreloader}
        initialProjectSlug={initialProjectSlug}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <WorkExperience />
        <Projects initialProjectSlug={initialProjectSlug} />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
