'use client'

import HCaptcha, { type HCaptchaProps } from '@hcaptcha/react-hcaptcha'
import type { RefObject } from 'react'

type CaptchaProps = HCaptchaProps & {
  captchaRef: RefObject<HCaptcha | null>
}

/**
 * Small wrapper so the hCaptcha library can be code-split behind a normal
 * prop-based ref (next/dynamic does not forward refs reliably).
 */
export default function Captcha({ captchaRef, ...props }: CaptchaProps) {
  return <HCaptcha ref={captchaRef} {...props} />
}
