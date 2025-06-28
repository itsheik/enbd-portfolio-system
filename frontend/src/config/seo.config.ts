/** @format */

import type { Metadata } from 'next'
import { type SoftwareApplication, type WithContext } from 'schema-dts'

import { appConfig } from './app.config'

export type SeoMeta = {
   canonicalUrlRelative?: string
   extraTags?: Record<string, never>
} & Metadata

export const generateSeoMetadata = ({
   title,
   description,
   keywords,
   openGraph,
   canonicalUrlRelative,
   extraTags,
}: SeoMeta = {}): SeoMeta => {
   return {
      title: appConfig.appName ?? title,
      description: description ?? appConfig.appDescription,
      keywords: keywords ?? [appConfig.appName],
      applicationName: appConfig.appName,

      metadataBase: new URL(
         process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : `https://${appConfig.domainName}/`,
      ),

      openGraph: {
         title: openGraph?.title ?? appConfig.appName,
         description: openGraph?.description ?? appConfig.appDescription,
         url: openGraph?.url ?? `https://${appConfig.domainName}/`,
         siteName: (openGraph?.title as string) ?? appConfig.appName,

         locale: 'en_US',
         type: 'website',
      },

      twitter: {
         title: openGraph?.title ?? appConfig.appName,
         description: openGraph?.description ?? appConfig.appDescription,

         card: 'summary_large_image',
         creator: appConfig.social.twitter.handle,
      },

      ...(canonicalUrlRelative && {
         alternates: {
            canonical: canonicalUrlRelative,
         },
      }),

      ...extraTags,
   }
}

export const jsonLd: WithContext<SoftwareApplication> = {
   '@context': 'https://schema.org',
   '@type': 'SoftwareApplication',
   name: appConfig.appName,
   description: appConfig.appDescription,
   image: `https://${appConfig.domainName}/icon.png`,
   url: `https://${appConfig.domainName}/`,
   author: {
      '@type': 'Organization',
      name: appConfig.social.twitter.handle,
   },
   datePublished: '2024-01-01',
   applicationCategory: 'WebApplication',
   aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
   },
   offers: [
      {
         '@type': 'Offer',
         price: '0.00',
         priceCurrency: 'USD',
      },
   ],
   operatingSystem: 'Windows, macOS, Linux, iOS, Android',
   softwareVersion: '1.0.0',
   license: 'https://opensource.org/licenses/MIT',
   featureList: [
      'Weekly online wine and spirits auctions',
      'Quarterly live wine auctions',
      'Retail wine store with fine and rare wines',
      'Complimentary wine appraisals and pricing estimates',
      'Industry-leading mobile bidding apps',
   ],
   applicationSuite: 'Spectrum Wine Auction Platform',
}
