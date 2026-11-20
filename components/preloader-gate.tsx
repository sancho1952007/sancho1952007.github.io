'use client'

import { useCallback, useEffect, useState } from 'react'
import Preloader from './preloader'

export default function PreloaderGate({
  skipPreloader = false,
  initialProjectSlug,
}: {
  skipPreloader?: boolean
  initialProjectSlug?: string
}) {
  const [showPreloader, setShowPreloader] = useState(
    () => !skipPreloader && !initialProjectSlug,
  )

  useEffect(() => {
    if (skipPreloader || initialProjectSlug) return
    if (
      window.location.pathname.startsWith('/project/') ||
      new URLSearchParams(window.location.search).has('skip')
    ) {
      setShowPreloader(false)
    }
  }, [skipPreloader, initialProjectSlug])

  const handleComplete = useCallback(() => setShowPreloader(false), [])

  return showPreloader ? <Preloader onComplete={handleComplete} /> : null
}
