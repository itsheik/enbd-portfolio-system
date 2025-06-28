import { type FC, type PropsWithChildren } from 'react'
import { Anchor, type AnchorProps } from '@mantine/core'

import { cn } from '~/lib'

type MantineAnchorProps = PropsWithChildren<AnchorProps & { href: string; variant?: 'underlined' }>

export const MAnchor: FC<MantineAnchorProps> = ({ children, href, className, ...props }) => {
   return (
      <Anchor
         href={href}
         className={cn(
            'hover:underline underline-offset-4 hover:opacity-80 transition-all duration-500 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary',
            className,
            { 'underline decoration-solid': props.variant === 'underlined' },
         )}
         target="_blank"
         rel="noopener noreferrer"
         {...props}
      >
         {children}
      </Anchor>
   )
}
