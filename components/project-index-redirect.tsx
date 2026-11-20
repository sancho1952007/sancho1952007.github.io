'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Keeps the existing client-side redirect behaviour while allowing the
 * /project route to be rendered by a server component with its own metadata.
 */
export default function ProjectIndexRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/#projects')
  }, [router])

  return null
}
