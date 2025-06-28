import { type ComponentPropsWithoutRef, type ElementType } from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { type Retail } from '@/src/interface/retail'
import { setRetailSlice } from '@/src/store/features/retail/retailSlice'

import winePicture from '~/assets/images/wine.png'
import { Heading, MButton, Paragraph } from '~/components/ui'
import { type Routes } from '~/constants'
import { cn } from '~/lib'

type WineCardProps<TAs extends ElementType = 'div'> = {
   as?: TAs
   className?: string
   href?: Routes
   data?: Retail & {
      isLink?: boolean
   }
} & Omit<ComponentPropsWithoutRef<TAs>, 'as'>

export const WineProductCard = <TAs extends ElementType = 'div'>({
   as,
   className,
   data,
   ...props
}: WineCardProps<TAs>) => {
   const matches = useMediaQuery('(min-width: 47.93em)')
   const lineClamp: number = matches ? 1 : 2
   const dispatch = useDispatch()
   const Comp = as || 'div'
   const router = useRouter()

   return (
      <Comp
         onClick={() => {
            dispatch(
               setRetailSlice({
                  retailWineDetails: data,
               }),
            )
         }}
         className={cn('no-underline w-[231px] p-0 aspect-square flex flex-col gap-2 justify-center', className)}
         {...props}
      >
         <div className="relative bg-beige py-2 flex items-end justify-center rounded-2xl h-[320px]">
            <div className="relative w-[230px] h-[300px]">
               <Image
                  src={data?.imagenormal || winePicture}
                  alt="Wine Picture"
                  placeholder="blur"
                  blurDataURL={data?.imagenormal}
                  fill
                  className="object-contain mix-blend-multiply brightness-125"
               />
            </div>
         </div>

         <main className="text-center mt-6">
            <Heading className="text-base md:text-xl font-medium" lineClamp={lineClamp}>
               {data?.winename || 'Glory Peach Wine'}
            </Heading>
            <Paragraph
               lineClamp={lineClamp}
               className="text-sm sm:text-base font-gilda-display text-muted-foreground mt-0.5 -tracking-tighter"
            >
               {data?.maindescription || 'Consists of 2 Bottles, 0.75L'}
            </Paragraph>

            <p className="text-primary font-podkova text-sm sm:text-base md:text-lg mt-1">
               {data?.bottlesize || 97} NM | ${data?.price || 120.0}
            </p>
         </main>

         {!data?.isLink && props.href ? (
            <MButton
               route={props.href}
               className="self-center"
               onClick={() => {
                  dispatch(
                     setRetailSlice({
                        retailWineDetails: data,
                     }),
                  )

                  router.push(`/retail/wines/${data?.winecatalogid}`)
               }}
            >
               VIEW DETAILS
            </MButton>
         ) : (
            ''
         )}
      </Comp>
   )
}
