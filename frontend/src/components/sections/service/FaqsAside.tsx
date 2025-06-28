import React from 'react'
import { QuickLinksComponent } from '../../cards/QuickLinks'
import { Heading, Paragraph } from '~/components/ui'

const FaqsAside = () => {
   return (
      <aside className="w-[339px]">
         <QuickLinksComponent emailListing image widthFull />
         <div className="flex flex-col gap-3 py-4 px-3 bg-beige my-4 rounded-lg">
            <Heading order={2} className="text-2xl font-normal font-gilda-display text-red-secondary">
               Warehouse Locations
            </Heading>
            <Paragraph className="md:text-sm md:font-light">
               We offer wine stored in two different warehouses. All retail wine resides in our Southern California
               location. Each auction lot lists the location of the wine so you know where it is currently stored. We
               will automatically arrange the logistics to import or export your wine depending on your location as part
               of our shipping process.
            </Paragraph>
            <Paragraph className="md:text-sm md:font-light">
               Southern California Warehouse1641 East Saint Andrew Pl, Santa Ana CA 92705
            </Paragraph>
            <Paragraph className="md:text-sm md:font-light">
               Hong Kong Warehouse <br />
               JAS Forwarding (H.K.) Ltd.52-62 Tsing Yi Road, Tien Chu (Tsing Yi) Industrial Centre, Hong Kong Set your
               default search filter and only see the locations you want.
            </Paragraph>
         </div>
         <div className="flex flex-col gap-3 py-4 px-3 bg-beige my-4 rounded-lg">
            <Heading order={2} className="text-2xl font-normal font-gilda-display text-red-secondary">
               Retail Locations
            </Heading>
            <Paragraph className="md:text-sm md:font-light">
               We have a brick and mortar retail store at our Santa Ana, California location
            </Paragraph>
            <Paragraph className="md:text-sm md:font-light">
               Santa Ana Location
               <br />
               1641 East Saint Andrew Pl, Santa Ana CA 92705
            </Paragraph>
         </div>
      </aside>
   )
}

export default FaqsAside
