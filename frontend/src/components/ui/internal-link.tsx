'use client'

import { type FC, type PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'

import { type Routes } from '~/constants'
import { cn } from '~/lib'

export type InternalLinkProps = PropsWithChildren<
   { href: Routes; className?: string; variant?: 'underlined' } & LinkProps
>

export const InternalLink: FC<InternalLinkProps> = ({ href, children, className, ...props }) => {
   return (
      <Link
         href={href}
         className={cn(
            'hover:underline hover:underline-offset-4 hover:opacity-80 transition-all duration-500 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary',
            className,
            { 'underline decoration-solid': props.variant === 'underlined' },
         )}
         {...props}
      >
         {children}
      </Link>
   )
}
