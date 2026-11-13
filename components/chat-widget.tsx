'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const WS_URL = 'wss://sancho-gpt-backend.sg-app.com/session'

type Role = 'user' | 'assistant'
type ChatMessage = { id: string; role: Role; content: string }
type Status = 'idle' | 'connecting' | 'open' | 'closed'

function trackEvent(name: string) {
  if (typeof window === 'undefined') return
  const umami = (window as Window & { umami?: { track: (event: string) => void } }).umami
  umami?.track(name)
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [awaiting, setAwaiting] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const idRef = useRef(0)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => () => { wsRef.current?.close() }, [])

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => inputRef.current?.focus(), 250)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, awaiting, open])

  useEffect(() => {
    if (status !== 'open') setAwaiting(false)
  }, [status])

  const connect = useCallback(() => {
    const existing = wsRef.current
    if (
      existing &&
      (existing.readyState === WebSocket.OPEN || existing.readyState === WebSocket.CONNECTING)
    ) {
      return
    }

    setStatus('connecting')
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => setStatus('open')
    ws.onerror = () => setStatus('closed')
    ws.onclose = () => {
      if (wsRef.current === ws) wsRef.current = null
      setStatus('closed')
    }
    ws.onmessage = async (event) => {
      try {
        let raw = event.data
        if (typeof raw !== 'string') {
          if (raw instanceof Blob) raw = await raw.text()
          else return
        }
        const data = JSON.parse(raw)
        if (data?.type !== 'chat' || data.content == null) return
        const content = (typeof data.content === 'string' ? data.content : JSON.stringify(data.content)).trim()
        if (!content) return
        setAwaiting(false)
        setMessages((prev) => [...prev, { id: `m${idRef.current++}`, role: 'assistant', content }])
      } catch { }
    }
  }, [])

  function handleOpen() {
    setOpen(true)
    connect()
    trackEvent('chat-opened')
  }

  function handleClose() {
    setOpen(false)
    trackEvent('chat-closed')
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    const ws = wsRef.current
    if (!text || !ws || ws.readyState !== WebSocket.OPEN) return
    ws.send(text)
    setMessages((prev) => [...prev, { id: `m${idRef.current++}`, role: 'user', content: text }])
    setInput('')
    setAwaiting(true)
    trackEvent('chat-message')
  }

  const statusLabel =
    status === 'open' ? 'Online' : status === 'connecting' ? 'Connecting…' : 'Offline'
  const statusColor = status === 'open' ? 'var(--accent)' : 'var(--muted-text)'

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-[60] flex h-15 w-36 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
            aria-label="Talk to me — open chat"
          >
            <span
              className="text-center"
              style={{
                fontFamily: 'var(--font-geist-pixel-square)',
                fontSize: '13px',
                lineHeight: 1.3,
              }}
            >
              Talk to me
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Chat with Sancho's AI"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-[60] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border shadow-2xl sm:bottom-6 sm:right-6 sm:h-[540px]"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border-rule)',
            }}
          >
            <div
              className="flex items-center justify-between gap-3 border-b px-4 py-1"
              style={{ borderColor: 'var(--border-rule)', borderStyle: 'dashed' }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-geist-pixel-square)',
                      fontSize: '13px',
                      letterSpacing: '0.04em',
                      color: 'var(--foreground)',
                    }}
                  >
                    Talk to Sancho (AI)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {status === 'closed' && (
                  <button
                    onClick={connect}
                    className="transition-opacity duration-200 hover:opacity-60"
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--accent)',
                      minHeight: '44px',
                      padding: '0 8px',
                    }}
                  >
                    Reconnect
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center transition-opacity duration-200 hover:opacity-60"
                  style={{ color: 'var(--muted-text)', minHeight: '44px', minWidth: '44px' }}
                  aria-label="Close chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                  <p
                    style={{
                      fontFamily: 'var(--font-geist-pixel-square)',
                      fontSize: '14px',
                      color: 'var(--foreground)',
                    }}
                  >
                    Ask me anything about Sancho.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--muted-text)', lineHeight: 1.5 }}>
                    Projects, skills, security research — I&apos;ll answer as him.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] break-words px-3 py-2 ${message.role === 'assistant' ? 'chat-markdown' : 'whitespace-pre-wrap'
                          }`}
                        style={
                          message.role === 'user'
                            ? {
                              backgroundColor: 'var(--accent)',
                              color: 'var(--background)',
                              borderRadius: '12px 12px 4px 12px',
                              fontFamily: 'var(--font-geist-pixel-square)',
                              fontSize: '13px',
                              lineHeight: 1.5,
                            }
                            : {
                              backgroundColor: 'var(--row-hover)',
                              color: 'var(--foreground)',
                              border: '1px solid var(--border-rule)',
                              borderRadius: '12px 12px 12px 4px',
                              fontFamily: 'var(--font-geist-pixel-square)',
                              fontSize: '13px',
                              lineHeight: 1.5,
                            }
                        }
                      >
                        {message.role === 'assistant' ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                  {awaiting && (
                    <div className="flex justify-start">
                      <div
                        className="flex items-center gap-1 rounded-xl px-3 py-2.5"
                        style={{
                          backgroundColor: 'var(--row-hover)',
                          border: '1px solid var(--border-rule)',
                        }}
                        aria-label="Sancho is typing"
                      >
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="h-1.5 w-1.5 animate-bounce rounded-full"
                            style={{
                              backgroundColor: 'var(--muted-text)',
                              animationDelay: `${i * 120}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t px-3 py-3"
              style={{ borderColor: 'var(--border-rule)', borderStyle: 'dashed' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status !== 'open'}
                placeholder={
                  status === 'open'
                    ? 'Ask me anything…'
                    : status === 'connecting'
                      ? 'Connecting…'
                      : 'Chat is offline'
                }
                className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none disabled:opacity-60"
                style={{
                  color: 'var(--foreground)',
                  border: '1px solid var(--border-rule)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-geist-pixel-square)',
                  fontSize: '13px',
                }}
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={status !== 'open' || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-opacity duration-200 hover:opacity-80 disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
