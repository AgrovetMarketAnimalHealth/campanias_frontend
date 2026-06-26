// signup-tabs.tsx
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SignupForm } from '@/modules/auth/components/signup-form'
import { UTMLink as Link } from "@/components/UTMLink"

export function SignupTabs() {
  const [mainTab, setMainTab] = useState<'registro' | 'login'>('registro')

  return (
    <div className="w-full bg-white rounded-lg shadow-xl p-6 formulario-caja">
      {/* Toggle */}
      <div className="flex rounded-lg border p-1 bg-gray-50 mb-4">
        <button
          type="button"
          onClick={() => setMainTab('registro')}
          className={cn(
            'flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-200',
            mainTab === 'registro'
              ? 'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          Regístrate
        </button>
        <Link
          to="/iniciar-sesion"
          onClick={() => setMainTab('login')}
          className={cn(
            'flex-1 flex items-center justify-center rounded-md py-2.5 text-sm font-medium transition-all duration-200',
            mainTab === 'login'
              ? 'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          Iniciar sesión
        </Link>
      </div>

      {mainTab === 'registro' && <SignupForm />}
    </div>
  )
}