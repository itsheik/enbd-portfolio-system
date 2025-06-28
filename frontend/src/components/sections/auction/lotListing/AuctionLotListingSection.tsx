'use client'

import { CustomeDarawer } from '@/src/components/ui/Drawer/CustomDrawer'

import { FiltersSidebar } from '../../FilterSidebar'
import { SectionContainer } from '../../section-container'

import AuctionLotListing from './AuctionLotListing'

type Props = object

const AuctionLotListingSection = (props: Props) => {
   return (
      <SectionContainer className="flex flex-row gap-5 max-[880px]:flex-col">
         <div className="hidden max-[880px]:block w-1/3 max-w-[352px]">
            <CustomeDarawer>
               <FiltersSidebar />
            </CustomeDarawer>
         </div>
         <div className="block max-[880px]:hidden w-1/3 max-w-[352px]">
            <FiltersSidebar />
         </div>
         <AuctionLotListing />
      </SectionContainer>
   )
}

export default AuctionLotListingSection
