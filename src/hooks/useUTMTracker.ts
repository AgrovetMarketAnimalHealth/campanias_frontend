import { useEffect, useRef } from 'react'
import { useRouter } from '@tanstack/react-router'
import ReactGA from 'react-ga4'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

type UTMKey = (typeof UTM_KEYS)[number]
export type UTMData = Partial<Record<UTMKey, string>>

const STORAGE_KEY = 'utm_data'
const INTERNAL_NAV_KEY = 'utm_internal_nav'

export function useUTMTracker() {
  const router = useRouter()
  const restored = useRef(false)

  useEffect(() => {
    if (restored.current) return
    restored.current = true

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

    const isInternalNav = sessionStorage.getItem(INTERNAL_NAV_KEY) === '1'

    if (hasUTM) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms))
      sessionStorage.removeItem(INTERNAL_NAV_KEY)

      // ✅ GA4 correcto
      ReactGA.event('utm_captured', {
        ...utms,
        page_location: window.location.href,
      })

      console.log('[UTM] Capturados:', utms)
      return
    }

    if (isInternalNav) {
      const stored = getStoredUTMs()

      if (Object.keys(stored).length > 0) {
        router.navigate({
          to: router.state.location.pathname,
          search: {
            ...(router.state.location.search as Record<string, string>),
            ...stored,
          },
          replace: true,
        })

        console.log('[UTM] Restaurados:', stored)
      }

      return
    }

    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(INTERNAL_NAV_KEY)
    console.log('[UTM] Sesión limpia')
  }, [router])
}

export function markInternalNav() {
  sessionStorage.setItem(INTERNAL_NAV_KEY, '1')
}

export function getStoredUTMs(): UTMData {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}