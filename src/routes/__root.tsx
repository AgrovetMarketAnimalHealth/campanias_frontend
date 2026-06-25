import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { GA4_CONFIG } from '@/config/ga4'
import { META_PIXEL_CONFIG } from '@/config/metaPixel'
import { z } from 'zod'
import { useUTMTracker } from '@/hooks/useUTMTracker'

const utmSchema = z.object({
  utm_source: z.coerce.string().optional(),
  utm_medium: z.coerce.string().optional(),
  utm_campaign: z.coerce.string().optional(),
  utm_id: z.coerce.string().optional(),
  utm_term: z.coerce.string().optional(),
  utm_content: z.coerce.string().optional(),
  email: z.coerce.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: utmSchema,
  component: Root,
})

declare global {
  interface Window {
    fbq: any
  }
}

function Root() {
  useUTMTracker()

  useEffect(() => {
    // Google Analytics
    if (import.meta.env.PROD && GA4_CONFIG.isEnabled) {
      ReactGA.initialize(GA4_CONFIG.measurementId)
    }

    // Meta Pixel
    if (import.meta.env.PROD && META_PIXEL_CONFIG.isEnabled) {
      // Load Facebook Pixel script
      ;(function (f: any, b: Document, e: string) {
        if (f.fbq) return

        f.fbq = function () {
          f.fbq.callMethod
            ? f.fbq.callMethod.apply(f.fbq, arguments)
            : f.fbq.queue.push(arguments)
        }

        if (!f._fbq) f._fbq = f.fbq

        f.fbq.push = f.fbq
        f.fbq.loaded = true
        f.fbq.version = '2.0'
        f.fbq.queue = []

        const t = b.createElement(e) as HTMLScriptElement
        t.async = true
        t.src = 'https://connect.facebook.net/en_US/fbevents.js'

        const s = b.getElementsByTagName(e)[0]
        s?.parentNode?.insertBefore(t, s)
      })(window, document, 'script')

      // Initialize and track
      window.fbq('init', META_PIXEL_CONFIG.pixelId)
      window.fbq('track', 'PageView')

      console.log('✅ Meta Pixel inicializado:', META_PIXEL_CONFIG.pixelId)
    }
  }, [])

  return <Outlet />
}