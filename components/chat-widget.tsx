'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

// The chat panel pulls in the markdown renderer, GFM plugin, framer-motion and
// icons. Keep all of that out of the initial page bundle; it is only fetched
// when the visitor shows intent to chat.
const ChatPanel = dynamic(() => import('./chat-panel'), { ssr: false })

let panelPreloaded = false

function preloadPanel() {
  if (panelPreloaded) return
  panelPreloaded = true
  void import('./chat-panel')
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [inHero, setInHero] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = hero.getBoundingClientRect()
      // Only show the nudge while the hero fully fills the viewport, so it
      // disappears the moment any of the next section scrolls into view.
      const coversViewport =
        rect.top <= 4 && rect.bottom >= window.innerHeight - 4
      setInHero(coversViewport)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const handleOpen = useCallback(() => {
    preloadPanel()
    setLoaded(true)
    setOpen(true)
    trackEvent('chat-opened')
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    trackEvent('chat-closed')
  }, [])

  return (
    <>
      {/* Hand-drawn arrow pointing from the note to the chat button. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-21 right-[7.5rem] z-[59] select-none transition-opacity duration-500 ease-out sm:bottom-19 sm:right-[9.75rem] ${open || !inHero ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div className="flex items-start">
          <span
            className="whitespace-nowrap text-[16px] sm:text-[20px]"
            style={{
              fontFamily: 'var(--font-geist-pixel-square)',
              lineHeight: 1.4,
              color: '#fff',
            }}
          >
            Check this out
          </span>
          <svg
            width="80"
            height="43"
            viewBox="0 0 120 64"
            fill="none"
            className="mt-[4.5px] h-auto w-[80px] shrink-0 sm:mt-[5.5px] sm:w-[100px]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.25))' }}
          >
            <path
              d="M10.08 10.65L14.7 10.3L19.36 10.21L24.04 10.38L28.73 10.79L33.41 11.44L38.09 12.32L42.74 13.41L47.35 14.72L51.92 16.23L56.42 17.93L60.86 19.82L65.21 21.88L69.46 24.11L73.61 26.5L77.64 29.04L81.54 31.72L85.29 34.53L88.89 37.47L92.33 40.52L95.58 43.67L98.64 46.92L101.51 50.25L104.49 47.75L101.42 44.35L98.15 41.06L94.7 37.89L91.08 34.83L87.3 31.9L83.36 29.1L79.3 26.45L75.1 23.95L70.8 21.61L66.39 19.43L61.89 17.43L57.32 15.62L52.68 13.99L47.98 12.57L43.25 11.35L38.48 10.35L33.7 9.57L28.9 9.03L24.12 8.73L19.35 8.68L14.62 8.88L9.92 9.35Z"
              fill="#fff"
            />
            <path d="M111.36 58.95L97.93 52.6L107.43 44.63Z" fill="#fff" />
          </svg>
        </div>
      </div>

      <button
        onClick={handleOpen}
        onPointerEnter={preloadPanel}
        onFocus={preloadPanel}
        className={`fixed bottom-6 right-6 z-[60] flex h-15 w-36 items-center justify-center rounded-full shadow-lg transition-all duration-200 ${open
          ? 'pointer-events-none scale-90 opacity-0'
          : 'scale-100 opacity-100 hover:scale-105'
          }`}
        style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
        aria-label="Talk to me — open chat"
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <span
          className="text-center"
          style={{
            fontFamily: 'var(--font-geist-pixel-square)',
            fontSize: '13px',
            lineHeight: 1.3,
          }}
        >
          Talk to me (AI)
        </span>
      </button>

      {loaded && <ChatPanel open={open} onClose={handleClose} />}
    </>
  )
}
