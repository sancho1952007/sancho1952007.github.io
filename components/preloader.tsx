'use client'

import { useState, useEffect } from 'react'

const languages = [
  { text: 'Hello 👋', time: 500 },
  { text: 'नमस्ते 👋', time: 200 },
  { text: 'नमस्कार 👋', time: 200 },
  { text: 'ನಮಸ್ಕಾರ 👋', time: 200 },
  { text: 'Hallo 👋', time: 200 },
  { text: 'Hola 👋', time: 200 },
  { text: 'Bonjour 👋', time: 200 },
]

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0
    let mounted = true

    const showNext = () => {
      if (!mounted) return
      if (currentIndex < languages.length - 1) {
        timeout = setTimeout(() => {
          currentIndex++
          setIndex(currentIndex)
          showNext()
        }, languages[currentIndex].time)
      } else {
        timeout = setTimeout(() => {
          setBurst(true)
          setTimeout(() => {
            if (mounted) onComplete()
          }, 500) // wait for burst animation
        }, languages[currentIndex].time)
      }
    }

    showNext()

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground transition-all duration-500 ease-in-out ${burst ? 'opacity-0 scale-[2] pointer-events-none' : 'opacity-100 scale-100'
        }`}
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {languages[index].text}
      </h1>
    </div>
  )
}
