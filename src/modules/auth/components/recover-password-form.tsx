import { UTMLink as Link } from "@/components/UTMLink"
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
import { type TypeRecoverPasswordSchema, recoverPasswordSchema } from "../schemas/recovery-password.schema"
import { AuthService } from "../services/auth.service"
import { setRHFError } from "@/modules/core/components/hook-form/set-error"
import { toast } from "sonner"
import { useState } from "react"

export function RecoverPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TypeRecoverPasswordSchema>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: TypeRecoverPasswordSchema) {
    const { success, message, errors } = await AuthService.recoverPassword(values)
    if (!success && errors) return setRHFError({ setError } as any, errors as Record<string, string[]>)
    if (!success) return toast.error(message)
    toast.success(message)
    setSent(true)
    reset()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to="/" className="flex items-center gap-2 font-medium">
            <img
              src="/promo-chayanne/veterinarios/assets/illustrations/logo-atrevia.webp"
              alt="Atrevia logo"
              className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>
            <h1 className="text-xl font-bold">Recuperar contrasena</h1>
            <FieldDescription>
              Te enviaremos un enlace para restablecer tu contrasena
            </FieldDescription>
          </div>

          {sent && (
            <div className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-600 text-center">
              Revisa tu correo, te enviamos el enlace
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Obtener enlace"}
            </Button>
          </Field>

          <FieldDescription className="text-center">
            Recordaste tu contrasena?{" "}
            <Link to="/iniciar-sesion" className="underline underline-offset-4">
              Inicia sesion
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}