"use client"

import { Button } from "@/components/ui/button"
import { Github, Twitter, MessageCircle } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
            <Image
              src="https://www.gravatar.com/avatar/847f8b56766426779ae8864f47a29359?size=200"
              alt="Sancho Godinho"
              width={160}
              height={160}
              className="relative rounded-full border-4 border-background shadow-xl"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-balance">
                Sancho Godinho
              </h1>
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground text-balance font-light">
              Programmer · Security Researcher · Tech Enthusiast
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            I love building things for the web and exploring the intersection of code
            and security.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full"
            >
              See My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full hover:bg-secondary hover:text-secondary-foreground"
            >
              Let's Connect
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6">
            <a
              href="https://github.com/sancho1952007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/sanchogodinho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </a>
            <a
              href="https://discord.com/users/1053386709737414739"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
              aria-label="Discord"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
