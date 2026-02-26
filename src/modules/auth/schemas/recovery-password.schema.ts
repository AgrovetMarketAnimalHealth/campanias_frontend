import { z } from 'zod'

export const recoverPasswordSchema = z.object({
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' })
})

export type TypeRecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>
