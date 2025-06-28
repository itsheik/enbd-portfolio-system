'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UPCOMMING_AUCTIONS_TABLE_HEADER } from '@/src/constants/constants'
import { type UpcommingResponse } from '@/src/interface/auction'
import { selectUpcommingAuction, setAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { useUpcommingAuctionsByFacilityMutation } from '@/src/store/services/auction'
import { ApiErrorToast } from '@/src/utils/helpers'

import Loader from '../../ui/Loader'

import { Heading, Paragraph } from '~/components/ui'

const UpcommingAuctionSection = () => {
   const dispatch = useDispatch()
   const [getUpcommingAuctions, { isLoading, isSuccess, isError, data, error }] =
      useUpcommingAuctionsByFacilityMutation()
   const upcommingAuctions = useSelector(selectUpcommingAuction)
   useEffect(() => {
      getUpcommingAuctions({})
   }, [])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      if (isSuccess && data) {
         dispatch(
            setAuctionSlice({
               upcommingAuctions: data?.payload.data,
            }),
         )
      }
   }, [isSuccess])

   return (
      <section className="w-full">
         <Heading order={2} className="text-primary font-normal text-4xl mb-6">
            Upcoming Auction Schedule
         </Heading>
         {isLoading ? (
            <div className="max-h-screen self-center h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : (
            <table className="table-auto">
               <thead>
                  <tr className="bg-table-head rounded-sm  text-center text-white border-2 shadow-[0px_4px_3.2px_0px_#00000040]">
                     {UPCOMMING_AUCTIONS_TABLE_HEADER.map((item, i) => {
                        return (
                           <th className="py-2" key={i}>
                              {item}
                           </th>
                        )
                     })}
                  </tr>
               </thead>
               <tbody>
                  {upcommingAuctions?.map((item: UpcommingResponse, i: number) => {
                     return (
                        <tr key={i} className={`${i % 2 == 1 ? 'bg-beige' : 'bg-white'} w-full`}>
                           <td className="py-4 px-6 w-1/4">
                              {item.startDateTime} - {item?.endDateTime}
                              <Paragraph>*All dates and times are in PT</Paragraph>
                           </td>
                           <td className="py-4 px-6 w-1/4">
                              <button className="block underline cursor-pointer">ENBD Portfolio Auctions</button>
                              {item.venueName}
                              <br />
                              {item?.address2 + ', ' + item?.city + ', ' + item.state + ', ' + item.zip}
                              <br />
                              Phone: {item?.phone1}
                           </td>
                           <td className="py-4 px-6 w-1/4">
                              {item.name}
                              <button className="block underline cursor-pointer">View Auction Details</button>
                           </td>
                           <td className="text-primary font-semibold py-4 px-6 w-1/4 text-center">
                              {item.consignmentDeadline}
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         )}
      </section>
   )
}

export default UpcommingAuctionSection
