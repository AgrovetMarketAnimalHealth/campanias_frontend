import { useState } from 'react'
import { cn } from '@/lib/utils'
import { NaturalSignupForm } from '@/modules/auth/components/natural-signup-form'
import { LegalSignupForm } from '@/modules/auth/components/legal-signup-form'
import { UTMLink as Link } from "@/components/UTMLink"
import logoAtrevia from '@/assets/illustrations/logo-atrevia.webp'

type Tab = 'natural' | 'juridica'

export function SignupTabs() {
  const [tab, setTab] = useState<Tab>('natural')

  return (
    <div className="grid min-h-svh">
      {/* Left side */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo + Iniciar sesión */}
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img
              src={logoAtrevia}
              alt="Atrevia logo"
              className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>
          <Link
            to="/iniciar-sesion"
            className="text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-80"
          >
            Iniciar sesión
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

    </div>
  )
}