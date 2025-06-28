import { routes } from '~/constants'
import { generateUUID } from '~/lib'

export const navItems = [
   { id: generateUUID(), label: 'Home', href: routes.home, hasDropdown: false },
   {
      id: generateUUID(),
      label: 'Auctions',
      hasDropdown: true,
      items: [
         { id: generateUUID(), label: 'Current Auctions', href: routes.auctions.current },
         { id: generateUUID(), label: 'Upcoming Auctions', href: routes.auctions.upcoming },
         { id: generateUUID(), label: 'The SWA inspection process', href: routes.auctions.inspection },
         { id: generateUUID(), label: 'Prices Realized', href: routes.auctions.prices },
         { id: generateUUID(), label: 'Payment Information', href: routes.auctions.payment },
         { id: generateUUID(), label: 'Shipping FAQ', href: routes.services.faq },
         { id: generateUUID(), label: 'Terms and Conditions', href: routes.services.terms },
      ],
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
