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
          >
            <g fill="#fff">
              <path d="M10.18 11.49L13.53 11.25L16.9 11.14L20.29 11.17L23.68 11.32L27.08 11.59L30.49 11.99L33.89 12.49L37.29 13.11L40.68 13.83L44.06 14.65L47.43 15.58L50.78 16.61L54.1 17.74L57.39 18.97L60.65 20.3L63.86 21.72L67.03 23.24L70.15 24.86L73.2 26.56L76.19 28.36L79.11 30.25L81.95 32.22L84.71 34.27L87.38 36.4L89.95 38.59L92.43 40.86L94.8 43.18L97.07 45.56L99.23 47.98L101.27 50.45L104.73 47.55L102.46 45.07L100.09 42.64L97.62 40.27L95.06 37.96L92.41 35.71L89.68 33.52L86.87 31.4L83.99 29.34L81.04 27.34L78.03 25.42L74.95 23.56L71.82 21.78L68.63 20.09L65.39 18.48L62.1 16.95L58.77 15.53L55.39 14.2L51.98 12.99L48.53 11.88L45.05 10.9L41.54 10.04L38.02 9.31L34.48 8.71L30.94 8.25L27.39 7.93L23.85 7.76L20.31 7.72L16.79 7.84L13.3 8.1L9.82 8.51Z" />
              <circle cx="10" cy="10" r="1.55" />
              <path
                d="M103 49L111.36 58.95M108.8 38.1Q110.2 48.5 111.36 58.95Q102 55.9 93.15 51.96"
                fill="none"
                stroke="#fff"
                strokeWidth="4.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
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
