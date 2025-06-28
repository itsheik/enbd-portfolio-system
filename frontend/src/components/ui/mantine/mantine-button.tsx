import { type FC } from 'react'
import { Button, type ButtonProps } from '@mantine/core'

import { InternalLink } from '../internal-link'

import { type Routes } from '~/constants'
import { cn } from '~/lib'

// Base props shared between both button types
type BaseButtonProps = ButtonProps & {
   loaderProps?: { type?: 'dots' } & ButtonProps['loaderProps']
   type?: 'button' | 'submit' | 'reset'
}

// For regular buttons (with onClick)
type RegularButtonProps = BaseButtonProps & {
   isInternal?: false
   route?: never
   onClick?: React.MouseEventHandler<HTMLButtonElement>
}

// For internal links (with route)
type InternalButtonProps = BaseButtonProps & {
   isInternal: true
   route: Routes
   onClick?: never
   loading?: never
}

// Union type
type MButtonProps = RegularButtonProps | InternalButtonProps

export const MButton: FC<MButtonProps> = ({ children, loaderProps, isInternal, route, ...props }) => {
   if (isInternal) {
      const { onClick, ...linkProps } = props

      return (
         <Button
            component={InternalLink}
            href={route}
            loaderProps={{ type: 'dots' }}
            {...linkProps}
            className={cn('hover:no-underline rounded-lg', props.className)}
         >
            {children}
         </Button>
      )
   }

   return (
      <Button
         loaderProps={{ type: 'dots', ...loaderProps }}
         {...props}
         className={cn('hover:no-underline rounded-lg', props.className)}
      >
         {children}
      </Button>
   )
}
