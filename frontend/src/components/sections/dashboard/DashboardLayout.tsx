'use client'

import type React from 'react'
import { type PropsWithChildren } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { sellAuction } from '@/src/utils/images/main-page'

import ConsingmentDirector from './ConsingmentDirector'
import CurrentlyOpen from './CurrentlyOpen'
import DashboardSidebar from './DashboardSidebar'
import PastAuctions from './PastAuctions'

import { SectionBanner } from '~/components/sections'
import { INCLUDE_DASHBOARD_BANNER, PAGE_ROUTES } from '~/constants/page-constants'

// interface DashboardLayoutProps extends PropsWithChildren {
//    bannerTitle: string
// }

export const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
   const pathname = usePathname()
   let bannerTitle: string = ''

   if (INCLUDE_DASHBOARD_BANNER.includes(pathname)) {
      bannerTitle = 'My Account'
   }

   const showCurrentOpenPastAuctions = [PAGE_ROUTES.DASHBOARD.BIDDING, PAGE_ROUTES.DASHBOARD.CONSIGNMENTS].includes(
      pathname,
   )

   return (
      <section className="space-y-24">
         <div className="space-y-8 pb-8 bg-background">
            <SectionBanner title={bannerTitle} />
            <aside className="grid grid-cols-4 gap-4 max-w-8xl px-5 md:px-4 flex-1 mx-auto">
               <section className="md:col-span-1 col-span-full flex flex-col gap-4">
                  <DashboardSidebar />
                  {pathname === PAGE_ROUTES.DASHBOARD.USER_DASHBOARD ? <ConsingmentDirector /> : ''}
                  {showCurrentOpenPastAuctions ? (
                     <>
                        <CurrentlyOpen />
                        <PastAuctions />
                     </>
                  ) : (
                     ''
                  )}

                  {pathname === PAGE_ROUTES.DASHBOARD.USER_DASHBOARD ? (
                     <Image
                        src={sellAuction}
                        alt="wine footer"
                        placeholder="blur"
                        className="w-full min-h-[360px] object-cover"
                     />
                  ) : (
                     ''
                  )}
               </section>
               <section className="md:col-span-3 col-span-full">{children}</section>
            </aside>
         </div>
      </section>
   )
}
