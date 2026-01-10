"use client"

import { useState, useEffect } from "react"
import { User, Code2, Briefcase, Mail } from "lucide-react"
import { LiquidGlass } from '@liquidglass/react';

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    )

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    const heroElement = document.getElementById("hero")
    if (heroElement) observer.observe(heroElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Code2 },
    { label: "Projects", id: "projects", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50"
      >
        <LiquidGlass
          borderRadius={150}
          blur={1}
          contrast={1.2}
          brightness={1.05}
          saturation={1.1}
        >
          <div className="flex items-center justify-between px-8 w-full py-2 bg-background/30 backdrop-blur-md border border-white/20 shadow-lg h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className={`text-xl font-mono font-bold transition-colors text-foreground`}
            >
              Sancho Godinho
            </button>

            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 duration-200 ${activeSection === link.id
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </LiquidGlass>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs">
        <LiquidGlass
          borderRadius={150}
          blur={1}
          contrast={1.2}
          brightness={1.05}
          saturation={1.1}
        >
          <div className="flex items-center justify-around w-full px-8 py-3 bg-background/30 backdrop-blur-md border border-white/20 shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`group rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive
                    ? "bg-foreground/10 text-foreground px-4 py-2"
                    : "text-muted-foreground hover:text-foreground p-2 hover:bg-foreground/5"
                    }`}
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? "max-w-[100px] opacity-100 ml-2" : "max-w-0 opacity-0"
                      }`}
                  >
                    <span className="text-xs font-medium">{link.label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </LiquidGlass>
      </nav>
    </>
  )
}
