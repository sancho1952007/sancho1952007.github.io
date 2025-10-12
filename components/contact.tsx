"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Twitter, MessageCircle, Mail } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [showCredits, setShowCredits] = useState(false)

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/sancho1952007",
      handle: "@sancho1952007",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/sanchogodinho",
      handle: "@sanchogodinho",
    },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.com/users/1053386709737414739",
      handle: "sanchogodinho",
    },
  ]

  return (
    <section id="contact" className="md:py-0 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                  <input type="hidden" name="access_key" value="c8c6b430-aff8-49ab-b354-920b54a50063" />
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                  <CardDescription>Find me on these platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border-2 hover:border-primary transition-colors group"
                    >
                      <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">{link.name}</div>
                        <div className="text-sm text-muted-foreground">{link.handle}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2 bg-muted/30">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">Available via contact form</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I typically respond within 6-24 hours. In rare cases, there may be a small delay.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-6 pb-6 border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Sancho Godinho. All rights reserved.</p>
            {showCredits ? (
              <p>
                Built with Next.js & Tailwind CSS using{" "}
                <a
                  href="https://v0.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  v0
                </a>
              </p>
            ) : (
              <button
                onClick={() => setShowCredits(true)}
                className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                View Credits
              </button>
            )}
          </div>
        </div>
      </footer>
    </section>
  )
}
