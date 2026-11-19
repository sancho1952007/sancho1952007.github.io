'use client'

import { useCallback, useState } from 'react'
import Preloader from './preloader'

export default function PreloaderGate({
  skipPreloader = false,
  initialProjectSlug,
}: {
  skipPreloader?: boolean
  initialProjectSlug?: string
}) {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (skipPreloader || initialProjectSlug) return false
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/project/') || window.location.search.includes('skip'))) {
      return false
    }
    return true
  })

  const handleComplete = useCallback(() => setShowPreloader(false), [])

  return showPreloader ? <Preloader onComplete={handleComplete} /> : null
}
