import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute({
  component: RegistroExitosoPage,
})

function RegistroExitosoPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-svh grid place-items-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="text-green-500 text-6xl">✓</div>
        <h2 className="text-2xl font-bold text-green-600">¡Correo verificado!</h2>
        <p className="text-muted-foreground">
          ¡Tu correo fue verificado exitosamente!
        </p>
        <button
          onClick={() => navigate({ to: '/iniciar-sesion' })}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}