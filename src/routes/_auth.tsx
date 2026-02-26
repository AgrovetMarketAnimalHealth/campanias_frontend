import { Outlet, redirect } from '@tanstack/react-router'
import { parseCookies } from 'nookies'

export const Route = createFileRoute({
  component: () => <Outlet />,
  async beforeLoad() {
    const { Authorization } = parseCookies()

    if (Authorization) {
      throw redirect({
        to: '/portal/dashboard'
      })
    }
  }
})
