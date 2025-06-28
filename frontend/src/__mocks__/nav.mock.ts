import { routes } from '~/constants'
import { generateUUID } from '~/lib'

export const navItems = [
   { id: generateUUID(), label: 'Home', href: routes.home, hasDropdown: false },
   {
      id: generateUUID(),
      label: 'Orders',
      hasDropdown: true,
      items: [{ id: generateUUID(), label: 'dashboard', href: routes.order }],
   },
   { id: generateUUID(), label: 'About', href: routes.about, hasDropdown: false },
   { id: generateUUID(), label: 'Contact', href: routes.contact, hasDropdown: false },
]

export type NavItem = {
   id: string
   label: string
   icon?: React.ReactNode
   href: string
   hasDropdown: boolean
   items?: Array<Omit<NavItem, 'hasDropdown' | 'items'>>
}
