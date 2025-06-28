import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AUCTION_SESSION_ID } from '@/src/constants/constants'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { selectAuctionSlice, setAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { selectUserSlice, setLogoutLoading } from '@/src/store/features/auth/authSlice'
import {
   useAddBidMutation,
   useFetchAuctionAndSessionsByStatusIDMutation,
   useLoadAuctionLotListingMutation,
   useLoadWineRegionsByAuctionsIdMutation,
} from '@/src/store/services/auction'
import { useFetchLotStatusForLiveBiddingQuery } from '@/src/store/services/lot'
import { allFilterData, ApiErrorToast, ApiSuccessToast, matchCountry } from '@/src/utils/helpers'

export const useAuctionData = () => {
   const dispatch = useDispatch()
   const { userId } = useSelector(selectUserSlice)
   const { auctionLotListings, auctionAndSessionsByStatusIDsData } = useSelector(selectAuctionSlice)

   const [getAllAuctionLotListings, { isLoading, isSuccess, isError, data, error }] = useLoadAuctionLotListingMutation()
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

   const [
      loadWineRegionsByAuctionId,
      {
         isLoading: isLoadingWineRegions,
         isSuccess: isSuccessWineRegions,
         isError: isErrorWineRegions,
         data: dataWineRegions,
         error: errorWineRegions,
      },
   ] = useLoadWineRegionsByAuctionsIdMutation()

   // Polling-enabled query for fetching live bidding status
   const {
      isLoading: fetchLotsStatusLiveBiddingIsLoading,
      isSuccess: fetchLotsStatusLiveBiddingIsSuccess,
      isError: fetchLotsStatusLiveBiddingIsError,
      error: fetchLotsStatusLiveBiddingError,
      data: fetchLotsStatusLiveBiddingData,
   } = useFetchLotStatusForLiveBiddingQuery(
      {
         lotIds:
            auctionLotListings && auctionLotListings.auctionLots
               ? auctionLotListings.auctionLots.map(lot => lot.lotid).toString()
               : '',
      },
      {
         pollingInterval: 6000,
         skipPollingIfUnfocused: true,
         skip: !userId || !auctionLotListings,
      },
   )

   const { country, size, brand, categories, currentPage, keyword, rating, state, auctionId, vintage, subRegion } =
      allFilterData()

   // Reset page to 0 whenever any filter changes (except page itself)
   useEffect(() => {
      if (currentPage > 0) {
         updateQueryParams('page', '0')
      }
   }, [country, size, brand, categories, keyword, rating, state, vintage, auctionId, subRegion])

   useEffect(() => {
      if (!auctionAndSessionsByStatusIDsData) {
         getAuctionAndSessionsByStatusID({ statusId: AUCTION_SESSION_ID })
      }
   }, [auctionAndSessionsByStatusIDsData, getAuctionAndSessionsByStatusID])

   useEffect(() => {
      if (isSuccessStatus && dataStatus) {
         dispatch(
            setAuctionSlice({
               auctionAndSessionsByStatusIDsData: dataStatus.payload.data,
            }),
         )

         loadWineRegionsByAuctionId({
            auctionID: dataStatus.payload.data?.[0]?.auctionID,
         })
      }
   }, [isSuccessStatus, dataStatus, dispatch, loadWineRegionsByAuctionId])

   useEffect(() => {
      if (
         auctionAndSessionsByStatusIDsData &&
         (!auctionLotListings ||
            country ||
            size ||
            brand ||
            categories ||
            currentPage ||
            keyword ||
            rating ||
            state ||
            vintage)
      ) {
         getAllAuctionLotListings({
            SubRegion: subRegion || '',
            Producer: '',
            AuctionID: Number(auctionId) || auctionAndSessionsByStatusIDsData?.[0]?.auctionID,
            SessionID: auctionAndSessionsByStatusIDsData?.[0]?.sessionID,
            Special: '',
            Location: '',
            LotPageSize: '10',
            PageIndex: currentPage > 1 ? currentPage - 1 : 0,
            Country: country ? matchCountry(country) : '',
            BottleName: size || '',
            Collection: brand || '',
            Classification: categories || '',
            Keyword: keyword || '',
            Score: rating || '',
            Region: state || '',
         })
      }
   }, [
      auctionAndSessionsByStatusIDsData,
      country,
      size,
      brand,
      categories,
      currentPage,
      keyword,
      rating,
      state,
      vintage,
      auctionId,
      subRegion,
   ])

   useEffect(() => {
      if (
         !country ||
         !size ||
         !brand ||
         !categories ||
         !currentPage ||
         !keyword ||
         !rating ||
         !state ||
         !vintage ||
         !auctionId ||
         !subRegion
      ) {
         dispatch(
            setAuctionSlice({
               auctionLotListings: null,
            }),
         )
      }
   }, [country, size, brand, categories, currentPage, keyword, rating, state, vintage, auctionId, subRegion, dispatch])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
      if (isErrorStatus && errorStatus) {
         ApiErrorToast(errorStatus)
      }
      if (isErrorWineRegions && errorWineRegions) {
         ApiErrorToast(errorWineRegions)
      }
   }, [isError, errorStatus, isErrorWineRegions, errorWineRegions])

   useEffect(() => {
      if (isSuccess && data) {
         dispatch(
            setAuctionSlice({
               auctionLotListings: data.payload.data,
            }),
         )
      }
   }, [isSuccess, data, dispatch])

   useEffect(() => {
      if (isSuccessWineRegions) {
         dispatch(
            setAuctionSlice({
               loadAloadWineRegionsByAuctionIdData: dataWineRegions.payload.data,
            }),
         )
      }
   }, [isSuccessWineRegions, dataWineRegions, dispatch])

   useEffect(() => {
      if (fetchLotsStatusLiveBiddingIsLoading) {
         dispatch(
            setAuctionSlice({
               auctionLiveDataLoading: fetchLotsStatusLiveBiddingIsLoading,
            }),
         )
      }

      if (fetchLotsStatusLiveBiddingIsSuccess && fetchLotsStatusLiveBiddingData?.payload?.data) {
         dispatch(
            setAuctionSlice({
               auctionLiveData: fetchLotsStatusLiveBiddingData.payload.data,
               auctionLiveDataLoading: false,
            }),
         )
      }

      if (fetchLotsStatusLiveBiddingIsError && fetchLotsStatusLiveBiddingError) {
         ApiErrorToast(fetchLotsStatusLiveBiddingError)
      }
   }, [
      fetchLotsStatusLiveBiddingIsLoading,
      fetchLotsStatusLiveBiddingIsSuccess,
      fetchLotsStatusLiveBiddingData,
      fetchLotsStatusLiveBiddingIsError,
      fetchLotsStatusLiveBiddingError,
   ])

   return {
      auctionLotListings,
      isLoading,
      isSuccess,
      isError,
   }
}

export const useAuctionHighlightsData = () => {
   const dispatch = useDispatch()
   const [getAllAuctionHighlights, { isLoading, isSuccess, isError, data, error }] = useLoadAuctionLotListingMutation()

   const { loggingOut } = useSelector(selectUserSlice)
   const { auctionAndSessionsByStatusIDsData, auctionHighlights } = useSelector(selectAuctionSlice)

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
   }, [auctionAndSessionsByStatusIDsData, getAuctionAndSessionsByStatusID])

   useEffect(() => {
      if (isSuccessStatus && dataStatus) {
         dispatch(
            setAuctionSlice({
               auctionAndSessionsByStatusIDsData: dataStatus.payload.data,
            }),
         )
      }
   }, [isSuccessStatus, dataStatus, dispatch])

   useEffect(() => {
      if (loggingOut) dispatch(setLogoutLoading(false))

      // Fetch auction highlights if not available and we have auction session data
      if (!auctionHighlights && auctionAndSessionsByStatusIDsData) {
         getAllAuctionHighlights({
            SubRegion: '',
            Producer: '',
            Classification: '',
            AuctionID: auctionAndSessionsByStatusIDsData?.[0]?.auctionID,
            SessionID: auctionAndSessionsByStatusIDsData?.[0]?.sessionID,
            Special: '',
            Location: '',
            LotPageSize: '10',
            PageIndex: 1,
         })
      }
   }, [auctionHighlights, auctionAndSessionsByStatusIDsData, loggingOut, dispatch, getAllAuctionHighlights])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
   }, [isError, error])

   useEffect(() => {
      if (isSuccess && data) {
         dispatch(
            setAuctionSlice({
               auctionHighlights: data.payload.data,
            }),
         )
      }
   }, [isSuccess, data, dispatch])

   return {
      auctionHighlights,
      isLoading,
   }
}

export const useAddBid = () => {
   const [
      addBid,
      { data: addBidData, isLoading: addBidIsLoading, isError: addBidIsError, error: addBidError, isSuccess },
   ] = useAddBidMutation()

   useEffect(() => {
      if (addBidIsError) {
         ApiErrorToast(addBidError)
      }
   }, [addBidIsError, addBidError])

   useEffect(() => {
      if (isSuccess) {
         ApiSuccessToast(addBidData.message)
      }
   }, [isSuccess, addBidData])

   return {
      addBid,
      addBidIsLoading,
   }
}
