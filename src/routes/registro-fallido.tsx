import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute({
  validateSearch: z.object({
    mensaje: z.string().optional(),
  }),
  component: RegistroFallidoPage,
})

function RegistroFallidoPage() {
  const navigate = useNavigate()
  const { mensaje } = Route.useSearch()

  return (
    <div className="min-h-svh grid place-items-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="text-red-500 text-6xl">✗</div>

        <h2 className="text-2xl font-bold text-red-600">
          Error de verificación
        </h2>

        <p className="text-muted-foreground">
          {mensaje ??
            'Enlace inválido o expirado. Por favor intenta nuevamente.'}
        </p>

        <button
          onClick={() => navigate({ to: '/iniciar-sesion' })}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}