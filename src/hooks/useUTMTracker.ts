import { useEffect } from 'react'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
type UTMKey = (typeof UTM_KEYS)[number]
export type UTMData = Partial<Record<UTMKey, string>>

const STORAGE_KEY = 'utm_data'

export function useUTMTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utms: UTMData = {}
    let hasUTM = false

    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) {
        utms[key] = value
        hasUTM = true
      }
    }

    if (!hasUTM) return

    // 1. Persistir en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(utms))

    // 2. Enviar a GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'utm_captured', {
        ...utms,
        page_location: window.location.href,
      })
    }

    console.log('[UTM] Capturados:', utms)
  }, [])
}

export function getStoredUTMs(): UTMData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}