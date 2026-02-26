import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface RHFTextfieldProps {
  name: string
  label?: ReactNode
  helperText?: string
  disabled?: boolean
  type?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export function RHFTextfield({ name, label, helperText, disabled, type, inputProps }: RHFTextfieldProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              {...inputProps}
              type={type || inputProps?.type || 'text'}
              disabled={disabled}
              value={field.value ?? ''}
            />
          </FormControl>
          {helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
