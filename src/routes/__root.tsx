// __root.tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useUTMTracker } from '@/hooks/useUTMTracker'
import { z } from 'zod'

const utmSchema = z.object({
  utm_source:   z.coerce.string().optional(),
  utm_medium:   z.coerce.string().optional(),
  utm_campaign: z.coerce.string().optional(),
  utm_id:       z.coerce.string().optional(),
  utm_term:     z.coerce.string().optional(),
  utm_content:  z.coerce.string().optional(),
  email:        z.coerce.string().optional(),
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