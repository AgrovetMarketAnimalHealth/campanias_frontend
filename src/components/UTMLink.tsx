import { Link } from '@tanstack/react-router'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any

export function UTMLink({ search, ...props }: any) {
  return (
    <AnyLink
      {...props}
      search={(prev: any) => ({
        ...prev,
        ...(typeof search === 'function' ? search(prev) : (search ?? {})),
      })}
    />
  )
}