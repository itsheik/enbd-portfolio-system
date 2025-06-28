'use client'

import { usePathname } from 'next/navigation'

import { InternalLink } from '~/components/ui'
import { PAGE_NAMES, USER_DASHBOARD_ROUTES, USER_DASHBOARD_ROUTES_NAME } from '~/constants/page-constants'
import { cn } from '~/lib'

type Props = object

const DashboardSidebar = (props: Props) => {
   const pathname = usePathname()

   return (
      <div className="w-full bg-beige rounded-2xl py-4">
         {USER_DASHBOARD_ROUTES_NAME.map((route, index) => {
            return (
               <div
                  key={index}
                  className={cn('flex items-center gap-2 w-full', {
                     'pt-2': route === PAGE_NAMES[pathname] && index < USER_DASHBOARD_ROUTES_NAME.length - 1 && index > 0,
                  })}
               >
                  <div
                     className={cn(
                        'w-full px-3 py-2',
                        {
                           'bg-red-secondary rounded-r-full w-[90%]': route === PAGE_NAMES[pathname],
                        },
                        {
                           'border-b-2 border-b-white-primary ': index !== USER_DASHBOARD_ROUTES_NAME.length - 1,
                        },
                     )}
                  >
                     <InternalLink
                        href={USER_DASHBOARD_ROUTES[route]}
                        className={cn('text-red-secondary text-sm', {
                           'text-white': route === PAGE_NAMES[pathname],
                        })}
                     >
                        {route}
                     </InternalLink>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default DashboardSidebar
