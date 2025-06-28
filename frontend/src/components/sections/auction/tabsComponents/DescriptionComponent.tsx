import React from 'react'

import { Heading, Paragraph } from '@/src/components/ui'

const DescriptionComponent = () => {
   return (
      <section className="text-base font-inters">
         <Heading order={4} className="md:text-base text-red-secondary">
            Region:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light underline">France</Paragraph>
         <Heading order={4} className="md:text-base text-red-secondary">
            Score:
         </Heading>
         <Paragraph className="md:text-base text-base font-light md:font-light ">
            92 JMQ. &quot;Dark red. Lively. Good intensity. Young. Brilliant. Clean. Average color intensity. Fruity. Fine
            touches of caramel and licorice. Pure and fine. More powerful. More saline. Soft entry on the palate, very
            fruity, rounded and savory, developed, medium to full-bodied. The wine evolves toward juicy notes, always
            close to the fruit and melting in the mouth, with savor and power. It leaves in the finish a beautiful note
            of ripe fruit with no hard tannins, even if they are present; they are very palate-coating. Beautifully fine
            wine.&quot; Jean-Marc Quarin, Quarin.com, Apr 2001.
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
            bin soiled, 6 very lightly damp stained, 6 lightly damp stained, 5 nicked labels. Read about SWA&apos;s Six Point
            Inspection Process and how to read the condition notes.
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
      </section>
   )
}

export default DescriptionComponent
