import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

import { routes } from '~/constants'

export const footerLinks = [
   {
      title: 'Auctions',
      links: [
         { label: 'Current Auctions', href: routes.auctions.current },
         { label: 'Upcoming Auction Schedule', href: routes.auctions.upcoming },
         { label: 'Prices Realized', href: routes.auctions.prices },
      ],
   },
   {
      title: 'Services',
      links: [
         { label: 'Payment Information', href: routes.auctions.payment },
         { label: 'Shipping FAQ', href: routes.services.faq },
         { label: 'Terms and Conditions', href: routes.services.terms },
         { label: 'Retail Sales', href: routes.retail.wines },
         { label: 'Privacy Policy', href: routes.services.terms },
      ],
   },
   {
      title: 'Info',
      links: [
         { label: 'How It Works', href: routes.sell.how },
         { label: 'Online Consignment Form', href: routes.sell.consignment },
         { label: 'Request Appraisal', href: routes.sell.appraisal },
         { label: 'Testimonials', href: routes.sell.testimonials },
         // { label: 'Accessibility', href: '/accessibility' },
      ],
   },
   {
      title: 'Company',
      links: [
         { label: 'Professional Wine Storage', href: routes.storage.professional },
         { label: 'Moving Services', href: routes.storage.moving },
         { label: 'About Us', href: routes.about },
         { label: 'Login / Sign up', href: routes.auth.signIn },
      ],
   },
]

export const socialLinks = [
   { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
   { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
   { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
   { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
]

export type FooterLink = (typeof footerLinks)[number]
export type FooterLinkItem = FooterLink['links'][number]

export type SocialLink = (typeof socialLinks)[number]
