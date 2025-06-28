'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'

import { SectionBanner } from '../../section-banner'
import AuctionLotListingSection from '../lotListing/AuctionLotListingSection'

type Props = object

const AuctionListingCurrentSection = (props: Props) => {
   const { auctionAndSessionsByStatusIDsData } = useSelector(selectAuctionSlice)
   const router = useRouter()

   return (
      <>
         <SectionBanner
            title="AUCTION LOT LISTING"
            text={auctionAndSessionsByStatusIDsData?.[0]?.auctionDescription || ''}
            buttonLabel="View Auction Schedule and Details"
            click={() => router.push(routes.auctions.scheduleView)}
         />
         <AuctionLotListingSection />
      </>
   )
}

export default AuctionListingCurrentSection
