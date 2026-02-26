import { lazy } from 'react'

const AuthenticatedLayout = lazy(() => import('@/layouts/authenticated.layout'))

export const Route = createFileRoute({
  component: AuthenticatedLayout
})
