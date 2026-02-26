import { redirect, Outlet } from '@tanstack/react-router'
import { PerfilService } from '@/modules/perfil/services/perfil.service'

export const Route = createFileRoute({
  component: Outlet,
  beforeLoad: async () => {
    try {
      const res = await PerfilService.getMe()
      if (!res.success) throw new Error()
      return { cliente: res.cliente }
    } catch {
      throw redirect({ to: '/iniciar-sesion' })
    }
  },
})