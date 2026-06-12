import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useUTMTracker } from '@/hooks/useUTMTracker'

export const Route = createRootRoute({
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