'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { cn } from '~/lib'
import { BannerBg } from '~/utils/images/main-page'

type Props = object

const Banner = (props: Props) => {
   const pathname = usePathname()

   let customStyles = {
      banner: 'hidden',
   }
   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      customStyles = {
         banner: 'absolute inset-0 -z-50',
      }
   }

   return (
      <section className={cn('relative w-full h-full', customStyles.banner)}>
         <Image
            src={BannerBg}
            alt="Spectrum Logo"
            width={1024}
            height={1024}
            placeholder="blur"
            className="w-full h-full"
         />
         <div className="absolute inset-0 gradient-primary pointer-events-none" />
      </section>
   )
}

export default Banner
