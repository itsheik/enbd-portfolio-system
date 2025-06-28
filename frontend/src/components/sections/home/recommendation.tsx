import { type ComponentPropsWithoutRef, type ElementType } from 'react'
import Image from 'next/image'

import winePicture from '~/assets/images/wine.png'
import { Heading, Paragraph } from '~/components/ui'
import { type Routes } from '~/constants'
import { cn } from '~/lib'

type RecommendationProps<TAs extends ElementType = 'div'> = {
   as?: TAs
   className?: string
   href?: Routes
} & Omit<ComponentPropsWithoutRef<TAs>, 'as'>

export const RecommendationSection = <TAs extends ElementType = 'div'>({
   as,
   className,
   ...props
}: RecommendationProps<TAs>) => {
   const Comp = as || 'div'

   return (
      <section
         aria-label="recommendation"
         className="flex items-center justify-center gap-4 flex-col mt-6 pb-16 pt-6 border-y-2"
      >
         <Heading className="font-gilda-display text-primary text-4xl">Recommendation</Heading>
         <div className="w-full grid items-center grid-cols-6 gap-4 font-normal max-[1240px]:grid-cols-5 max-[1040px]:grid-cols-4 max-[840px]:grid-cols-3 max-[650px]:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((item, i) => {
               return (
                  <Comp
                     key={i}
                     className={cn('no-underline inline-block max-w-44 w-full p-0 aspect-square', className)}
                     {...props}
                  >
                     <div className="bg-beige py-2 sm:py-6 grid place-content-center rounded-2xl">
                        <Image src={winePicture} alt="Wine Picture" placeholder="blur" />
                     </div>
                     <main className="text-center mt-6">
                        <Heading className="text-lg font-medium">Glory Peach Wine</Heading>
                        <Paragraph className="text-sm font-gilda-display text-muted-foreground mt-0.5 -tracking-tighter">
                           Consists of 2 Bottles, 0.75L
                        </Paragraph>

                        <p className="text-primary font-podkova text-sm  mt-1">97 NM | $120.00</p>
                        <p className="text-primary font-podkova text-sm  mt-1">*Available One</p>
                        <button className="bg-primary text-white px-3 rounded-lg py-2 cursor-pointer max-[1000px]:text-sm max-[700px]:text-xs">
                           ADD TO CART
                        </button>
                     </main>
                  </Comp>
               )
            })}
         </div>
      </section>
   )
}
