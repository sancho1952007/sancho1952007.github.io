type EventData = Record<string, string | number | boolean>

type Umami = {
  track: (event: string, data?: EventData) => void
}

/** Fire-and-forget analytics that never breaks the UI or SSR. */
export function trackEvent(name: string, data?: EventData) {
  if (typeof window === 'undefined') return
  const umami = (window as Window & { umami?: Umami }).umami
  umami?.track(name, data)
}
