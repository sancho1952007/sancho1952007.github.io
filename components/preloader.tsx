'use client'

import { useEffect, useRef, useState } from 'react'

const LANGUAGES = [
  { text: 'Hello 👋', time: 500 },
  { text: 'नमस्ते 👋', time: 250 },
  { text: 'नमस्कार 👋', time: 250 },
  { text: 'ನಮಸ್ಕಾರ 👋', time: 250 },
  { text: 'Hallo 👋', time: 250 },
  { text: 'Hola 👋', time: 250 },
  { text: 'Bonjour 👋', time: 250 },
]

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [burst, setBurst] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const showNext = (currentIndex: number) => {
      timer = setTimeout(() => {
        if (cancelled) return
        if (currentIndex < LANGUAGES.length - 1) {
          setIndex(currentIndex + 1)
          showNext(currentIndex + 1)
        } else {
          setBurst(true)
          timer = setTimeout(() => {
            if (!cancelled) onCompleteRef.current()
          }, 500) // wait for burst animation
        }
      }, LANGUAGES[currentIndex].time)
    }

    showNext(0)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className={`preloader fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground transition-all duration-500 ease-in-out motion-reduce:hidden ${
        burst ? 'opacity-0 scale-[2] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex items-center justify-center h-full w-full overflow-hidden" style={{ perspective: '800px' }}>
        {LANGUAGES.map((lang, idx) => {
          const offset = idx - index
          const absOffset = Math.abs(offset)

          return (
            <h1
              key={lang.text}
              className="absolute text-5xl md:text-7xl font-bold tracking-tight transition-all duration-300 ease-in-out origin-center"
              style={{
                transform: `translateY(${offset * 150}%) translateZ(${-absOffset * 50}px) rotateX(${offset * 20}deg) scale(${Math.max(0.2, 1 - absOffset * 0.25)})`,
                opacity: absOffset === 0 ? 1 : absOffset === 1 ? 0.4 : absOffset === 2 ? 0.15 : absOffset === 3 ? 0.05 : 0,
                visibility: absOffset > 4 ? 'hidden' : 'visible'
              }}
            >
              {lang.text}
            </h1>
          )
        })}
      </div>
    </div>
  )
}
