import { PerfilService } from '../services/perfil.service'

export async function handleLogout(navigate: (opts: { to: string }) => void) {
  try {
    await PerfilService.logout()
  } finally {
    navigate({ to: '/iniciar-sesion' })
  }
}