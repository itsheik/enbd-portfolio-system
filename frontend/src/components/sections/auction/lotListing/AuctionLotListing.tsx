'use client'

import ProductToolbar from '@/src/components/sections/ProductToolbar'
import Loader from '@/src/components/ui/Loader'
import { useAuctionData } from '@/src/hooks/auction/useAuctionData'

import { AuctionListingCard } from '~/components/cards/AuctionListingCard'

const AuctionLotListing = () => {
   const { auctionLotListings, isLoading } = useAuctionData()

   return (
      <div className="w-full">
         {auctionLotListings?.total ? <ProductToolbar totalItems={auctionLotListings.total} /> : null}
         {isLoading ? (
            <div className="max-h-screen self-center h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : auctionLotListings && auctionLotListings.auctionLots.length ? (
            auctionLotListings.auctionLots.map((item, i) => {
               return <AuctionListingCard key={i} item={item} />
            })
         ) : (
            <div className="max-h-screen self-center h-full flex justify-center items-center">No Listing Available</div>
         )}
      </div>
   )
}

export default AuctionLotListing
