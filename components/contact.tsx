'use client'

import type HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect, useRef, useState } from 'react'
import SectionShell, { SECTION_LABEL_STYLE } from './section-shell'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type CaptchaComponent = React.ComponentType<{
  captchaRef: React.RefObject<HCaptcha | null>
  sitekey: string
  size: 'invisible'
  reCaptchaCompat: boolean
  onVerify: (token: string) => void
  onError: () => void
  onExpire: () => void
}>

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: '(@sancho1952007)', href: 'https://github.com/sancho1952007' },
  { label: 'Discord', handle: '(sanchogodinho)', href: 'https://discord.com/users/1053386709737414739' },
  { label: 'LinkedIn', handle: '(sancho-godinho)', href: 'https://www.linkedin.com/in/sancho-godinho/' },
  { label: 'Sololearn', handle: '(Sancho Godinho)', href: 'https://www.sololearn.com/profile/19684449' },
  { label: 'HackerOne', handle: '(sancho-godinho)', href: 'https://hackerone.com/sancho-godinho?type=user' },
  { label: 'Email', handle: '(sancho@sg-app.com)', href: 'mailto:sancho@sg-app.com' },
]

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--row-hover)',
  border: '1px solid var(--border-rule)',
  borderRadius: '6px',
  padding: '10px 14px',
  fontSize: '14px',
  color: 'var(--foreground)',
  outline: 'none',
  fontFamily: 'inherit',
  lineHeight: 1.6,
}

const TEXTAREA_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  resize: 'vertical',
  minHeight: '120px',
}

const LABEL_STYLE: React.CSSProperties = {
  ...SECTION_LABEL_STYLE,
  fontFamily: 'var(--font-geist-pixel-square)',
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: '6px',
  paddingTop: 0,
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [CaptchaComponent, setCaptchaComponent] = useState<CaptchaComponent | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const pendingExecute = useRef(false)
  const captchaLoading = useRef(false)

  const isBusy = formState === 'loading' || formState === 'success'

  // Load the third-party hCaptcha code only once the visitor interacts with
  // the form or submits it. Passive visitors never download it.
  const mountCaptcha = () => {
    if (CaptchaComponent || captchaLoading.current) return
    captchaLoading.current = true
    void import('./captcha')
      .then((module) => setCaptchaComponent(() => module.default))
      .catch(() => {
        captchaLoading.current = false
        if (pendingExecute.current) {
          pendingExecute.current = false
          setFormState('error')
        }
      })
  }

  // Step 1: intercept submit and trigger invisible hCaptcha
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isBusy) return
    if (!CaptchaComponent || !captchaRef.current) {
      pendingExecute.current = true
      mountCaptcha()
      return
    }
    captchaRef.current.execute()
  }

  // If submit happened before the captcha module mounted, execute as soon as
  // it is available. The component itself queues execute() until ready.
  useEffect(() => {
    if (CaptchaComponent && pendingExecute.current) {
      pendingExecute.current = false
      captchaRef.current?.execute()
    }
  }, [CaptchaComponent])

  // Step 2: hCaptcha verified — submit to Web3Forms with the captcha token
  const handleVerify = async (token: string) => {
    const form = formRef.current
    if (!form) {
      setFormState('error')
      return
    }

    setFormState('loading')
    try {
      const fd = new FormData(form)
      fd.delete('h-captcha-response')
      fd.append('h-captcha-response', token)

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })
      const json = await res.json().catch(() => null)
      if (res.ok && json?.success) {
        setFormState('success')
        form.reset()
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    } finally {
      captchaRef.current?.resetCaptcha()
    }
  }

  const handleCaptchaError = (event: string) => {
    console.error('[captcha] error', event)
    setFormState('error')
    captchaRef.current?.resetCaptcha()
  }

  const handleCaptchaExpire = () => {
    captchaRef.current?.resetCaptcha()
  }

  return (
    <SectionShell id="contact" label="Contact">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onFocusCapture={mountCaptcha}
          className="flex flex-col gap-5 flex-1"
        >
          {/* Web3Forms access key — required for FormData submission */}
          <input type="hidden" name="access_key" value="c8c6b430-aff8-49ab-b354-920b54a50063" />

          <div>
            <label htmlFor="contact-name" style={LABEL_STYLE}>Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              style={INPUT_STYLE}
              disabled={isBusy}
            />
          </div>

          <div>
            <label htmlFor="contact-email" style={LABEL_STYLE}>Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              style={INPUT_STYLE}
              disabled={isBusy}
            />
          </div>

          <div>
            <label htmlFor="contact-message" style={LABEL_STYLE}>Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              placeholder="What would you like to say?"
              rows={5}
              style={TEXTAREA_STYLE}
              disabled={isBusy}
            />
          </div>

          {formState === 'success' && (
            <p style={{ fontSize: '14px', color: 'var(--accent)' }}>
              Message sent, I&apos;ll get back to you soon!
            </p>
          )}
          {formState === 'error' && (
            <p style={{ fontSize: '14px', color: '#e07070' }}>
              Something went wrong. Please try again or reach out using another source.
            </p>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="self-start font-light transition-opacity duration-200 hover:opacity-70 disabled:opacity-40"
            style={{
              fontSize: '14px',
              color: 'var(--background)',
              backgroundColor: 'var(--accent)',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 24px',
              cursor: isBusy ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              minHeight: '44px',
            }}
          >
            {formState === 'loading' ? 'Sending…' : formState === 'success' ? 'Sent!' : 'Send Message'}
          </button>

          {/* Invisible hCaptcha — mounted on first interaction */}
          {CaptchaComponent && (
            <CaptchaComponent
              captchaRef={captchaRef}
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              size="invisible"
              reCaptchaCompat={false}
              onVerify={handleVerify}
              onError={handleCaptchaError}
              onExpire={handleCaptchaExpire}
            />
          )}
        </form>

        {/* Social sidebar */}
        <div className="flex flex-col gap-6 lg:w-56 shrink-0">
          <div>
            <p style={{ ...LABEL_STYLE, marginBottom: '14px' }}>Or find me on</p>
            <ul className="flex flex-col gap-0" role="list">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-1 py-0 font-light transition-opacity duration-200 hover:opacity-60"
                    style={{ fontSize: '15px', color: 'var(--foreground)', textDecoration: 'none', minHeight: '30px', fontFamily: 'var(--font-geist-pixel-square)' }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: 'var(--muted-text)', fontSize: '13px' }}>{link.handle}</span>
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: 'var(--accent)', fontSize: '13px' }}
                      aria-hidden="true"
                    >→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted-text)', lineHeight: 1.6, fontFamily: 'var(--font-geist-pixel-square)' }}>
            I typically respond within 24 hours.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
