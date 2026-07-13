import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { AuthService } from '@/modules/auth/services/auth.service'
import { markInternalNav, getStoredUTMs } from '@/hooks/useUTMTracker'

export const Route = createLazyFileRoute({
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const navigate = useNavigate()
  const { token } = Route.useParams()
  const verificado = useRef(false)

  useEffect(() => {
    if (!token || verificado.current) return
    verificado.current = true

    AuthService.verificarEmail(token)
      .then((res) => {
        const utms = getStoredUTMs()
        markInternalNav()

        if (res.success) {
          navigate({
            to: '/registro-exitoso',
            search: { ...utms },
          })
        } else {
          navigate({
            to: '/registro-fallido',
            search: { ...utms },
          })
        }
      })
      .catch(() => {
        const utms = getStoredUTMs()
        markInternalNav()

        navigate({
          to: '/registro-fallido',
          search: {
            ...utms,
            mensaje: 'Error al verificar el correo. Intenta nuevamente.',
          },
        })
      })
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Verificando tu correo...</p>
    </div>
  )
}