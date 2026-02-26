import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { AuthService } from '@/modules/auth/services/auth.service'

export const Route = createLazyFileRoute({
  component: VerifyEmailPage,
})

type Estado = 'cargando' | 'exito' | 'error'

function VerifyEmailPage() {
  const navigate = useNavigate()
  const { token } = Route.useParams()
  const [estado, setEstado] = useState<Estado>('cargando')
  const [mensaje, setMensaje] = useState('')
  const verificado = useRef(false)

  useEffect(() => {
    if (!token || verificado.current) return
    verificado.current = true

    AuthService.verificarEmail(token)
      .then((res) => {
        if (res.success) {
          setEstado('exito')
          setMensaje('¡Tu correo fue verificado exitosamente!')
        } else {
          setEstado('error')
          setMensaje(res.message ?? 'Enlace inválido o expirado.')
        }
      })
      .catch(() => {
        setEstado('error')
        setMensaje('Error al verificar el correo. Intenta nuevamente.')
      })
  }, [token])

  return (
    <div className="min-h-svh grid place-items-center">
      <div className="text-center space-y-6 max-w-md px-4">

        {estado === 'cargando' && (
          <>
            <h2 className="text-2xl font-bold">Verificando tu correo...</h2>
            <p className="text-muted-foreground">Espera un momento.</p>
            <svg className="animate-spin size-14 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </>
        )}

        {estado === 'exito' && (
          <>
            <div className="text-green-500 text-6xl">✓</div>
            <h2 className="text-2xl font-bold text-green-600">¡Correo verificado!</h2>
            <p className="text-muted-foreground">{mensaje}</p>
            <button
              onClick={() => navigate({ to: '/iniciar-sesion' })}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Iniciar sesión
            </button>
          </>
        )}

        {estado === 'error' && (
          <>
            <div className="text-red-500 text-6xl">✗</div>
            <h2 className="text-2xl font-bold text-red-600">Error de verificación</h2>
            <p className="text-muted-foreground">{mensaje}</p>
            <button
              onClick={() => navigate({ to: '/iniciar-sesion' })}
              className="bg-primary text-white px-6 py-3 rounded-lag font-semibold hover:opacity-90 transition"
            >
              Volver al inicio
            </button>
          </>
        )}

      </div>
    </div>
  )
}