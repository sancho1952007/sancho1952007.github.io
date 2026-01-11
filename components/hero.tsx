"use client"

import { Button } from "@/components/ui/button"
import { Github, Twitter, MessageCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
            <Image
              src="https://gravatar.com/avatar/42705d079b3abfd6235c083eba8d532dd7149add0c83d146f0bbed08417888ce?size=200"
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
            I love building things for the web and exploring the intersection of code and security.
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

          <div className="flex flex-col items-center gap-3 pt-6">
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/sancho1952007"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/sanchogodinho"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
              <a
                href="https://discord.com/users/1053386709737414739"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                aria-label="Discord"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Discord</span>
              </a>
            </div>

            <a
              href="https://postily.social/"
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 border transition-colors text-sm font-medium w-full max-w-[400px]"
              aria-label="Check out Postily"
            >
              <span>Check out Postily</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
