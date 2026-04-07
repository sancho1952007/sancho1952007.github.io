export default function Hero() {
  return (
    <section
      className="flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-20"
      aria-label="Hero"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Layout: stacked on mobile (image top), side-by-side on large screens */}
        <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-8 lg:gap-12">

          {/* Avatar */}
          <div className="flex justify-start lg:justify-end shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pfp.png"
              alt="Pixel art portrait of Sancho Godinho"
              width={250}
              height={250}
              className=""
              style={{
                width: 'clamp(250px, 14vw, 180px)',
                height: 'clamp(250px, 14vw, 180px)',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <p className="italic text-muted-text hidden lg:block">Hi, I'm</p>
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

        </div>
      </div>
    </section>
  )
}
