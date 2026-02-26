import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RHFSubmitButtonProps {
  label: string
  disabled?: boolean
  className?: string
}

export function RHFSubmitButton({ label, disabled, className }: RHFSubmitButtonProps) {
  const { formState } = useFormContext()

  return (
    <Button
      type="submit"
      className={cn('w-full', className)}
      disabled={disabled || formState.isSubmitting}
    >
      {formState.isSubmitting ? 'Cargando...' : label}
    </Button>
  )
}
