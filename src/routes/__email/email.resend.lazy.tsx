import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
} from '@/components/ui/field'
import { AuthService } from '@/modules/auth/services/auth.service'

export const Route = createLazyFileRoute({
  component: ResendEmailPage,
})

function ResendEmailPage() {
  const search = Route.useSearch() as { email?: string }
  const email = search.email ?? ''

  const [reenviando, setReenviando]         = useState(false)
  const [reenviado, setReenviado]           = useState(false)
  const [intentos, setIntentos]             = useState(0)
  const [segundosEspera, setSegundosEspera] = useState(0)

  const whatsappUrl =
    'https://wa.me/51903069021?text=Hola,%20tengo%20problemas%20con%20la%20verificaci%C3%B3n%20de%20mi%20cuenta.'

  async function reenviarEmail() {
    if (!email) {
      toast.error('Ingresa tu correo electrónico.')
      return
    }
    setReenviando(true)
    try {
      const res = await AuthService.reenviarVerificacion(email)

      if (!res.success && res.status === 429) {
        const match = res.message.match(/\d+/)
        const segundos = match ? parseInt(match[0]) : 60
        setSegundosEspera(segundos)
        const interval = setInterval(() => {
          setSegundosEspera((prev) => {
            if (prev <= 1) { clearInterval(interval); return 0 }
            return prev - 1
          })
        }, 1000)
        toast.error(res.message)
        return
      }

      if (!res.success) {
        toast.error(res.message)
        return
      }

      setReenviado(true)
      setIntentos((prev) => prev + 1)
      toast.success('Correo reenviado exitosamente')
    } catch {
      toast.error('Error al reenviar el correo')
    } finally {
      setReenviando(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Verifica tu correo electrónico</CardTitle>
            <CardDescription>
              Enviamos un enlace de verificación a{' '}
              {email
                ? <span className="font-semibold text-foreground">{email}</span>
                : 'tu correo'
              }
              . Revisa también tu carpeta de spam.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <Field>
                <Button
                  type="button"
                  className="w-full"
                  disabled={reenviando || !email || segundosEspera > 0}
                  onClick={reenviarEmail}
                >
                  {reenviando
                    ? 'Reenviando...'
                    : segundosEspera > 0
                      ? `Espera ${segundosEspera}s para reenviar`
                      : reenviado
                        ? 'Reenviar de nuevo'
                        : 'Reenviar correo de verificación'}
                </Button>

                <Button variant="outline" type="button" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Contactar soporte por WhatsApp
                  </a>
                </Button>

                <FieldDescription className="text-center">
                  {intentos >= 3
                    ? 'Alcanzaste el límite de reenvíos. Espera unos minutos antes de intentarlo de nuevo.'
                    : reenviado
                      ? 'Correo reenviado. Si no lo ves, revisa tu bandeja de spam.'
                      : 'Asegúrate de que el correo ingresado sea correcto antes de reenviar.'
                  }
                </FieldDescription>

                <FieldDescription className="text-center">
                  <Link
                    to="/iniciar-sesion"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Volver al inicio de sesión
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}