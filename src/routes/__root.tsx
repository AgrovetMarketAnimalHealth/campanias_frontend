import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useUTMTracker } from '@/hooks/useUTMTracker'
import { z } from 'zod'

const utmSchema = z.object({
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_id:       z.string().optional(),
  utm_term:     z.string().optional(),
  utm_content:  z.string().optional(),
  // Agregamos email como parámetro opcional
  email:        z.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: utmSchema,
  component: Root,
})

function Root() {
  useUTMTracker()
  return (
    <>
      <Outlet />
    </>
  )
}