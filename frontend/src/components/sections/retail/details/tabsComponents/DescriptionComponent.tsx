'use client'
import React from 'react'
import { useSelector } from 'react-redux'

import { Heading, Paragraph } from '@/src/components/ui'
import { selectRetailSlice } from '@/src/store/features/retail/retailSlice'
import SanitizeHtml from '@/src/utils/helpers'

const DescriptionComponent = () => {
   const { retailWineDetails } = useSelector(selectRetailSlice)

   return (
      <section className="text-base font-inters">
         <Heading order={4} className="md:text-base text-red-secondary">
            Region: {retailWineDetails?.region || '-'}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light underline">
            {retailWineDetails?.country || '-'}
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Score:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            {retailWineDetails?.score} <br />
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Review:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            {retailWineDetails?.review || '-'} {retailWineDetails?.reviewer || '-'}
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Provenance:{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">The Multitude Cellar</Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Notes:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            Lightly scuffed, lightly bin soiled capsule, 6 very lightly scuffed, 6 scuffed, 6 very lightly bin soiled, 6
            bin soiled, 6 very lightly damp stained, 6 lightly damp stained, 5 nicked labels. Read about SWA&apos;s Six
            Point Inspection Process and how to read the condition notes.
         </Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Lot Location:{' '}
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">Orange County</Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Estimate:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            Other lots from this producer Other lots from this producer and vintage $2,250
         </Paragraph>

         <Heading order={4} className="md:text-base text-red-secondary">
            Staff Review:
         </Heading>  
         <div dangerouslySetInnerHTML={{ __html: SanitizeHtml(retailWineDetails?.staffreview || '') || '-' }} />
      </section>
   )
}

export default DescriptionComponent
