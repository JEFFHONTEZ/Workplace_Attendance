import * as React from 'react'
import { cn } from '@/lib/utils'

export function H1({ className, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 data-slot="h1" className={cn('text-2xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h1>
  )
}

export function H2({ className, children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 data-slot="h2" className={cn('text-xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h2>
  )
}

export function P({ className, children, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="p" className={cn('text-base text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export default { H1, H2, P }
