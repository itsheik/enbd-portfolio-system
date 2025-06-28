import { routes } from '~/constants'
import { generateUUID } from '~/lib'

export const navItems = [
   { id: generateUUID(), label: 'Home', href: routes.home, hasDropdown: false },
   {
      id: generateUUID(),
      label: 'Orders',
      hasDropdown: true,
      items: [{ id: generateUUID(), label: 'Order Entry', href: routes.order }],
   },
]

export type NavItem = {
   id: string
   label: string
   icon?: React.ReactNode
   href: string
   hasDropdown: boolean
   items?: Array<Omit<NavItem, 'hasDropdown' | 'items'>>
}
