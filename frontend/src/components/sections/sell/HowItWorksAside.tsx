import React from 'react'
import Image from 'next/image'

import { Pouring, sellAuction } from '@/src/utils/images/main-page'

import { QuickLinksComponent } from '../../cards/QuickLinks'

import { Heading, Paragraph } from '~/components/ui'

const HowItWorksAside = () => {
   return (
      <aside className="max-w-[339px]">
         <Image src={Pouring} alt="wine footer" placeholder="blur" className="w-full min-h-[360px] object-cover" />
         <div className="flex flex-col gap-3 py-4 px-3 bg-beige my-4 rounded-lg">
            <Heading order={2} className="text-2xl font-normal font-gilda-display text-red-secondary">
               Consignment Information
            </Heading>
            <Paragraph className="md:text-sm md:font-light">
               Spectrum Wine Auctions intends to make selling or consigning your wine and spirits to auction an easy,
               streamlined and always personal experience. This starts with the estimate. Our experts can accurately
               identify and determine the current market value of your property for outright sale or at auction. To
               schedule a complimentary, confidential wine appraisal, please call us at (949) 748-4845 or fill out one
               of the online forms below.
            </Paragraph>
            <Paragraph className="md:text-sm md:font-light">
               <span className="font-bold">Contact Us About Your Wine</span>
               <br />
               1641 East Saint Andrew PlSanta Ana, CA, 92705United States of America 
            </Paragraph>
            <Paragraph className="md:text-sm md:font-light">
               Telephone: (949) 748-4845
               <br />
               Fax: (949) 567-1360
               <br />
               Email: Info@SpectrumWine.com
            </Paragraph>
         </div>
      </aside>
   )
}

export default HowItWorksAside
