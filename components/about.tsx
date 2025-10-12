export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-balance">A bit about me</h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p className="text-pretty">
              I'm a developer who's passionate about making new projects and constantly learning. Whether it's building
              practical tools like QR code generators and cloud notepads, or creating fun experiments like a Flappy Bird
              rickroll game, I love bringing ideas to life through code.
            </p>
            <p className="text-pretty">
              My work spans across web development, cybersecurity research, and open-source contributions. I've built
              projects ranging from public chat applications to webhook handling libraries, always focusing on creating
              tools that are useful and accessible. I'm particularly interested in payment systems, developer tools, and
              making the web more secure.
            </p>
            <p className="text-pretty">
              I'm a strong believer in open source and community collaboration. You'll find me contributing to various
              projects on GitHub, from documentation to full-stack applications. I work primarily with TypeScript,
              JavaScript, and modern web frameworks, and I'm always exploring new technologies to expand my skill set.
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-xl font-semibold">What I'm focused on</h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Building practical developer tools and utilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Researching web security and vulnerabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Contributing to open-source projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Exploring payment systems and integrations</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold mb-2">Open Source Contributions</h3>
                <p className="text-muted-foreground text-sm">
                  Active contributor to various projects including Dodo Payments, Dokploy, Elysia.js, and more
                </p>
              </div>
              <a
                href="https://github.com/sancho1952007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-muted transition-colors rounded-full font-medium"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
