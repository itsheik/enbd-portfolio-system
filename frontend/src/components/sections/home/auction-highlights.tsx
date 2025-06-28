'use client'

import Link from 'next/link'

import { AuctionLotCard } from '@/src/features/auction/AuctionLotCard'
import { cn } from '@/src/lib'

import Loader from '../../ui/Loader'
import { SectionContainer } from '../section-container'

import { Heading, MCarousel, MCarouselSlide } from '~/components/ui'
import { routes } from '~/constants'
import { wineCarouselProps } from '~/features/wine'
import { useAuctionHighlightsData } from '~/hooks/auction/useAuctionData'

type AuctionHighLightsProps = {
   title?: string
   subtitle?: string
   className?: string
   styles?: {
      title?: {
         className?: string
      }
      subtitle?: {
         className?: string
      }
   }
   isLink?: boolean
}

export const AuctionHighLights = ({
   title = 'Auction Highlights',
   subtitle = 'Popular Categories',
   className,
   styles,
   isLink = true,
}: AuctionHighLightsProps) => {
   const { auctionHighlights, isLoading } = useAuctionHighlightsData()

   const Comp = isLink ? Link : 'div'

   return (
      <SectionContainer className={`space-y-8 ${className || ''}`}>
         <div className="space-y-3 text-center">
            <Heading
               className={cn('text-gray-500 font-normal text-lg sm:text-xl md:text-2xl', styles?.subtitle?.className)}
            >
               {subtitle}
            </Heading>
            <Heading
               order={1}
               className={cn('text-primary font-normal text-3xl sm:text-4xl md:text-5xl', styles?.title?.className)}
            >
               {title}
            </Heading>
         </div>

         {isLoading ? (
            <Loader classname="text-red-primary" />
         ) : (
            <MCarousel {...wineCarouselProps}>
               {auctionHighlights?.auctionLots.map(lot => (
                  <MCarouselSlide key={lot.lotid}>
                     <AuctionLotCard
                        data={{ ...lot, isLink }}
                        aria-label="Wine"
                        as={Comp}
                        href={`${routes.auctions.current}/${lot.lotid}`}
                     />
                  </MCarouselSlide>
               ))}
            </MCarousel>
         )}
      </SectionContainer>
   )
}
