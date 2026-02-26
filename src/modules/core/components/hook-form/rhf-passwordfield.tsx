import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { ReactNode } from 'react'

interface RHFPasswordFieldProps {
  name: string
  label?: ReactNode
}

export function RHFPasswordField({ name, label }: RHFPasswordFieldProps) {
  const { control } = useFormContext()
  const [show, setShow] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={show ? 'text' : 'password'}
                value={field.value ?? ''}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
