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
   {
      id: generateUUID(),
      label: 'Sell/Consign',
      hasDropdown: true,
      items: [
         { id: generateUUID(), label: 'How it works', href: routes.sell.how },
         { id: generateUUID(), label: 'Online consignment form', href: routes.sell.consignment },
         { id: generateUUID(), label: 'Request appraisal', href: routes.sell.appraisal },
         { id: generateUUID(), label: 'Testimonials', href: routes.sell.testimonials },
      ],
   },
   {
      id: generateUUID(),
      label: 'Retail sales',
      hasDropdown: true,
      items: [
         { id: generateUUID(), label: 'View All Wines', href: routes.retail.wines },
         { id: generateUUID(), label: 'Retail Sales Terms', href: routes.retail.terms },
         { id: generateUUID(), label: 'Shipping FAQ', href: routes.services.faq },
      ],
   },
   {
      id: generateUUID(),
      label: 'Storage',
      hasDropdown: true,
      items: [
         { id: generateUUID(), label: 'Professional Wine Storage', href: routes.storage.professional },
         { id: generateUUID(), label: 'Moving Service', href: routes.storage.moving },
         { id: generateUUID(), label: 'Pay My Storage Invoice', href: routes.storage.invoice },
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
