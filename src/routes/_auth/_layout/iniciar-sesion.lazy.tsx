import { SigninForm } from '@/modules/auth/components/signin-form'
import { Link } from "@tanstack/react-router"
export const Route = createLazyFileRoute({
  component: SigninPage,
})

function SigninPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img
              src="/promo-concierto/assets/illustrations/logo-atrevia.webp"
              alt="Atrevia logo"
              className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SigninForm />
          </div>
        </div>
      </div>
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