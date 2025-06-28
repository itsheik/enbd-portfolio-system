'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AUCTION_SESSION_ID } from '@/src/constants/constants'
import { selectAuctionSlice, setAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { useFetchAuctionAndSessionsByStatusIDMutation } from '@/src/store/services/auction'
import { ApiErrorToast } from '@/src/utils/helpers'

import { AuctionPriceListCard } from '../../cards/AuctionPriceListCard'
import Loader from '../../ui/Loader'

const PricesRealizedSection = () => {
   const dispatch = useDispatch()
   const { auctionAndSessionsByStatusIDsData } = useSelector(selectAuctionSlice)
   const [
      getAuctionAndSessionsByStatusID,
      {
         isLoading: isLoadingStatus,
         isSuccess: isSuccessStatus,
         isError: isErrorStatus,
         data: dataStatus,
         error: errorStatus,
      },
   ] = useFetchAuctionAndSessionsByStatusIDMutation()

   useEffect(() => {
      if (!auctionAndSessionsByStatusIDsData) {
         getAuctionAndSessionsByStatusID({ statusId: AUCTION_SESSION_ID })
      }
   }, [auctionAndSessionsByStatusIDsData])

   useEffect(() => {
      if (isSuccessStatus && dataStatus) {
         dispatch(
            setAuctionSlice({
               auctionAndSessionsByStatusIDsData: dataStatus.payload.data,
            }),
         )
      }
   }, [isSuccessStatus, dataStatus])

   useEffect(() => {
      if (isErrorStatus && errorStatus) {
         ApiErrorToast(errorStatus)
      }
   }, [errorStatus])

   return (
      <section className="w-full">
         {isLoadingStatus ? (
            <div className="max-h-screen self-center h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : (
            <>
               {auctionAndSessionsByStatusIDsData?.map((item, i) => {
                  return <AuctionPriceListCard key={i} auction={item} />
               })}
            </>
         )}
      </section>
   )
}

export default PricesRealizedSection
