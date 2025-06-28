'use client'

import { useSelector } from 'react-redux'

import { routes } from '@/src/constants'
import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { formatDateToDateTime, formatDateToReadable } from '@/src/utils/helpers'

import { Heading, InternalLink } from '~/components/ui'

const ScheduedView = () => {
   const { auctionAndSessionsByStatusIDsData } = useSelector(selectAuctionSlice)

   return (
      <ul className="flex flex-col gap-4 list-disc w-full py-4">
         <li>
            <Heading order={2} className="text-sm sm:text-xl font-normal text-red-primary">
               {auctionAndSessionsByStatusIDsData?.[0]?.sessionName || ''}
            </Heading>

            <div className="flex flex-col gap-2 bg-table-body-primary rounded-lg p-4 w-full">
               {auctionAndSessionsByStatusIDsData?.[0]?.sessionDescription || ''}
            </div>
         </li>
         <li>
            <Heading order={2} className="text-sm sm:text-xl font-normal text-red-primary">
               Consignment Deadline
            </Heading>

            <div className="flex flex-col gap-2 bg-table-body-primary rounded-lg p-4 w-full">
               {formatDateToReadable(auctionAndSessionsByStatusIDsData?.[0]?.consignmentDeadline || '') || ''}
            </div>
         </li>
         <li>
            <Heading order={2} className="text-sm sm:text-xl font-normal text-red-primary">
               Auction Preview Information
            </Heading>

            <div className="flex flex-col gap-2 bg-table-body-primary rounded-lg p-4 w-full">
               <span>{auctionAndSessionsByStatusIDsData?.[0]?.venueName || ''}</span>
               <span>{auctionAndSessionsByStatusIDsData?.[0]?.previewDates || ''}</span>
               <span>{auctionAndSessionsByStatusIDsData?.[0]?.address1 || ''}</span>
               <span>
                  {auctionAndSessionsByStatusIDsData?.[0]?.city}, {auctionAndSessionsByStatusIDsData?.[0]?.state}{' '}
                  {auctionAndSessionsByStatusIDsData?.[0]?.zip}
               </span>
            </div>
         </li>

         <li>
            <Heading order={2} className="text-sm sm:text-xl font-normal text-red-primary">
               Online Bidding Format
            </Heading>

            <div className="flex flex-col gap-2 bg-table-body-primary rounded-lg p-4 w-full">
               This is a timed auction and all bidding for lots in this auction will end at the specified time below.
               There is no live bidding for this auction. All lots that have met reserve will sell at the current price
               when the auction ends. You can bid as many times as you want during the time the auction is open for
               bidding.
            </div>
         </li>

         <li>
            <Heading order={2} className="text-sm sm:text-xl font-normal text-red-primary">
               Auction Sessions
            </Heading>

            <div className="flex justify-between gap-2 bg-table-body-primary w-full p-4 rounded-lg">
               <div className="flex flex-col gap-2 rounded-lg p-4 w-full bg-table-body-primary">
                  <span className="font-bold">
                     Session #{auctionAndSessionsByStatusIDsData?.[0]?.sessionNumber || ''}:{' '}
                     {auctionAndSessionsByStatusIDsData?.[0]?.sessionName || ''}
                  </span>
                  <span>{auctionAndSessionsByStatusIDsData?.[0]?.sessionDescription || ''}</span>

                  <ul className="flex flex-col gap-2">
                     <li>
                        <span className="font-medium">- Lots in Session:</span>
                        <span>{'1-3621 / 3620'}</span>
                     </li>
                     <li>
                        <span className="font-medium">- Lots Auction Opens:</span>
                        <span>{formatDateToDateTime(auctionAndSessionsByStatusIDsData?.[0]?.startDateTime || '')}</span>
                     </li>
                     <li>
                        <span className="font-medium">- Auction End:</span>
                        <span>{formatDateToDateTime(auctionAndSessionsByStatusIDsData?.[0]?.endDateTime || '')}</span>
                     </li>
                  </ul>
               </div>

               <div className="flex gap-2 flex-col text-xs justify-end items-center">
                  <span className="text-red-secondary rounded-lg p-4 bg-table-body-secondary w-max">
                     *All dates and times are in PT
                  </span>

                  <InternalLink href={routes.auctions.current} className="text-b-red-secondary underline">
                     view lots in this session
                  </InternalLink>
               </div>
            </div>
         </li>
      </ul>
   )
}

export default ScheduedView
