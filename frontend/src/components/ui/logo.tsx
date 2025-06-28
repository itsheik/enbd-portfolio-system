'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { InternalLink } from './internal-link'

import { routes } from '~/constants'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { spectrum, spectrumWhite } from '~/utils/images/main-page'

export const Logo = () => {
   const pathname = usePathname()

   let src = spectrum

   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      src = spectrumWhite
   }

   return (
      <InternalLink href={routes.home} className="flex items-center gap-2">
         <Image src={src} alt="Spectrum Logo" width={135} placeholder="blur" />
      </InternalLink>
   )
}
