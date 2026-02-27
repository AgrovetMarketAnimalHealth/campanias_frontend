import { z } from 'zod'

export const loginSchema = z.object({
  identificador: z
    .string()
    .min(1, 'Ingresa tu correo, DNI o número de celular')
    .max(255),
})

export type TypeLoginSchema = z.infer<typeof loginSchema>