'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
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
