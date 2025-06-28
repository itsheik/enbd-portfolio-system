'use client'

import {
   AboutUs,
   AuctionHighLights,
   BottleShake,
   NewsLetter,
   RetailHighLights,
   SellGuide,
} from '~/components/sections/home'

function HomePage() {
   return (
      <div className="space-y-16 py-16">
         <AboutUs />
         <SellGuide />
         <AuctionHighLights />
         <RetailHighLights subtitle='' />
         <NewsLetter />
         <BottleShake />
      </div>
   )
}

export default HomePage
