import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from '@tanstack/react-router'
import { UTMLink as Link } from '@/components/UTMLink'
import { toast } from 'sonner'
import { loginSchema, type TypeLoginSchema } from '@/modules/auth/schemas/login.schema'
import { AuthService } from '@/modules/auth/services/auth.service'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

export function SigninForm({ className, ...props }: React.ComponentProps<'form'>) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identificador: '',
    },
  })

  async function onSubmit(values: TypeLoginSchema) {
    const { success, message, accion } = await AuthService.login(values)

    if (!success && accion === 'verificar_email') {
      toast.warning('Debes verificar tu correo antes de ingresar.')
      navigate({ to: '/email/resend', search: { email: values.identificador } })
      return
    }

    if (!success) {
      toast.error(message)
      return
    }

    navigate({ to: '/portal/dashboard' })
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm">
            Ingresa con tu correo, DNI o número de celular
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="identificador">Correo, DNI o Celular</FieldLabel>
          <Input
            id="identificador"
            type="text"
            placeholder="m@ejemplo.com · 12345678 · 987654321"
            autoComplete="username"
            {...register('identificador')}
          />
          {errors.identificador && (
            <p className="text-destructive text-xs">{errors.identificador.message}</p>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>

        <FieldDescription className="text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/registrarme" className="underline underline-offset-4 hover:text-primary">
            Regístrate
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}