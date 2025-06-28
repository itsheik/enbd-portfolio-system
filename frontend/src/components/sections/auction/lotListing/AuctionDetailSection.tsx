'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOverlay } from '@mantine/core'
import { useParams, useRouter } from 'next/navigation'

import { GlobalTabsComponent } from '@/src/components/ui/tabs'
import { routes } from '@/src/constants'
import { useAuctionData } from '@/src/hooks/auction/useAuctionData'
import { selectAuctionSlice, setAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { useFetchImagesByLotIdMutation, useFetchLotDetailsByLotIdMutation } from '@/src/store/services/lot'
import { ApiErrorToast } from '@/src/utils/helpers'

import { AuctionHighLights } from '../../home/auction-highlights'
import ProductDetails from '../../ProductDetails'
import { SectionBanner } from '../../section-banner'
import { SectionContainer } from '../../section-container'
import DescriptionComponent from '../tabsComponents/DescriptionComponent'
import ShippingFAQ from '../tabsComponents/ShippingFAQ'

type Props = object

const AuctionDetailSection = (props: Props) => {
   const dispatch = useDispatch()
   const router = useRouter()

   const { auctionAndSessionsByStatusIDsData, lotDetails, lotImages } = useSelector(selectAuctionSlice)
   const { auctionLotListings, isLoading } = useAuctionData()
   const params = useParams<{
      id: string
   }>()

   const [
      fetchLotDetailsByLotId,
      {
         data: fetchLotDetailsByLotIdData,
         isLoading: fetchLotDetailsByLotIdIsLoading,
         isSuccess: fetchLotDetailsByLotIdIsSuccess,
         isError: fetchLotDetailsByLotIdIsError,
         error: fetchLotDetailsByLotIdError,
      },
   ] = useFetchLotDetailsByLotIdMutation()

   const [
      fetchImagesByLotId,
      {
         data: fetchImagesByLotIdData,
         isLoading: fetchImagesByLotIdIsLoading,
         isSuccess: fetchImagesByLotIdIsSuccess,
         isError: fetchImagesByLotIdIsError,
         error: fetchImagesByLotIdError,
      },
   ] = useFetchImagesByLotIdMutation()

   useEffect(() => {
      if (!isLoading && !fetchLotDetailsByLotIdIsSuccess && !fetchLotDetailsByLotIdIsError) {
         if (!lotDetails || (params && Number(params.id) !== lotDetails.lotID)) {
            fetchLotDetailsByLotId({
               lotId: params.id,
            })
         }
      } else if (fetchLotDetailsByLotIdIsError) {
         ApiErrorToast(fetchLotDetailsByLotIdError)
      } else if (fetchLotDetailsByLotIdIsSuccess) {
         dispatch(
            setAuctionSlice({
               lotDetails: fetchLotDetailsByLotIdData.payload.data,
            }),
         )
      }
   }, [isLoading, fetchLotDetailsByLotIdIsSuccess, fetchLotDetailsByLotIdError, lotDetails, params])

   useEffect(() => {
      if (!fetchImagesByLotIdIsLoading && !fetchImagesByLotIdIsSuccess && !fetchImagesByLotIdIsError && lotDetails) {
         if (!lotImages || (params && Number(params.id) !== lotDetails.lotID))
            fetchImagesByLotId({
               lotId: params.id,
            })
      } else if (fetchImagesByLotIdIsError) {
         ApiErrorToast(fetchImagesByLotIdError)
      } else if (fetchImagesByLotIdIsSuccess) {
         dispatch(
            setAuctionSlice({
               lotImages: fetchImagesByLotIdData.payload.data,
            }),
         )
      }
   }, [
      fetchImagesByLotIdIsLoading,
      fetchImagesByLotIdIsSuccess,
      fetchImagesByLotIdIsError,
      lotImages,
      params,
      lotDetails,
   ])

   const AUCTION_LISTING_DETAILS_TAB_DATA = [
      {
         value: 'first',
         name: 'Description',
         node: <DescriptionComponent />,
      },
      {
         value: 'second',
         name: 'Shipping FAQ',
         node: <ShippingFAQ />,
      },
      {
         value: 'third',
         name: 'Bid Increment',
         node: <ShippingFAQ />,
      },
      {
         value: 'fourth',
         name: 'Condition FAQ',
         node: <ShippingFAQ />,
      },
      {
         value: 'fifth',
         name: 'Terms & Conditions',
         node: <ShippingFAQ />,
      },
      {
         value: 'sixth',
         name: 'Consign a Wine Like This',
         node: <ShippingFAQ />,
      },
   ]

   return (
      <>
         <SectionBanner
            title="AUCTION LOT LISTING"
            text={auctionAndSessionsByStatusIDsData?.[0].auctionDescription}
            buttonLabel="View Auction Schedule and Details"
            click={() => router.push(routes.auctions.scheduleView)}
         />
         <SectionContainer className="!px-8">
            {fetchLotDetailsByLotIdIsLoading ? (
               <LoadingOverlay visible={fetchLotDetailsByLotIdIsLoading} />
            ) : (
               <div>
                  <ProductDetails isLoading={fetchLotDetailsByLotIdIsLoading || fetchImagesByLotIdIsLoading} />
                  <GlobalTabsComponent data={AUCTION_LISTING_DETAILS_TAB_DATA} />
                  <SectionContainer className="my-16">
                     <AuctionHighLights
                        title="Recommendations"
                        subtitle=""
                        styles={{
                           title: { className: 'font-gilda-display text-primary text-4xl' },
                           subtitle: { className: 'text-gray-500 text-lg sm:text-xl md:text-2xl' },
                        }}
                        isLink={false}
                     />
                  </SectionContainer>
               </div>
            )}
         </SectionContainer>
      </>
   )
}

export default AuctionDetailSection
