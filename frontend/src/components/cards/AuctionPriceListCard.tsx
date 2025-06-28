import { type FC } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { type FetchAuctionAndSessionsByStatusIDsData } from '@/src/interface/auction'
import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'

import { useFormattedDateTime } from './../../hooks/useFormattedDateAndTime'

import WineBottle from '~/assets/images/wine-bottle.png'
import { Heading, Paragraph } from '~/components/ui'

type AuctionListingCard = {
   auction?: FetchAuctionAndSessionsByStatusIDsData
}

export const AuctionPriceListCard: FC<AuctionListingCard> = ({ auction }) => {
   const router = useRouter()
   const { auctionAndSessionsByStatusIDsData } = useSelector(selectAuctionSlice)

   return (
      <article
         aria-label="recommeauction price list card"
         className="w-full flex items-center justify-between flex-col gap-3 lg:flex-row bg-beige px-8 py-4 mb-4 rounded-lg"
      >
         <div className="flex items-center gap-6">
            <Image src={WineBottle} alt="Bottle Shake" placeholder="blur" className="w-10 " />
            <div className="w-[1px] h-[87px] bg-[#8282826B]"></div>
            <div>
               <Heading className="font-gilda-display font-normal text-red-secondary">{auction?.sessionName}</Heading>
               <Paragraph className="font-light text-sm">{auction?.auctionDescription}</Paragraph>
               <Paragraph className="font-light text-sm">
                  <span className="font-semibold">Pre-Bidding Ended:</span>
                  {useFormattedDateTime(auction?.endDateTime)}
               </Paragraph>
               <Paragraph className="font-light text-sm">
                  <span className="font-semibold">Live Internet Bidding Began:</span>
                  {useFormattedDateTime(auction?.liveStartDateTime)}
               </Paragraph>
               <Paragraph className="font-light text-sm">*All dates and times are in PST</Paragraph>
            </div>
         </div>
         <div className="w-full lg:max-w-[271px] ">
            <button
               className="bg-primary text-white px-2.5 py-3.5 rounded-lg text-sm w-full cursor-pointer"
               // onClick={() => router.push(`${routes.auctions.current}/${auction?.auctionID}`)}
            >
               View Auction Schedule and Details
            </button>

            <button
               className="bg-primary text-white px-2.5 py-3.5 rounded-lg text-sm block w-full mt-1.5 cursor-pointer"
               onClick={() =>
                  router.push(
                     `${routes.auctions.current}?auctionId=${auctionAndSessionsByStatusIDsData?.[0]?.auctionID}`,
                  )
               }
            >
               View Auction Lots
            </button>
         </div>
      </article>
   )
}
