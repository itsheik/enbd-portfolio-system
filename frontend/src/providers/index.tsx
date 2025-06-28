'use client'

import { type ReactNode } from 'react'
import NextTopLoader, { type NextTopLoaderProps } from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster, type ToasterProps } from 'sonner'

import MantineThemeProvider from './mantine'

const providers = [MantineThemeProvider, NuqsAdapter] as const

const globalComponents = [
   {
      Component: Toaster,
      props: { position: 'top-right', richColors: true } as ToasterProps,
   },
   {
      Component: NextTopLoader,
      props: { showSpinner: false, color: 'oklch(0.76 0.1538 72.38)' } as NextTopLoaderProps,
   },
]

const RootProviders = ({ children }: { children: ReactNode }) => {
   if (!Array.isArray(providers) || providers.some(Provider => typeof Provider !== 'function')) {
      throw new Error('Invalid provider configuration: All providers must be valid React components.')
   }

   const renderGlobalComponents = () => (
      <>
         {globalComponents.map(({ Component, props }, index) => (
            <Component key={index} {...props} />
         ))}
         {children}
      </>
   )

   return providers.reduceRight((acc, Provider) => {
      if (typeof Provider !== 'function') {
         throw new Error(`Invalid provider: ${Provider} is not a valid React component.`)
      }

      return <Provider>{acc}</Provider>
   }, renderGlobalComponents())
}

export default RootProviders
