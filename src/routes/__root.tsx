import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { GA4_CONFIG } from '@/config/ga4'
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

function Root() {
  useUTMTracker()

  useEffect(() => {
    if (import.meta.env.PROD && GA4_CONFIG.isEnabled) {
      ReactGA.initialize(GA4_CONFIG.measurementId)

      console.log('✅ GA4 inicializado:', GA4_CONFIG.measurementId)
    } else {
      console.log(
        '🔧 GA4 no se inicializa en desarrollo (ID:',
        GA4_CONFIG.measurementId || 'no configurado',
        ')'
      )
    }
  }, [])

  return <Outlet />
}