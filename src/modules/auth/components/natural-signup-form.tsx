// natural-signup-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useNavigate } from '@tanstack/react-router'
import { UTMLink as Link } from '@/components/UTMLink'
import { toast } from 'sonner'
import { DEPARTAMENTOS } from '../types/departamentos'
import { registerSchema, type TypeRegisterSchema } from '@/modules/auth/schemas/register.schema'
import { AuthService } from '@/modules/auth/services/auth.service'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

export function NaturalSignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TypeRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tipo_persona: 'natural',
      nombre: '',
      apellidos: '',
      dni: '',
      departamento: '',
      email: '',
      telefono: '',
      acepta_politicas: false,
      acepta_terminos: false,
    },
  })

  const aceptaTerminos = watch('acepta_terminos')

  async function onSubmit(values: TypeRegisterSchema) {
    const { success, message, errors: apiErrors, accion } = await AuthService.register(values)

    if (!success && apiErrors) {
      Object.entries(apiErrors).forEach(([key, value]) => {
        const msg = Array.isArray(value) ? value[0] : value
        setError(key as keyof TypeRegisterSchema, { message: msg as string })
      })
      return
    }

    if (!success) {
      toast.error(message)
      return
    }

    if (success && accion === 'verificar_email') {
      navigate({ to: '/email/resend', search: { email: values.email } })
      return
    }
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crear tu cuenta</h1>
          <p className="text-muted-foreground text-sm">Completa el formulario para registrarte</p>
        </div>

        {errors.root && (
          <p className="rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-2 text-center">
            {errors.root.message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="nombres" className="md:hidden">
              Nombres <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="nombres" type="text" placeholder="Nombres *" {...register('nombre')} />
            {errors.nombre && <p className="text-destructive text-xs">{errors.nombre.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="apellidos" className="md:hidden">
              Apellidos <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="apellidos" type="text" placeholder="Apellidos *" {...register('apellidos')} />
            {errors.apellidos && (
              <p className="text-destructive text-xs">
                {'apellidos' in errors ? errors.apellidos?.message : ''}
              </p>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="dni" className="md:hidden">
              DNI <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="dni" type="text" placeholder="DNI *" maxLength={8} {...register('dni')} />
            {errors.dni && (
              <p className="text-destructive text-xs">
                {'dni' in errors ? errors.dni?.message : ''}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="celular" className="md:hidden">
              Celular <span className="text-red-500">*</span>
            </FieldLabel>
            <Input id="celular" type="tel" placeholder="Celular *" {...register('telefono')} />
            {errors.telefono && <p className="text-destructive text-xs">{errors.telefono.message}</p>}
          </Field>
        </div>

        <Field>
          <FieldLabel className="md:hidden">
            Departamento <span className="text-red-500">*</span>
          </FieldLabel>
          <select
            onChange={(e) => setValue('departamento', e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue=""
          >
            <option value="" disabled>Departamento *</option>
            {DEPARTAMENTOS.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.departamento && (
            <p className="text-destructive text-xs">{errors.departamento.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="md:hidden">
            Correo electrónico <span className="text-red-500">*</span>
          </FieldLabel>
          <Input id="email" type="email" placeholder="Correo electrónico *" {...register('email')} />
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </Field>

        <Field>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terminos"
              checked={aceptaTerminos as boolean}
              onCheckedChange={(checked) => {
                setValue('acepta_terminos', checked === true)
                setValue('acepta_politicas', checked === true)
              }}
              className="mt-1"
            />
            <label htmlFor="terminos" className="text-sm leading-snug cursor-pointer">
              Acepto los{' '}
              <Link to="/portal/terminos-condiciones" className="underline underline-offset-4 hover:text-primary">
                Términos y Condiciones
              </Link>
              {' '}y la{' '}
              <Link to="/portal/politicas-de-privacidad" className="underline underline-offset-4 hover:text-primary">
                Política de Privacidad
              </Link>.
            </label>
          </div>
          {errors.acepta_terminos && (
            <p className="text-destructive text-xs">{errors.acepta_terminos.message as string}</p>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
        </Button>

        <FieldDescription className="text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/iniciar-sesion" className="font-semibold text-primary underline underline-offset-4 hover:opacity-80">
            Inicia sesión
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}