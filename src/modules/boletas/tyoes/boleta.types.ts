export interface Boleta {
  id: string
  codigo: string
  archivo: string
  puntos_otorgados: number | null
  estado: 'pendiente' | 'aceptada' | 'rechazada'
  observacion: string | null
  created_at: string
  updated_at: string | null
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface TypeAPIBoletas {
  data: Boleta[]
  meta: PaginationMeta
}

export interface ResumenBoletas {
  puntos_acumulados: number
  total_boletas: number
  aceptadas: {
    cantidad: number
    porcentaje: number
  }
  pendientes: {
    cantidad: number
    porcentaje: number
  }
  rechazadas: {
    cantidad: number
    porcentaje: number
  }
}

export interface TypeAPIResumen {
  success: boolean
  data: ResumenBoletas
}