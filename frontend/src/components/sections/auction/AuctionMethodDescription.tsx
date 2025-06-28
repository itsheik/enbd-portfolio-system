'use client'

import { CONDITION_NOTES, wineNotes } from '@/src/constants/constants'

import { Heading, Paragraph } from '../../ui'

export const AuctionMethodDescription = () => {
   return (
      <section>
         <section className="flex flex-col gap-5 ">
            <Heading order={2} className="text-red-secondary font-normal text-4xl ">
               Our 6 Point Process
            </Heading>
            <div>
               <Heading order={3} className=" text-sm font-semibold">
                  1. APPLICATION + VERIFICATION:
               </Heading>
               <Paragraph className="md:text-sm font-inter font-light">
                  All collections considered for approval and inclusion in our auctions are first subjected to a
                  rigorous owner interview as well as a verification of storage and transport process. No collection is
                  approved for our auctions out of hand; only collections that are provably well-stored and properly
                  transported are accepted as eligible for auction sale. Collections that do not meet these standards
                  are never accepted by Spectrum Wine for sale.
               </Paragraph>
            </div>
            <div>
               <Heading order={3} className=" text-sm font-semibold">
                  2. TRANSPORTATION + STORAGE:
               </Heading>
               <Paragraph className="md:text-sm font-inter font-light">
                  Once an approved collection is appraised and accepted for auction sale, it is transported at proper
                  wine storage temperature to our state-of-the-art, temperature- and humidity-controlled wine storage
                  facility in Orange County, California. Each collection’s various Auction Lots will reside here until
                  purchased in turn by a bidder. <br />
                  Built in 2004, our wine warehouse and company headquarters are located at 1641 E Saint Andrew Pl Santa
                  Ana CA 92705-4932 (33°43’27” N, 117°50’48” W) on the site of a former orchard. We are situated in the
                  heart of the South Coast AVA, nine miles from the Pacific Ocean, where mean annual temperatures and
                  mean annual humidity are approximately 65°F (18.3°C) and 65% respectively.
                  <br />
                  Our wine warehouse is refrigerated down to ideal wine storage temperature of about 54.9°F (12.7°C) and
                  65% humidity. The warehouse relies on a 24/7 state-of-the-art, high-capacity, commercial-grade Larkin
                  refrigeration system, including four condensing units and twelve evaporation coils.
               </Paragraph>
            </div>
            <div>
               <Heading order={3} className=" text-sm font-semibold">
                  3. INSPECTION + CATALOGUING:
               </Heading>
               <Paragraph className="md:text-sm font-inter font-light">
                  Once an approved collection has arrived at our wine storage facility, every bottle is individually
                  considered, inspected, assessed, and barcoded by hand by a member of our team of Wine Specialists.
                  Bottles are approved for sale at this stage purely on an individual basis; bottles that do not meet
                  our strict condition standards are immediately rejected for sale and returned to their owner. All
                  bottles are catalogued into our proprietary auction software system and individually barcoded with a
                  unique Inventory ID number; this barcode also features the producer, description/name/grape
                  variety/appellation, bottle format (L), and vintage of the wine in addition to its catalogued Auction
                  Lot quantity. Additional, unique identifying data are also included in the bottles’ barcode stickers.
                  Bottles are then laid down inside unique storage boxes sized according to the number of bottles
                  contained within each barcoded inventory item (i.e. Auction Lot). [More Details Below]
               </Paragraph>
            </div>
            <div>
               <Heading order={3} className=" text-sm font-semibold">
                  4. PHOTOGRAPHY:
               </Heading>
               <Paragraph className="md:text-sm font-inter font-light">
                  One bottle within every approved Auction Lot is selected to be photographed twice – once of the front
                  of the bottle and once of the back of the bottle. These two photographs are then linked to each item’s
                  unique Inventory ID number. This part of the process helps us both to confirm that the Lot was
                  correctly catalogued and to offer a real and transparent representation of that Lot to the upcoming
                  auction’s bidders.
               </Paragraph>
            </div>
            <div>
               <Heading order={3} className=" text-sm font-semibold">
                  6. LOCATION:
               </Heading>
               <Paragraph className="md:text-sm font-inter font-light">
                  Once Inspection, Photography, and Reporting are complete, every Auction Lot’s unique Inventory ID
                  number is scanned to a specific, named storage location within our wine warehouse facility. Every
                  unique Inventory ID number carries within it a specific, trackable update and location history. Note
                  all Auction Lots are available for in-person, pre- or mid-sale inspection (by advance appointment) at
                  our Orange County wine facility.
               </Paragraph>
            </div>
         </section>
         <section className="block my-8">
            <Heading order={2} className="text-red-secondary font-normal text-4xl ">
               Point #3 Continued: Inspection + Cataloguing
            </Heading>
            <div>
               <Heading order={3} className="text-sm font-semibold ">
                  The Details
               </Heading>
               <ul className="list-disc pl-5 space-y-2">
                  {wineNotes.map((note, index) => (
                     <li key={index} className="text-sm font-light">
                        {note}
                     </li>
                  ))}
               </ul>
            </div>
         </section>
         <section className="block ">
            <Heading order={2} className="text-red-secondary font-normal text-4xl ">
               The Condition Notes:
            </Heading>

            <ul className="list-disc pl-5 space-y-2 mb-5 ">
               {CONDITION_NOTES.map((note, index) => (
                  <li key={index} className="text-sm font-light">
                     {note}
                  </li>
               ))}
            </ul>
         </section>
      </section>
   )
}
