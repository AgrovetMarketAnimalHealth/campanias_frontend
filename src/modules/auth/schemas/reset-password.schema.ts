import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(255),
  password_confirmation: z.string().min(8, 'Mínimo 8 caracteres').max(255),
  token: z.string().min(1, 'Token inválido')
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation']
})

export type TypeResetPasswordSchema = z.infer<typeof resetPasswordSchema>
