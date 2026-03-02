import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { DEPARTAMENTOS } from '../types/departamentos'
import { registerSchema, type TypeRegisterSchema } from '@/modules/auth/schemas/register.schema'
import { AuthService } from '@/modules/auth/services/auth.service'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

export function LegalSignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

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
      tipo_persona: 'juridica',
      nombre: '',
      apellidos: '',
      ruc: '',
      departamento: '',
      email: '',
      telefono: '',
      acepta_politicas: false,
      acepta_terminos: false,
    },
  })

  const aceptaTerminos = watch('acepta_terminos')
  const comprobante = watch('archivo_comprobante')

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setValue('archivo_comprobante', file)
  }

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
          <h1 className="text-2xl font-bold">Persona Jurídica</h1>
          <p className="text-muted-foreground text-sm">Completa el formulario para registrar tu empresa</p>
        </div>

        {errors.root && (
          <p className="rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-2 text-center">
            {errors.root.message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="nombres-j">Nombres</FieldLabel>
            <Input id="nombres-j" type="text" placeholder="Juan" {...register('nombre')} />
            {errors.nombre && <p className="text-destructive text-xs">{errors.nombre.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="apellidos-j">Apellidos</FieldLabel>
            <Input id="apellidos-j" type="text" placeholder="Pérez" {...register('apellidos')} />
            {errors.apellidos && (
              <p className="text-destructive text-xs">
                {'apellidos' in errors ? errors.apellidos?.message : ''}
              </p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="ruc">RUC</FieldLabel>
          <Input id="ruc" type="text" placeholder="20123456789" maxLength={11} {...register('ruc')} />
          {errors.ruc && (
            <p className="text-destructive text-xs">
              {'ruc' in errors ? errors.ruc?.message : ''}
            </p>
          )}
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="celular-j">Celular</FieldLabel>
            <Input id="celular-j" type="tel" placeholder="987 654 321" {...register('telefono')} />
            {errors.telefono && <p className="text-destructive text-xs">{errors.telefono.message}</p>}
          </Field>
          <Field>
            <FieldLabel>Departamento</FieldLabel>
            <select
              onChange={(e) => setValue('departamento', e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
            >
              <option value="" disabled>Selecciona</option>
              {DEPARTAMENTOS.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {errors.departamento && (
              <p className="text-destructive text-xs">{errors.departamento.message}</p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email-j">Correo electrónico</FieldLabel>
          <Input id="email-j" type="email" placeholder="empresa@ejemplo.com" {...register('email')} />
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </Field>

        <Field>
          <FieldLabel>Comprobante de pago</FieldLabel>
          <label
            htmlFor="comprobante-j"
            className="border-input bg-background hover:bg-muted flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-4 py-6 text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mb-2 size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {!comprobante ? (
              <span className="text-muted-foreground">Haz clic para subir o arrastra tu archivo aquí</span>
            ) : (
              <span className="text-primary font-medium">{(comprobante as File).name}</span>
            )}
            <input ref={inputRef} id="comprobante-j" type="file" accept="image/*,.pdf" className="hidden" onChange={onFileChange} />
          </label>
          <FieldDescription>Formatos aceptados: JPG, PNG o PDF. Máximo 5 MB.</FieldDescription>
          {errors.archivo_comprobante && (
            <p className="text-destructive text-xs">{errors.archivo_comprobante.message as string}</p>
          )}
        </Field>

        <Field>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terminos-j"
              checked={aceptaTerminos as boolean}
              onCheckedChange={(checked) => {
                setValue('acepta_terminos', checked === true)
                setValue('acepta_politicas', checked === true)
              }}
              className="mt-1"
            />
            <label htmlFor="terminos-j" className="text-sm leading-snug cursor-pointer">
              Acepto los{' '}
              <Link to="/terminos-condiciones" className="underline underline-offset-4 hover:text-primary">
                Términos y Condiciones
              </Link>
              {' '}y la{' '}
              <Link to="/politicas-privacidad" className="underline underline-offset-4 hover:text-primary">
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

        <FieldDescription className="text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/iniciar-sesion" className="underline underline-offset-4 hover:text-primary">
            Inicia sesión
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}