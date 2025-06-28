/** @format */

import type React from 'react'
import { mantineHtmlProps } from '@mantine/core'
import { type Viewport } from 'next'
import Script from 'next/script'

import RootApiCalls from '../providers/RootApiCalls'
import StoreProvider from '../providers/StoreProvider'

import 'react-toastify/dist/ReactToastify.css'
import '~/styles/index.css'

import { Footer, Header } from '~/components/layout'
import { appFonts } from '~/components/ui/fonts'
import { appConfig, generateSeoMetadata, jsonLd } from '~/config'
import { cn } from '~/lib'
import RootProviders from '~/providers'

export const viewport: Viewport = {
   themeColor: appConfig.theme,
   width: 'device-width',
   initialScale: 1,
}

export const metadata = generateSeoMetadata()

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" {...mantineHtmlProps}>
         <body className={cn('min-h-dvh font-inter text-base antialiased', ...appFonts)}>
            <Script
               id="jsonLd-data"
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <StoreProvider>
               <RootProviders>
                  <RootApiCalls>
                     <div className="flex flex-col min-h-dvh">
                        <Header />
                        <main className="flex-1">{children}</main>
                        {/* <Footer /> */}
                     </div>
                  </RootApiCalls>
               </RootProviders>
            </StoreProvider>
         </body>
      </html>
   )
}
