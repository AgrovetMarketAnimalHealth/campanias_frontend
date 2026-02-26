import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type TypeLoginSchema } from "../schemas/login.schema"
import { AuthService } from "../services/auth.service"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: TypeLoginSchema) => {
    setServerError(null)
    try {
      const res = await AuthService.login(data)

      if (!res.success && res.accion === "verificar_email") {
        navigate({ to: "/email/resend", search: { email: data.email } })
        return
      }

      if (!res.success) {
        setServerError(res.message ?? "Credenciales incorrectas")
        return
      }
      navigate({ to: "/portal/dashboard/" })
    } catch {
      setServerError("Error de conexion. Intenta de nuevo.")
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tu correo electrónico para acceder a tu cuenta

          </p>
        </div>

        {serverError && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive text-center">
            {serverError}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <Link
              to="/recuperar-contrasena"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Iniciar sesion"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            No tienes cuenta?{" "}
            <Link to="/registrarme" className="underline underline-offset-4">
              Registrate
            </Link>
          </FieldDescription>
        </Field>

    <FieldDescription className="text-center text-muted-foreground text-xs">
      Al hacer clic en continuar, aceptas nuestros
      <Link href="/portal/terminos-condiciones" className="underline underline-offset-4 hover:text-primary">
        Términos de Servicio
      </Link>
      y
      <Link href="/portal/politicas-privacidad" className="underline underline-offset-4 hover:text-primary">
        Política de Privacidad
      </Link>.
    </FieldDescription>
      </FieldGroup>
    </form>
  )
}