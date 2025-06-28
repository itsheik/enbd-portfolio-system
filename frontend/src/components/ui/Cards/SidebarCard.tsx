import { type PropsWithChildren } from 'react'

import { cn } from '~/lib'

type SidebarCardProps = {
   title?: string
   backgroundColor?: string
   textColor?: string
   bodyStyle?: string
} & PropsWithChildren

const SidebarCard = ({ title, backgroundColor, children, bodyStyle }: SidebarCardProps) => {
   return (
      <div className={`w-full bg-beige ${backgroundColor} rounded-2xl pb-4 relative`}>
         <header className={`bg-red-secondary rounded-t-2xl px-3 py-2 text-white font-medium uppercase`}>
            {title}
         </header>

         <div className={cn('flex flex-col gap-1 px-3 py-2', bodyStyle)}>{children}</div>
      </div>
   )
}

export default SidebarCard
