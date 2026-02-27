import { Link } from '@tanstack/react-router'
import { TerminosCondicionesPage } from '@/modules/terminos/TerminosCondicionesPage'
import logoAtrevia from '@/assets/illustrations/logo-atrevia.webp'

export const Route = createFileRoute({
  component: () => (
    <div className="flex min-h-svh flex-col p-6 md:p-10">
      
      {/* Logo arriba */}
      <div className="flex justify-center gap-2 md:justify-start">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img
            src={logoAtrevia}
            alt="Atrevia logo"
            className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </Link>
      </div>

      {/* Contenido centrado */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-4xl">
          <TerminosCondicionesPage />
        </div>
      </div>

    </div>
  ),
})