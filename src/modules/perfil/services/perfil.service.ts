import type { TypeAPIMe } from "../tyoes/perfil.types"

const API_URL = import.meta.env.VITE_API_URL

export const PerfilService = {
  getMe: async (): Promise<TypeAPIMe> => {
    const res = await fetch(`${API_URL}/api/auth/portal/me`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    return res.json()
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_URL}/api/auth/portal/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    return res.json()
  },
}