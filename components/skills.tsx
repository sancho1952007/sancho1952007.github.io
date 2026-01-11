import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skills = {
    expert: [
      { name: "Bun", level: "Pro" },
      { name: "Node.js", level: "Pro" },
      { name: "Socket.io", level: "Pro" },
      { name: "HTML", level: "Pro" },
      { name: "CSS", level: "Pro" },
      { name: "JavaScript", level: "Pro" },
    ],
    proficient: [
      { name: "React", level: "Good" },
      { name: "Expo", level: "Good" },
      { name: "Python", level: "Good" },
      { name: "Bash", level: "Good" },
    ],
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-balance">
              Technologies I work with
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold">Expert Level</h3>
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Pro
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.expert.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-5 py-3 bg-background rounded-full border-2 border-border hover:border-accent transition-colors text-sm font-medium"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold">Proficient</h3>
                <Badge variant="secondary">Good</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.proficient.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-5 py-3 bg-background rounded-full border-2 border-border hover:border-accent transition-colors text-sm font-medium"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <h3 className="text-xl font-semibold">Also experienced with</h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>RESTful API Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>WebSocket Communication</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Security Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Git & Version Control</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Responsive Web Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Performance Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
