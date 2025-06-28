'use client'
import { type FC } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import { useIsPathSegmentPresent } from '@/src/hooks/useIsPathSegmentPresent'

// import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { Heading, Paragraph } from '../ui'

import { SectionContainer } from './section-container'

import bannerImage from '~/assets/images/banner.webp'

type SectionBannerProps = {
   title: string
   text?: string
   buttonLabel?: string
   click?: () => void
}

export const SectionBanner: FC<SectionBannerProps> = ({ title, text, buttonLabel, click }) => {
   const isRetail = useIsPathSegmentPresent('retail')
   const isAuth = useIsPathSegmentPresent('auth')

   // const { auctionBidSummaryByCustomer } = useSelector(selectAuctionSlice)

   return (
      <header role="banner" className="min-h-80 py-4 relative bg-primary flex items-center justify-center">
         <Image
            placeholder="blur"
            src={bannerImage}
            priority
            alt="wine banner not found"
            fill
            className="object-cover size-full"
         />
         {isAuth ? null : (
            <>
               <div className="absolute inset-0 size-full bg-gradient-to-r from-primary to-[#1E1E1E] opacity-90"></div>
               {isRetail ? (
                  <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 flex gap-4  bg-red-heavy w-max h-max px-8 py-2 rounded-[10px]">
                     <div className="flex items-center gap-2 rounded">
                        <div className="w-2.5 h-2.5 rounded-full bg-success-secondary"></div>
                        {/* <Paragraph className="text-success-secondary ">
                           Winning: ${auctionBidSummaryByCustomer?.winning}/{auctionBidSummaryByCustomer?.winningCount}
                        </Paragraph> */}
                     </div>
                     <div className="flex items-center gap-2 rounded">
                        <div className="w-2.5 h-2.5 rounded-full bg-error-primary"></div>
                        {/* <Paragraph className="text-error-primary  ">
                           Out Bid: {auctionBidSummaryByCustomer?.losing}/{auctionBidSummaryByCustomer?.losingCount}
                        </Paragraph> */}
                     </div>
                  </div>
               ) : null}
               <SectionContainer className="flex relative z-10 items-center justify-center w-full flex-col gap-2">
                  <Heading order={2} className="text-4xl sm:text-5xl font-normal text-white">
                     {title}
                  </Heading>
                  {text && <p className="text-secondary text-3xl font-podkova text-center">{text}</p>}
                  {buttonLabel && (
                     <button
                        onClick={click}
                        style={{ border: '2px solid #EC9F23', borderRadius: '8px' }}
                        className="border-(--color-secondary) px-16 py-2 bg-transparent text-white cursor-pointer"
                     >
                        {buttonLabel}
                     </button>
                  )}
               </SectionContainer>
            </>
         )}
      </header>
   )
}
