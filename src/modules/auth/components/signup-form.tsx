// signup-form.tsx
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
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'

type TipoPersona = 'natural' | 'juridica'

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
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
      ruc: '',
      departamento: '',
      email: '',
      telefono: '',
      acepta_politicas: false,
      acepta_terminos: false,
    },
  })

  const aceptaTerminos = watch('acepta_terminos')
  const tipoPersona = watch('tipo_persona') as TipoPersona

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
  <form className={cn('flex flex-col gap-2', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
    <FieldGroup className="gap-2">
      {/* Título */}
      <div className="flex flex-col items-center gap-0.5 text-center mb-0.5">
        <h1 className="text-lg font-bold">Crear tu cuenta</h1>
        <p className="text-muted-foreground text-[11px]">
          Completa el formulario para participar y ganar entradas
        </p>
      </div>

      {errors.root && (
        <p className="rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-[11px] text-center">
          {errors.root.message}
        </p>
      )}

      {/* Tipo de documento + Número */}
      <div className="grid grid-cols-2 gap-2">
        <Field>
          <select
            value={tipoPersona}
            onChange={(e) => setValue('tipo_persona', e.target.value as TipoPersona)}
            className="w-full h-8 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="natural">DNI</option>
            <option value="juridica">RUC</option>
          </select>
        </Field>

        <Field>
          {tipoPersona === 'natural' ? (
            <Input
              id="documento"
              type="text"
              placeholder="Número de documento"
              maxLength={8}
              className="h-8 text-xs px-2"
              {...register('dni')}
            />
          ) : (
            <Input
              id="documento"
              type="text"
              placeholder="Número de documento"
              maxLength={11}
              className="h-8 text-xs px-2"
              {...register('ruc')}
            />
          )}
          {errors.dni && tipoPersona === 'natural' && (
            <p className="text-destructive text-[11px]">{errors.dni.message}</p>
          )}
          {errors.ruc && tipoPersona === 'juridica' && (
            <p className="text-destructive text-[11px]">{errors.ruc.message}</p>
          )}
        </Field>
      </div>

      {/* Nombre + Apellidos */}
      <div className="grid grid-cols-2 gap-2">
        <Field>
          <Input className="h-8 text-xs px-2" placeholder="Nombres" {...register('nombre')} />
          {errors.nombre && <p className="text-destructive text-[11px]">{errors.nombre.message}</p>}
        </Field>
        <Field>
          <Input className="h-8 text-xs px-2" placeholder="Apellidos" {...register('apellidos')} />
          {errors.apellidos && (
            <p className="text-destructive text-[11px]">{errors.apellidos?.message}</p>
          )}
        </Field>
      </div>

      {/* Celular + Email */}
      <div className="grid grid-cols-2 gap-2">
        <Field>
          <Input className="h-8 text-xs px-2" type="tel" placeholder="Celular" {...register('telefono')} />
          {errors.telefono && <p className="text-destructive text-[11px]">{errors.telefono.message}</p>}
        </Field>
        <Field>
          <Input className="h-8 text-xs px-2" type="email" placeholder="Correo electrónico" {...register('email')} />
          {errors.email && <p className="text-destructive text-[11px]">{errors.email.message}</p>}
        </Field>
      </div>

      {/* Departamento */}
      <Field>
        <select
          onChange={(e) => setValue('departamento', e.target.value)}
          defaultValue=""
          className="w-full h-8 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>Departamento *</option>
          {DEPARTAMENTOS.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.departamento && (
          <p className="text-destructive text-[11px]">{errors.departamento.message}</p>
        )}
      </Field>

      {/* Términos */}
      <Field>
        <div className="flex items-start gap-1.5">
          <Checkbox
            id="terminos"
            checked={aceptaTerminos as boolean}
            onCheckedChange={(checked) => {
              setValue('acepta_terminos', checked === true)
              setValue('acepta_politicas', checked === true)
            }}
            className="mt-0.5 h-3.5 w-3.5"
          />
          <label htmlFor="terminos" className="text-[10.5px] leading-tight cursor-pointer text-muted-foreground">
            Acepto los{' '}
            <Link to="/portal/terminos-condiciones" className="underline underline-offset-2 hover:text-primary text-foreground">
              Términos y Condiciones
            </Link>
            {' '}y la{' '}
            <Link to="/portal/politicas-de-privacidad" className="underline underline-offset-2 hover:text-primary text-foreground">
              Política de Privacidad
            </Link>.
          </label>
        </div>
        {errors.acepta_terminos && (
          <p className="text-destructive text-[11px]">{errors.acepta_terminos.message as string}</p>
        )}
      </Field>

      <Button type="submit" className="w-full h-8 text-sm" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
      </Button>

      <FieldDescription className="text-center text-[11px]">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/iniciar-sesion" className="font-semibold text-primary underline underline-offset-4 hover:opacity-80">
          Inicia sesión
        </Link>
      </FieldDescription>
    </FieldGroup>
  </form>
)
}