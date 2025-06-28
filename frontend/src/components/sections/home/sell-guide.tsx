'use client'

import Image from 'next/image'
import Link from 'next/link'

import { routes } from '@/src/constants'

import { SectionContainer } from '../section-container'

import auctionImage from '~/assets/images/sell-auction.jpg'
import retailImage from '~/assets/images/sell-retail.jpg'
import storageImage from '~/assets/images/sell-storage.jpg'
import wineBottleImage from '~/assets/images/wine-bottle.png'
import { Heading, Paragraph } from '~/components/ui'
import { cn, generateUUID } from '~/lib'

const guides = [
   {
      _id: generateUUID(),
      title: 'Auctions',
      imageSrc: auctionImage,
      description: `Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling.`,
      link: routes.auctions.current,
   },
   {
      _id: generateUUID(),
      title: 'Retail Sales',
      imageSrc: retailImage,
      description: `Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling.`,
      link: routes.retail.wines,
   },
   {
      _id: generateUUID(),
      title: 'Storage',
      imageSrc: storageImage,
      description: `Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling.`,
      link: routes.storage.professional,
   },
]

export const SellGuide = () => {
   return (
      <main className="bg-primary">
         <SectionContainer className="space-y-8 pt-14!">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {guides.map(({ _id, title, imageSrc, description, link }, index) => (
                  <Link key={_id} href={link} className="space-y-4 ">
                     <Heading order={2} c="white">
                        {title}
                     </Heading>
                     <Image
                        src={imageSrc}
                        alt={title}
                        className={cn('w-full aspect-video', {
                           'md:border-r border-white md:pr-8': index !== guides.length - 1,
                        })}
                     />
                     <Paragraph className="text-white">{description}</Paragraph>
                  </Link>
               ))}
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 items-center mt-16 md:mt-28">
               <div className="space-y-8 pb-16">
                  <Heading className="text-4xl md:text-5xl lg:text-6xl  text-white leading-tight">
                     SELL WITH <br />
                     SPECTRUM <span className="text-secondary">WINE</span>
                  </Heading>

                  <div className="space-y-4 pt-4">
                     <Link
                        href={routes.sell.how}
                        className="block text-white text-xl border-b border-secondary/50 pb-2 hover:border-secondary transition-colors"
                     >
                        How It Works
                     </Link>
                     <Link
                        href={routes.sell.appraisal}
                        className="block text-white text-xl border-b border-secondary/50 pb-2 hover:border-secondary transition-colors"
                     >
                        Request Appraisal
                     </Link>
                     <Link
                        href={routes.sell.consignment}
                        className="block text-white text-xl border-b border-secondary/50 pb-2 hover:border-secondary transition-colors"
                     >
                        Online Consignment Form
                     </Link>
                  </div>
               </div>

               <div className="flex justify-center md:justify-end">
                  <div className="relative z-10 bg-secondary size-48 sm:size-96 rounded-full">
                     <Image
                        src={wineBottleImage}
                        alt="Wine bottle"
                        className="w-[73px] sm:w-[145px] object-contain absolute -bottom-[21px] sm:-bottom-[52px] left-1/2 -translate-x-1/2"
                     />
                  </div>
               </div>
            </div>
         </SectionContainer>
      </main>
   )
}
