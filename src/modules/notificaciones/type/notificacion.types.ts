export type TipoNotificacion =
  | 'boleta_aceptada'
  | 'boleta_rechazada'
  | 'boleta_pendiente'
  | 'puntos_acreditados'
  | 'registro_cliente'
  | 'reenvio_verificacion'
  | string

export interface Notificacion {
  id: string
  tipo: TipoNotificacion
  tipo_texto: string
  asunto: string
  cuerpo: string
  leida: boolean
  leido_at: string | null
  enviado_at: string | null
  fecha_formateada: string | null
  boleta?: {
    id: string
    codigo: string
  } | null
}

export interface PaginationMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface TypeAPINotificaciones {
  success: boolean
  data: Notificacion[]
  meta: PaginationMeta
}

export interface TypeAPINotificacion {
  success: boolean
  data: Notificacion
}

export interface TypeAPIContador {
  success: boolean
  data: {
    no_leidas: number
  }
}

export interface TypeAPIMarcarLeida {
  success: boolean
  message: string
}

export type FiltroNotificacion = 'todas' | 'no_leidas'