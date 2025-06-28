'use client'
import { FiMail, FiPhone } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

import { SectionContainer } from '~/components/sections'
import { MAnchor } from '~/components/ui'
import { appConfig } from '~/config'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'

export const TopHeaderBar = () => {
   const pathname = usePathname()
   const mail = appConfig.supportEmail
   const phone = appConfig.contactNo

   if (INCLUDE_NAV_STYLES.includes(pathname)) return <></>

   return (
      <div className="bg-primary py-4 text-white">
         <SectionContainer className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3 divide-x-2">
               <MAnchor href={`tel:${phone}`} className="hover:underline text-white flex items-center gap-2 pr-3">
                  <FiPhone className="size-4" />
                  <span className="hidden sm:block text-xs sm:text-sm font-medium"> {phone}</span>
               </MAnchor>

               <MAnchor href={`mailto:${mail}`} className="hover:underline text-white flex items-center gap-2 pr-3">
                  <FiMail className="size-4" />
                  <span className="hidden sm:block text-xs sm:text-sm font-medium"> {mail}</span>
               </MAnchor>
            </div>
         </SectionContainer>
      </div>
   )
}
