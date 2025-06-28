'use client'
import { type PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useGetCartData } from '../hooks/cart/useCartData'
import { useRetailFiltersData } from '../hooks/retail/useRetailFiltersData'
import { selectAuctionSlice, setAuctionSlice } from '../store/features/auction/auctionSlice'
import { selectUserSlice } from '../store/features/auth/authSlice'
import { selectGeneralSlice, setGeneralSlice } from '../store/features/general/generalSlice'
import { useFetchAuctionBidSummaryByCustomerMutation } from '../store/services/auction'
import { useLoadCountriesMutation } from '../store/services/general'
import { ApiErrorToast } from '../utils/helpers'

type Props = PropsWithChildren

const RootApiCalls = (props: Props) => {
   const dispatch = useDispatch()

   const [getCountries, { isLoading, isSuccess, isError, error, data }] = useLoadCountriesMutation()
   const [
      getAuctionBidSummaryByCustomer,
      {
         isLoading: isBidSummaryLoading,
         isSuccess: isBidSummarySuccess,
         isError: isBidSummaryError,
         data: bidSummaryData,
         error: bidSummaryError,
      },
   ] = useFetchAuctionBidSummaryByCustomerMutation()
   const retailFilters = useRetailFiltersData()
   const { isGetRetailItemToCartLoading, retailCart } = useGetCartData()

   const { countries } = useSelector(selectGeneralSlice)
   const { userId } = useSelector(selectUserSlice)
   const { auctionBidSummaryByCustomer } = useSelector(selectAuctionSlice)

   useEffect(() => {
      if (!isLoading && !isSuccess && !isError) {
         if (!countries) getCountries()
      } else if (isError) {
         ApiErrorToast(error)
      } else if (isSuccess) {
         dispatch(
            setGeneralSlice({
               countries: data.payload.data,
            }),
         )
      }
   }, [isLoading, isSuccess, isError, countries])

   useEffect(() => {
      if (!isBidSummaryLoading && !isBidSummarySuccess && !isBidSummaryError) {
         if (!auctionBidSummaryByCustomer && userId) {
            getAuctionBidSummaryByCustomer({
               customerId: userId,
            })
         }
      } else if (isBidSummaryError) {
         ApiErrorToast(bidSummaryError)
      } else if (isBidSummarySuccess) {
         dispatch(
            setAuctionSlice({
               auctionBidSummaryByCustomer: bidSummaryData.payload.data,
            }),
         )
      }
   }, [isBidSummaryLoading, isBidSummarySuccess, isBidSummaryError, auctionBidSummaryByCustomer, userId])

   return <div>{props.children}</div>
}

export default RootApiCalls
