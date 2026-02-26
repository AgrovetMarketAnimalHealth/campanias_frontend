import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    { message: 'Ingrese un correo electrónico válido' }
  ),
  password: z.string().min(1, 'Ingresa tu contraseña').max(255)
})

export type TypeLoginSchema = z.infer<typeof loginSchema>
