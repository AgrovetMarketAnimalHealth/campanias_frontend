import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Form } from '@/components/ui/form'
import { Card, CardTitle } from '@/components/ui/card'
import { RHFTextfield } from '@/modules/core/components/hook-form/rhf-textfield'
import { RHFPasswordField } from '@/modules/core/components/hook-form/rhf-passwordfield'
import { RHFSubmitButton } from '@/modules/core/components/hook-form/rhf-submit-button'
import { setRHFError } from '@/modules/core/components/hook-form/set-error'
import { type TypeResetPasswordSchema, resetPasswordSchema } from '../schemas/reset-password.schema'
import { AuthService } from '../services/auth.service'
import { toast } from 'sonner'

export function ResetPasswordCard() {
  const search = useSearch({ strict: false }) as { email?: string; token?: string }
  const navigate = useNavigate()

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: search.email || '',
      password: '',
      password_confirmation: '',
      token: search.token || ''
    }
  })

  if (!search.email || !search.token) {
    return (
      <div className="max-w-[508px] mx-auto my-14 text-center">
        <p className="text-muted-foreground">No se encontraron los recursos necesarios.</p>
      </div>
    )
  }

  async function onSubmit(values: TypeResetPasswordSchema) {
    const { success, message, errors } = await AuthService.resetPassword(values)
    if (!success && errors) return setRHFError(form, errors as Record<string, string[]>)
    if (!success) return toast.error(message)
    toast.success(message)
    navigate({ to: '/iniciar-sesion' })
  }

  return (
    <Card className="max-w-[508px] mx-auto my-14 p-4 md:p-8">
      <CardTitle className="mb-4">Nueva contraseña</CardTitle>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <RHFTextfield name="email" label="Correo electrónico" />
          <RHFPasswordField name="password" label="Contraseña" />
          <RHFPasswordField name="password_confirmation" label="Confirmar contraseña" />
          <RHFSubmitButton label="Guardar contraseña" className="w-full" />
        </form>
      </Form>
    </Card>
  )
}
