import Image from 'next/image'

import wineFooter from '~/assets/images/about-footer.png'
import { SectionBanner, SectionContainer } from '~/components/sections'
import { Heading, InternalLink, MAnchor, Paragraph } from '~/components/ui'
import { appConfig, generateSeoMetadata } from '~/config'
import { routes } from '~/constants'

export const metadata = generateSeoMetadata({ title: 'About Us', canonicalUrlRelative: routes.about })

const AboutPage = () => {
   return (
      <section className="space-y-24">
         <div className="space-y-16">
            <SectionBanner title="About Us" text="" buttonLabel="" />
            <SectionContainer className="space-y-8 text-center">
               <Heading order={2} className="text-4xl sm:text-5xl font-normal ">
                  ENBD Portfolio
               </Heading>

               <Paragraph className="text-base md:text-lg">
                  ENBD Portfolio conducts weekly internet auctions utilizing its state-of-the-art website and bidding
                  platform. Our firm offers the most competitive incentives and state-of-the-art technology for the
                  benefit of our global consignors and buyers alike. We offer the rarest, greatest wines and spirits of
                  the world as well as an impressive range of more modestly priced collectible and investment-grade
                  wines.
               </Paragraph>

               <Paragraph className="text-base md:text-lg">
                  Backed by decades of auction expertise and driven by a team of dedicated fine and rare wine
                  specialists, ENBD Portfolio is committed to offering buyers and sellers alike the most accessible,
                  expansive, and flexible auction, retail and storage services available for what is simply the world’s
                  greatest consumable and collectible product.
               </Paragraph>

               <Paragraph className="text-base md:text-lg">
                  ENBD Portfolio operates professional refrigerated storage facilities in Santa Ana and Newport Beach. We
                  also offer commerical pallet storage at our facility in Santa Ana.{' '}
                  <InternalLink variant="underlined" href={routes.storage.moving}>
                     Read more about storage here.
                  </InternalLink>
               </Paragraph>

               <Paragraph className="text-base md:text-lg">
                  ENBD Portfolio operates a full-service retail storefront at it&lsquo;s Santa Ana location.
                  <InternalLink variant="underlined" href={routes.storage.moving}>
                     View our inventory available for direct purchase.
                  </InternalLink>
               </Paragraph>

               <Paragraph className="text-base md:text-lg">
                  For customer service, shipment scheduling and information, provenance inquiries, photograph requests
                  email us at{' '}
                  <MAnchor
                     variant="underlined"
                     className="text-base md:text-lg"
                     href={`mailto:${appConfig.supportEmail}`}
                  >
                     {appConfig.supportEmail}
                  </MAnchor>{' '}
                  or call us at{' '}
                  <MAnchor variant="underlined" className="text-base md:text-lg" href={`tel:${appConfig.contactNo}`}>
                     {appConfig.contactNo}
                  </MAnchor>
                  .
               </Paragraph>
            </SectionContainer>
         </div>

         <Image src={wineFooter} alt="wine footer" placeholder="blur" className="size-full" />
      </section>
   )
}

export default AboutPage
