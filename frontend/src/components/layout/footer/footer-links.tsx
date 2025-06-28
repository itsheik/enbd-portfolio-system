import { Anchor } from '@mantine/core'

import { MButton } from '../../ui'

import { FooterColumn } from './footer-column'

import { footerLinks, socialLinks } from '~/__mocks__'
import { SectionContainer } from '~/components/sections'

export const FooterLinks = () => (
   <div className="bg-primary text-white pb-4 pt-8">
      <SectionContainer className="space-y-8">
         <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-9 divide-x divide-[#EC9F2347]">
            {footerLinks.map((col, index) => (
               <FooterColumn key={index} links={col.links} title={col.title} />
            ))}

            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-4 mb-4">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                     <Anchor key={href} href={href} className="text-white" aria-label={label}>
                        <Icon className="h-5 w-5" />
                     </Anchor>
                  ))}
               </div>
               <MButton className="bg-red-600 hover:bg-red-700 max-w-36" aria-label="Contact us">
                  Contact Us
               </MButton>
            </div>
         </div>

         <p className="text-center text-sm text-secondary">
            ENBD Portfolio Auctions Corporate Office, Retail Store and Auction Operations.
         </p>
      </SectionContainer>
   </div>
)
