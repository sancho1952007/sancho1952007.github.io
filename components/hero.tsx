export default function Hero() {
  return (
    <section
      className="flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-20"
      aria-label="Hero"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h1
          className="font-serif italic text-balance leading-none mb-5"
          style={{
            fontSize: 'clamp(48px, 8vw, 80px)',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
          }}
        >
          Sancho Godinho
        </h1>

        <p
          className="font-sans font-light tracking-wide mb-10"
          style={{ fontSize: '15px', color: 'var(--muted-text)', letterSpacing: '0.02em' }}
        >
          Programmer&nbsp;&nbsp;·&nbsp;&nbsp;Security Researcher&nbsp;&nbsp;·&nbsp;&nbsp;Tech Enthusiast
        </p>

        <div className="flex items-center gap-8">
          <a
            href="#projects"
            className="text-sm font-light transition-opacity duration-200 hover:opacity-70"
            style={{ color: 'var(--accent)', fontSize: '14px', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            See My Work ↓
          </a>
          <a
            href="#connect"
            className="text-sm font-light transition-opacity duration-200 hover:opacity-70"
            style={{ color: 'var(--accent)', fontSize: '14px', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            {"Let's Connect →"}
          </a>
        </div>
      </div>
    </section>
  )
}
