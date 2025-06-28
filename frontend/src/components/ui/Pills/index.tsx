import { type FC, type ReactNode } from 'react'
import { Badge, type BadgeProps } from '@mantine/core'

import { cn } from '@/src/lib'

type PillVariant = 'success' | 'danger' | 'info' | 'warning'

interface PillProps extends Omit<BadgeProps, 'variant' | 'color'> {
   variant: PillVariant
   children: ReactNode
}

const variantStyles: Record<PillVariant, { bg: string; color: string; circle: string }> = {
   success: {
      bg: 'bg-table-body-primary',
      color: 'text-b-white-secondary border border-success-secondary',
      circle: 'bg-success-secondary',
   },
   danger: {
      bg: 'bg-table-body-primary',
      color: 'text-b-white-secondary border border-error-primary',
      circle: 'bg-error-primary',
   },
   info: {
      bg: 'bg-table-body-primary',
      color: 'text-b-white-secondary border border-blue-700',
      circle: 'bg-blue-700',
   },
   warning: {
      bg: 'bg-table-body-primary',
      color: 'text-b-white-secondary border border-table-head',
      circle: 'bg-table-head',
   },
}

export const Pill: FC<PillProps> = ({ variant, children, className, ...props }) => {
   const styles = variantStyles[variant]

   return (
      <Badge className={cn('font-medium rounded-full px-3 py-1 flex items-center gap-3', styles.bg, styles.color, className)} {...props}>
         <span className={cn('w-2 h-2 inline-block rounded-full mr-1', styles.circle)} /> {children}
      </Badge>
   )
}
