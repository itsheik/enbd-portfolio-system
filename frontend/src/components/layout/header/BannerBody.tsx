'use-client'

import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { MCarousel, type MCarouselProps, MCarouselSlide } from '~/components/ui'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { wineCarouselProps } from '~/features/wine'
import { cn } from '~/lib'
import { mainPageWineGlass } from '~/utils/images/main-page'

type Props = object

const BannerBody = (props: Props) => {
   const pathname = usePathname()
   const matches = useMediaQuery('(min-width: 1024px)')

   if (!INCLUDE_NAV_STYLES.includes(pathname)) return <></>

   const carouselStyle: MCarouselProps = {
      ...wineCarouselProps,
      orientation: 'vertical',
      height: matches ? 650 : '100%',
      autoPlay: false,
   }

   return (
      <section className="flex-1">
         <div>{/* <DownChevSvg className="w-2 h-2 text-secondary" /> */}</div>
         <div
            className={cn(
               'max-w-8xl flex-1 mx-auto gap-5 py-4 px-10 md:px-8 font-gilda-display text-white-secondary md:text-7xl text-5xl self-center max-lg:text-center overflow-y-hidden h-[520px]',
               {
                  'h-[700px]': !matches,
               },
            )}
         >
            <MCarousel {...carouselStyle}>
               {[...Array(10).fill(Math.floor(Math.random() * 100))].map((_, index) => (
                  <MCarouselSlide key={index}>
                     <div className="lg:flex-row flex-col flex items-center justify-center">
                        <div className="lg:w-2/3 w-full">
                           SELL WITH <br /> SPECTRUM <span className="text-secondary">WINE</span>
                        </div>

                        <div className="relative lg:w-1/3 w-full flex items-center justify-center">
                           <Image
                              src={mainPageWineGlass}
                              alt="mainPageWineGlass"
                              width={800}
                              height={800}
                              // w-full h-full max-w-[410px] max-h-[490px]
                              className="
                              md:w-[410px] md:h-[490px] w-[310px] h-[390px]
                              "
                           />
                           <div className="absolute bg-secondary w-full md:h-[370px] h-[310px] md:max-w-[380px] max-w-[320px] -z-10 rounded-full" />
                        </div>
                     </div>
                  </MCarouselSlide>
               ))}
            </MCarousel>
         </div>

         {/* <section className="max-w-7xl flex-1 lg:flex-row flex-col mx-auto gap-5 px-5 py-4 md:px-2 flex items-center justify-center font-gilda-display text-white-secondary text-7xl self-center max-lg:text-center">
            <div className="lg:w-2/3 w-full">
               SELL WITH <br /> SPECTRUM <span className="text-secondary">WINE</span>
            </div>

            <div className="relative lg:w-1/3 w-full flex items-center justify-center">
               <Image
                  src={mainPageWineGlass}
                  alt="mainPageWineGlass"
                  width={800}
                  height={800}
                  className="w-full h-full max-w-[410px] max-h-[490px]"
               />
               <div className="absolute bg-secondary w-full h-4/5 max-w-[380px] -z-10 rounded-full" />
            </div>
         </section> */}
      </section>
   )
}

export default BannerBody
