import { RecoverPasswordForm } from "@/modules/auth/components/recover-password-form"

export const Route = createLazyFileRoute({
  component: RecoverPasswordPage,
})

function RecoverPasswordPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <RecoverPasswordForm />
      </div>
    </div>
  )
}