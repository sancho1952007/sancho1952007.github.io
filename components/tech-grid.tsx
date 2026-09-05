export default function TechGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] hidden md:flex justify-center overflow-hidden">
      {/* The main grid container, wider than the max-w-5xl content to provide spacing */}
      <div 
        className="relative w-full max-w-6xl h-full border-x border-dashed" 
        style={{ borderColor: 'var(--border-rule)' }}
      >
        
        {/* Horizontal line under navbar (navbar height is approx 100px) */}
        <div 
          className="absolute top-[100px] -left-[50vw] w-[200vw] border-t border-dashed" 
          style={{ borderColor: 'var(--border-rule)' }} 
        />

        {/* Diagonal stripes for the outer left margin */}
        <div 
          className="absolute top-[100px] -left-[50vw] bottom-0 w-[50vw]" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--border-rule) 10px, var(--border-rule) 11px)', 
            opacity: 0.2
          }} 
        />
        
        {/* Diagonal stripes for the outer right margin */}
        <div 
          className="absolute top-[100px] right-[-50vw] bottom-0 w-[50vw]" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--border-rule) 10px, var(--border-rule) 11px)', 
            opacity: 0.2
          }} 
        />

        {/* Intersections (Crosshairs) */}
        {/* Top-left */}
        <div 
          className="absolute top-[100px] left-0 -translate-x-1/2 -translate-y-1/2 text-[12px] opacity-70" 
          style={{ color: 'var(--muted-text)', fontFamily: 'var(--font-geist-mono)' }}
        >
          +
        </div>
        {/* Top-right */}
        <div 
          className="absolute top-[100px] right-0 translate-x-1/2 -translate-y-1/2 text-[12px] opacity-70" 
          style={{ color: 'var(--muted-text)', fontFamily: 'var(--font-geist-mono)' }}
        >
          +
        </div>

      </div>
    </div>
  )
}
