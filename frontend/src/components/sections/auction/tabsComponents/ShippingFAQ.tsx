import React from 'react'

import { Heading, Paragraph } from '@/src/components/ui'

const ShippingFAQ = () => {
   return (
      <section className="text-base font-inters">
         <Heading order={4} className="md:text-base text-red-secondary">
            Warehouse Locations{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            We offer wine stored in two different warehouses. All retail wine resides in our Southern California
            location. Each auction lot lists the location of the wine so you know where it is currently stored. We will
            automatically arrange the logistics to import or export your wine depending on your location as part of our
            shipping process.
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Southern California Warehouse{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            1641 East Saint Andrew Pl, Santa Ana CA 92705
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Hong Kong Warehouse{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            JAS Forwarding (H.K.) Ltd. 52-62 Tsing Yi Road, Tien Chu (Tsing Yi) Industrial Centre, Hong Kong Set your
            default search filter and only see the locations you want.
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Retail Locations{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            We have a brick and mortar retail store at our Santa Ana, California location
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Santa Ana Location
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            1641 East Saint Andrew Pl, Santa Ana CA 92705
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Shipping Information{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            We offer an array of full service fulfilment options for your purchases with us. Below are some of our
            frequently asked questions. If we didn't answer your question, please contact us and we'll be happy to help.
         </Paragraph>
      </section>
   )
}

export default ShippingFAQ
