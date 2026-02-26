import { Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@/modules/auth/layouts/auth.layout'

export const Route = createLazyFileRoute({
  component: Layout,
})

function Layout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
