import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="relative bg-background">
        {/* Hero Section - Base Layer */}
        <div id="hero" className="sticky top-0 z-0">
          <Hero />
        </div>

        {/* Floating Stack Cards */}
        <div id="about" className="sticky top-0 z-10 min-h-screen bg-background rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t border-border/20">
          <About />
        </div>

        <div id="skills" className="sticky top-0 z-20 min-h-screen bg-background rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t border-border/20">
          <Skills />
        </div>

        <div id="projects" className="sticky top-0 z-30 min-h-screen bg-background rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t border-border/20">
          <Projects />
        </div>

        <div id="contact" className="sticky top-0 z-40 min-h-screen bg-background rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t border-border/20">
          <Contact />
        </div>
      </main>
    </div>
  )
}
