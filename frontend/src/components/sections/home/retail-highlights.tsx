'use client'

import Link from 'next/link'

import { routes } from '@/src/constants'
import { useRetailData } from '@/src/hooks/retail/useRetailData'
import { cn } from '@/src/lib/utils'

import Loader from '../../ui/Loader'
import { SectionContainer } from '../section-container'

import { Heading, MCarousel, MCarouselSlide } from '~/components/ui'
import { wineCarouselProps, WineProductCard } from '~/features/wine'

type RetailHighLightsProps = {
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

export const RetailHighLights = ({
   title = 'Retail Highlights',
   subtitle = 'Popular Categories',
   className,
   styles,
   isLink = true,
}: RetailHighLightsProps) => {
   const { isLoading, retailWineHighlightListing } = useRetailData()

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
            <MCarousel {...wineCarouselProps} autoPlay={false}>
               {retailWineHighlightListing?.retail.map((item, index) => (
                  <MCarouselSlide key={index}>
                     <WineProductCard
                        data={{ ...item, isLink }}
                        aria-label="Wine"
                        as={Comp}
                        href={`${routes.retail.wines}/${item.winecatalogid}`}
                     />
                  </MCarouselSlide>
               ))}
            </MCarousel>
         )}
      </SectionContainer>
   )
}
