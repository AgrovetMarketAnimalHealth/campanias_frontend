export type TipoPersona = "natural" | "juridica"

export interface Cliente {
  id: string
  tipo_persona: TipoPersona
  nombre: string
  apellidos?: string
  dni?: string
  ruc?: string
  departamento: string
  email: string
  telefono: string
  acepta_politicas: boolean
  acepta_terminos: boolean
  archivo_comprobante?: string
  estado: boolean
  email_verified_at?: string
  created_at?: string
  updated_at?: string
}

export interface TypeAPIAuth {
  success: boolean
  message: string
  accion?: "verificar_email"
  token?: string
  email_verified?: boolean
  cliente_id?: string
  cliente?: {
    id: string
    nombre: string
    email: string
  }
  status: number
  errors?: Record<string, string[]>
}

export interface TypeAPIRecoverPassword {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  status?: number
}

export interface TypeAPIRegister {
  success: boolean
  message: string
  accion?: "verificar_email"
  errors?: { [key: string]: string[] }
  status?: number
}

export interface TypeAPIReenviarVerificacion {
  success: boolean
  message: string
  status?: number
}
