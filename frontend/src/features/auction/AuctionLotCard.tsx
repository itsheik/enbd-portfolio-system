import { type ComponentPropsWithoutRef, type ElementType } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'

import { type Auction } from '@/src/interface/auction'

import winePicture from '~/assets/images/wine.png'
import { Heading, MButton, Paragraph } from '~/components/ui'
import { type Routes } from '~/constants'
import { cn } from '~/lib'

type AuctionCardProps<TAs extends ElementType = 'div'> = {
   as?: TAs
   className?: string
   href?: Routes
   data?: Auction & {
      isLink?: boolean
   }
} & Omit<ComponentPropsWithoutRef<TAs>, 'as'>

export const AuctionLotCard = <TAs extends ElementType = 'div'>({
   as,
   className,
   data,
   ...props
}: AuctionCardProps<TAs>) => {
   const matches = useMediaQuery('(min-width: 47.93em)')
   const lineClamp: number = matches ? 1 : 2

   const Comp = as || 'div'

   return (
      <Comp
         className={cn('no-underline w-[231px] p-0 aspect-square flex flex-col gap-2 justify-center', className)}
         {...props}
      >
         <div className="relative bg-beige py-2 flex items-end justify-center rounded-2xl h-[320px]">
            <div className="relative w-[230px] h-[300px]">
               <Image
                  src={data?.defaultimageurl || winePicture}
                  alt="Wine Picture"
                  placeholder="blur"
                  blurDataURL={data?.defaultimageurl}
                  fill
                  className="object-contain mix-blend-multiply brightness-125"
               />
            </div>
         </div>

         <main className="text-center mt-6">
            <Heading className="text-base md:text-xl font-medium" lineClamp={lineClamp}>
               {data?.internetheading || 'Glory Peach Wine'}
            </Heading>
            <Paragraph
               lineClamp={lineClamp}
               className="text-sm sm:text-base font-gilda-display text-muted-foreground mt-0.5 -tracking-tighter"
            >
               {data?.maindescription || 'Consists of 2 Bottles, 0.75L'}
            </Paragraph>

            <p className="text-primary font-podkova text-sm sm:text-base md:text-lg mt-1">
               {data?.bottlesize || 97} NM | ${data?.sortprice || 120.0}
            </p>
         </main>

         {!data?.isLink && props.href ? (
            <MButton isInternal={true} route={props.href} className="self-center">
               VIEW DETAILS
            </MButton>
         ) : (
            ''
         )}
      </Comp>
   )
}
