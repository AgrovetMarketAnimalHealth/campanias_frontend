import type {
  TypeAPINotificaciones,
  TypeAPINotificacion,
  TypeAPIContador,
  TypeAPIMarcarLeida,
  FiltroNotificacion,
} from '../types/notificacion.types'

const API_URL = import.meta.env.VITE_API_URL

export class NotificacionService {
  static async getAll(params?: {
    filtro?: FiltroNotificacion
    per_page?: number
    page?: number
    search?: string
  }): Promise<TypeAPINotificaciones> {
    const query = new URLSearchParams()
    if (params?.filtro)    query.set('filtro', params.filtro)
    if (params?.per_page)  query.set('per_page', String(params.per_page))
    if (params?.page)      query.set('page', String(params.page))
    if (params?.search)    query.set('search', params.search)

    const response = await fetch(
      `${API_URL}/api/auth/portal/notificaciones?${query.toString()}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      },
    )
    return response.json()
  }

  static async getById(id: string): Promise<TypeAPINotificacion> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/notificaciones/${id}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      },
    )
    return response.json()
  }

  static async marcarLeida(id: string): Promise<TypeAPIMarcarLeida> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/notificaciones/${id}/marcar-leida`,
      {
        method: 'PATCH',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      },
    )
    return response.json()
  }

  static async getContadorNoLeidas(): Promise<TypeAPIContador> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/notificaciones/contador-no-leidas`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      },
    )
    return response.json()
  }
}