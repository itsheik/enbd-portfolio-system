import type { ValueOf } from 'type-fest'

import { PAGE_ROUTES } from './page-constants'

export const routes = {
   home: '/',

   /* AUTH */
   auth: {
      signIn: '/auth/login',
      signUp: '/auth/register',
      forgetPassword: '/auth/forget-password',
   },

   /* USER */
   account: '/user/account/dashboard/',
   user: {
      dashboard: PAGE_ROUTES.DASHBOARD.USER_DASHBOARD,
   },

   /* ORDER */
   order: '/order/',
   trackDetails: (orderId: string) => `/order/track/${orderId}`,

   /* AUCTIONS */
   auctions: {
      current: '/auctions/current',
      upcoming: '/auctions/upcoming',
      inspection: '/auctions/inspection',
      bidding: '/auctions/bidding',
      prices: '/auctions/prices',
      payment: '/auctions/payment',
      faqs: '/auctions/faqs',
      terms: '/auctions/terms-conditions',
      scheduleView: '/auctions/schedule-view',
   },

   /* SERVICES */
   services: {
      payment: '/service/payment',
      faq: '/service/faqs',
      terms: '/service/terms-conditions',
      retail: '/service/retail-sales',
      privacy: '/service/privacy-policy',
   },

   /* SELL */
   sell: {
      how: '/sell/how',
      consignment: '/sell/consignment',
      appraisal: '/sell/appraisal',
      testimonials: '/sell/testimonials',
   },

   /* RETAIL */
   retail: {
      wines: '/retail/wines',
      terms: '/retail/terms-conditions',
      special: '/retail/special',
   },

   /* STORAGE */
   storage: {
      professional: '/storage/professional',
      moving: '/storage/moving-services',
      invoice: '/storage/invoice',
   },

   about: '/about-us',
   contact: '/contact',
   cart: '/cart',
   checkout: '/checkout',
   shipping_options: '/shipping-options',
} as const

type ExtractRoutes<T> = T extends (...args: never[]) => string
   ? T
   : T extends string
     ? T
     : T extends object
       ? ExtractRoutes<ValueOf<T>>
       : never

export type Routes = ExtractRoutes<typeof routes>
