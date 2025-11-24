import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      image: "https://wsrv.nl/?url=https://postily.sg-app.com/og-image.png?maxage=15d",
      name: "Postily",
      desc: "The Next Gen Social Media Site (Under Development)",
      url: "https://postily.social",
    },
    {
      image: "https://i.ibb.co/307TKL1/Screenshot-2024-06-06-163943.png",
      name: "Smart Notes",
      desc: "Smart Notes is a free cloud-based notepad with advanced functionalities like live-collaborative editing, rich text support & much more!",
      url: "https://smart-notes.sg-app.com",
    },
    {
      image: "https://i.ibb.co/6gp6Sqt/Smart-Select-20240219-211006-Chrome.jpg",
      name: "SG Apps",
      desc: "At SG Apps, We Aim To Build Apps For The Best!",
      url: "https://sg-app.com",
    },
    {
      image: "https://i.ibb.co/GW0J8P5/Screenshot-2024-06-06-164126.png",
      name: "Tiles Game",
      desc: "A simple yet fun game to play in your free time!",
      url: "https://sg-app.com/Tiles-Game/",
    },
    {
      image: "https://i.ibb.co/rb53gx6/encli.png",
      name: "Encli",
      desc: "A free cross platform file encryption/decryption tool!",
      url: "https://github.com/sancho1952007/Encli",
    },
    {
      image: "https://i.ibb.co/DzWMry8/Capture.png",
      name: "Clokie",
      desc: "An amazing customizable clock to be kept on display!",
      url: "https://sancho1952007.github.io/Clokie/",
    },
    {
      image: "https://i.ibb.co/1G4Qwpp/AOS-Web.png",
      name: "AOS Web",
      desc: "An OS like system made only with web technology!",
      url: "https://sancho1952007.github.io/AOS-Web/",
    },
    {
      image: "https://i.ibb.co/DzWMry8/Capture.png",
      name: "Modern GUI",
      desc: "A beautiful window replacement for Tkinter (Python) Apps to replace the boring window frames of operating systems!",
      url: "https://github.com/sancho1952007/Modern-GUI-v3.0",
    },
    {
      image: "https://i.ibb.co/fxRWxzq/i-Phone-Preview.png",
      name: "iPhone 11 Clone",
      desc: "An iPhone 11 Pro Only Made Using HTML & CSS without any images!",
      url: "https://sancho1952007.github.io/iPhone-11-Clone/",
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-balance">Things I've built</h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl text-pretty">
              Here are some projects I've worked on recently. Each one taught me something new.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                className="group block space-y-3 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors flex items-center gap-2">
                    {project.name}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{project.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">Want to see more?</p>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full bg-accent hover:bg-accent/80 text-white hover:text-white"
            >
              <a href="https://github.com/sancho1952007" target="_blank">
                <Github className="h-5 w-5 mr-2" />
                Check out my GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
