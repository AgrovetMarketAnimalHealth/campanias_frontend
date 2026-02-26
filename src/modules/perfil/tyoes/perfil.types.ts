export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  tipo_persona: string
  estado: string
}

export interface TypeAPIMe {
  success: boolean
  cliente: Cliente
}