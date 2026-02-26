import type { UseFormReturn, FieldValues, Path } from 'react-hook-form'

export function setRHFError<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Record<string, string[]>
) {
  for (const key in errors) {
    const [firstError] = errors[key]
    if (!firstError) continue
    form.setError(key as Path<T>, { message: firstError })
  }
}
