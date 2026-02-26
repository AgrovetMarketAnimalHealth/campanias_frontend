import { Mail, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { AuthService } from '@/modules/auth/services/auth.service'
import { toast } from 'sonner'

export const Route = createLazyFileRoute({
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const search = useSearch({ strict: false }) as { email?: string }
  const [reenviando, setReenviando] = useState(false)
  const [reenviado, setReenviado] = useState(false)

  async function reenviarEmail() {
    if (!search.email) return
    setReenviando(true)
    try {
      await AuthService.reenviarVerificacion()
      setReenviado(true)
      toast.success('Correo reenviado exitosamente')
    } catch {
      toast.error('Error al reenviar el correo')
    } finally {
      setReenviando(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 border">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">

        <div className="bg-primary/10 rounded-full p-5">
          <Mail className="text-primary size-10" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Revisa tu correo electrónico</h1>
          <p className="text-muted-foreground text-sm">Hemos enviado un correo de confirmación a</p>
          {search.email && <p className="font-semibold text-sm">{search.email}</p>}
          <p className="text-muted-foreground text-sm mt-1">
            Por favor revisa tu bandeja de entrada y sigue las instrucciones
            para activar tu cuenta. Puede tardar unos minutos.
          </p>
        </div>

        <div className="w-full flex items-center gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle className="size-4 shrink-0" />
          Tu cuenta fue creada exitosamente y está pendiente de aprobación.
        </div>

        {reenviado && (
          <div className="w-full flex items-center gap-3 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <CheckCircle className="size-4 shrink-0" />
            Correo reenviado exitosamente. Revisa tu bandeja de entrada.
          </div>
        )}

        <div className="w-full rounded-md border bg-muted/50 px-4 py-4 text-sm text-left space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">¿No recibiste el correo?</p>
            <Badge className="bg-primary text-primary-foreground">Pendiente</Badge>
          </div>
          <ul className="text-muted-foreground space-y-1 list-disc list-inside">
            <li>Revisa tu carpeta de spam o correo no deseado.</li>
            <li>Asegúrate de que el correo ingresado sea correcto.</li>
            <li>Espera unos minutos y vuelve a revisar.</li>
          </ul>
        </div>

        <Button
          className="w-full"
          variant="outline"
          disabled={reenviando || reenviado}
          onClick={reenviarEmail}
        >
          {reenviando ? 'Reenviando...' : reenviado ? 'Correo reenviado ✓' : 'Reenviar correo de verificación'}
        </Button>

        <Link to="/iniciar-sesion" className="text-sm underline underline-offset-4 hover:text-primary">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  )
}
