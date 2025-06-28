import React from 'react'
import { Heading, Paragraph } from '~/components/ui'

const HowItWorksSection = () => {
   return (
      <section className="w-full flex flex-col gap-4">
         <div className="w-full bg-beige rounded-lg p-4">
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Spectrum Wine AuctionsThe May 2025 Auction: Part 4{' '}
            </Heading>
            <ul className="list-disc ml-5">
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     <span className="underline cursor-pointer">Contact us</span> for a complimentary appraisal of your
                     wine and spirits collection. We can accept your wine and spirits list in all formats.
                  </Paragraph>
               </li>
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     Your account manager, a Spectrum Wine Specialist, will prepare an appraisal of your wine collection
                     using real-time auction and retail sales data. Along with the appraisal we will propose and discuss
                     terms along with any logistics required for your consignment or purchase. Everything is up-front
                     and transparent; we never charge hidden fees.
                  </Paragraph>
               </li>
            </ul>
         </div>
         <div className="w-full bg-beige rounded-lg p-4">
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Step 2: Shipping and Inspection
            </Heading>
            <ul className="list-disc ml-5">
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     Spectrum Wine Auctions will arrange all the logistics to safely transport your collection from its
                     current location to our state-of-the-art temperature and humidity-controlled warehouse in Santa
                     Ana, CA. Our warehouse is monitored and controlled 24/7 by temperature and humidity sensors and is
                     monitored 24/7 by by a professional alarm service.
                  </Paragraph>
               </li>
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     Once it arrives, your collection will be inspected, cataloged and photographed. It will be
                     scheduled into the appropriate auction and listed for sale in as little as one week's time.
                  </Paragraph>
               </li>
            </ul>
         </div>
         <div className="w-full bg-beige rounded-lg p-4">
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Step 3: Auction and Payment
            </Heading>
            <ul className="list-disc ml-5">
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     We will market your wine and spirits collection to our established global list of thousands of
                     active wine and spirits buyers and collectors. We regularly place advertisements in many of the top
                     wine and spirits publications and on numerous wine and spirits websites.
                  </Paragraph>
               </li>
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     Proceeds from the sale of your collection are made 30 business days after the close of the auction.
                  </Paragraph>
               </li>
            </ul>
         </div>
         <div className="w-full bg-beige rounded-lg p-4">
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Appraisal Email Address and Online Forms
            </Heading>
            <ul className="list-disc ml-5">
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5">
                     For a preliminary evaluation of your wine, please send your wine list and digital images (if
                     available) by email to Info@SpectrumWine.com. A Spectrum representative will contact you promptly
                     about your appraisal.
                  </Paragraph>
               </li>
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5 underline">
                     Online Appraisal Request Form
                  </Paragraph>
               </li>
               <li>
                  <Paragraph className="font-light md:font-light text-base my-0.5 underline">
                     Ready to Consign? Use Our Online Consignment Form{' '}
                  </Paragraph>
               </li>
            </ul>
         </div>
      </section>
   )
}

export default HowItWorksSection
