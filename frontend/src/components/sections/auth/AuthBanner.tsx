'use client'
import { type FC } from 'react'
import Image from 'next/image'

import { SellRetail } from '@/src/utils/images/main-page'

import { Heading } from '../../ui'
import { SectionContainer } from '../section-container'

type SectionBannerProps = {
   title?: string
   text?: string
   buttonLabel?: string
}

export const AuthBanner: FC<SectionBannerProps> = ({ title, text, buttonLabel }) => {
   return (
      <div role="banner" className="min-h-[600px] py-4 relative bg-primary flex items-center justify-center">
         <Image
            placeholder="blur"
            src={SellRetail}
            priority
            alt="wine banner not found"
            fill
            sizes='(wide) 100vw, (large) 100vw, (medium) 100vw, (small) 100vw, (xsmall) 100vw'
            className="object-cover size-full"
         />

         <div className="absolute inset-0 size-full bg-gradient-to-r from-primary to-[#1E1E1E] opacity-90"></div>
         <SectionContainer className="flex relative z-10 items-center justify-center w-full flex-col gap-2 md:px-6 text-center">
            <Heading order={2} className="text-4xl sm:text-5xl font-inter font-medium text-white">
               {title}
            </Heading>
         </SectionContainer>
      </div>
   )
}
