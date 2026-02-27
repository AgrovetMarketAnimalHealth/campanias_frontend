import { useState } from 'react'
import { cn } from '@/lib/utils'
import { NaturalSignupForm } from '@/modules/auth/components/natural-signup-form'
import { LegalSignupForm } from '@/modules/auth/components/legal-signup-form'
import { Link } from "@tanstack/react-router"

type Tab = 'natural' | 'juridica'

export const Route = createLazyFileRoute({
  component: RegisterPage,
})

function RegisterPage() {
  const [tab, setTab] = useState<Tab>('natural')

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img
              src="/promo-concierto/assets/illustrations/logo-atrevia.webp"
              alt="Atrevia logo"
              className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-6">
            {/* Toggle tabs */}
            <div className="flex rounded-lg border p-1">
              <button
                type="button"
                onClick={() => setTab('natural')}
                className={cn(
                  'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
                  tab === 'natural'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Persona Natural
              </button>
              <button
                type="button"
                onClick={() => setTab('juridica')}
                className={cn(
                  'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
                  tab === 'juridica'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Persona Jurídica
              </button>
            </div>

            {tab === 'natural' ? <NaturalSignupForm /> : <LegalSignupForm />}
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/promo-concierto/assets/illustrations/Registro_1200x1200px.webp"
          alt="Campaña Chayanne"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}