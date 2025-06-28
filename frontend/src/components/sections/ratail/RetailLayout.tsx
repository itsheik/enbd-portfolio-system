'use client'

import type React from 'react'
import { type PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

import { SectionBanner, SectionContainer } from '~/components/sections'
import { INCLUDE_RETAIL_BANNER } from '~/constants/page-constants'

export const RetailLayout: React.FC<PropsWithChildren> = ({ children }) => {
   const pathname = usePathname()
   let bannerTitle: string = ''

   if (INCLUDE_RETAIL_BANNER.some(path => pathname.toLowerCase().startsWith(path.toLowerCase()))) {
      bannerTitle = 'RETAIL SALES'
   }

   return (
      <section className="space-y-24">
         <div className="space-y-8 pb-8 bg-background">
            <SectionBanner title={bannerTitle} />
            <SectionContainer className="flex gap-5 w-full max-[880px]:block">{children}</SectionContainer>
         </div>
      </section>
   )
}
