import React from 'react'

import { SectionContainer } from '../section-container'

type Props = object

const CustomerTradeDetails = (props: Props) => {
   return (
      <SectionContainer aria-labelledby="about-heading">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div className="relative h-full w-full aspect-video md:aspect-square md:h-[500px] rounded-md overflow-hidden"></div>
         </div>
      </SectionContainer>
   )
}

export default CustomerTradeDetails
