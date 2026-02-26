import type { TypeAPIResumen, TypeAPIBoletas, Boleta } from "../tyoes/boleta.types"

const API_URL = import.meta.env.VITE_API_URL

export const BoletaService = {
  getResumen: async (): Promise<TypeAPIResumen> => {
    const res = await fetch(`${API_URL}/api/auth/portal/boletas/resumen`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    return res.json()
  },

  getAll: async (page = 1, estado?: string): Promise<TypeAPIBoletas> => {
    const params = new URLSearchParams({ page: String(page) })
    if (estado && estado !== 'todos') params.append('estado', estado)
    const res = await fetch(`${API_URL}/api/auth/portal/boletas?${params}`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    return res.json()
  },

  getOne: async (id: string): Promise<{ success: boolean; data: Boleta }> => {
    const res = await fetch(`${API_URL}/api/auth/portal/boletas/${id}`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    return res.json()
  },

  store: async (archivo: File): Promise<{ success: boolean; message: string; data: Boleta }> => {
    const formData = new FormData()
    formData.append('archivo', archivo)
    const res = await fetch(`${API_URL}/api/auth/portal/boletas`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
      body: formData,
    })
    return res.json()
  },
}