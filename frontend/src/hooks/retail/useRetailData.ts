import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'

import { routes } from '@/src/constants'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { selectGeneralSlice } from '@/src/store/features/general/generalSlice'
import { selectRetailSlice, setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { useLoadRetailWineListingMutation } from '@/src/store/services/retail'
import { allFilterData, ApiErrorToast, extractRange, matchCountry } from '@/src/utils/helpers'

// will use this to fetch all retails data along with params
// here filters might get affected
export const useRetailData = () => {
   const pathname = usePathname()

   const dispatch = useDispatch()
   const [getAllRetailWineListing, { isLoading, isSuccess, isError, data, error }] = useLoadRetailWineListingMutation()
   const { country, size, brand, currentPage, keyword, rating, state, priceRange, type, vintage, subRegion } =
      allFilterData()

   const { retailWineListing, retailWineFilters, retailWineHighlightListing } = useSelector(selectRetailSlice)
   const { countries } = useSelector(selectGeneralSlice)

   // Reset page to 1 whenever any filter changes (except page itself)
   useEffect(() => {
      if (pathname === routes.retail.wines && currentPage > 1) {
         updateQueryParams('page', '1')
      }
   }, [country, size, brand, keyword, rating, state, priceRange, type, vintage, subRegion, pathname])

   const fetchRetailWineListing = async () => {
      const _priceRange = extractRange(priceRange || '')

      try {
         dispatch(setRetailSlice({ retailListingLoading: true })) // Start loading
         await getAllRetailWineListing({
            PageIndex: currentPage > 1 ? currentPage - 1 : 0,
            Country: country ? matchCountry(country) : '',
            BottleName: size || '',
            Collection: brand || '',
            Type: type || '',
            Keyword: keyword || '',
            Score: rating || '',
            Region: state || '',
            // SubRegion: subRegion || '',
            PriceFrom: _priceRange.from ? String(_priceRange.from) : '',
            PriceTo: _priceRange.to ? String(_priceRange.to) : '',
            Vintage: vintage || '',
         })
      } catch (err) {
         console.error('API Error:', err)
      } finally {
         dispatch(setRetailSlice({ retailListingLoading: false })) // Stop loading
      }
   }

   useEffect(() => {
      if (pathname === routes.home && !retailWineHighlightListing) {
         fetchRetailWineListing()
      }
      if (pathname === routes.retail.wines) {
         if (
            !retailWineListing ||
            country ||
            size ||
            brand ||
            currentPage ||
            keyword ||
            rating ||
            type ||
            priceRange ||
            state ||
            vintage ||
            subRegion
         ) {
            fetchRetailWineListing()
         }
      }
   }, [country, size, brand, currentPage, keyword, rating, state, priceRange, type, vintage, subRegion])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      if (isSuccess && data) {
         if (pathname === routes.home) {
            dispatch(
               setRetailSlice({
                  retailWineHighlightListing: data.payload.data,
               }),
            )
         } else {
            dispatch(
               setRetailSlice({
                  retailWineListing: data.payload.data,
               }),
            )
         }

         if (pathname !== routes.retail.wines)
            if (!retailWineFilters) {
               const { total, retail, ...filtersData } = data.payload.data

               if (countries) {
                  dispatch(
                     setRetailSlice({
                        retailWineFilters: { ...filtersData, countries },
                     }),
                  )

                  return
               }

               dispatch(
                  setRetailSlice({
                     retailWineFilters: filtersData,
                  }),
               )
            }
      }
   }, [isSuccess, data])

   useEffect(() => {
      if (pathname === routes.retail.wines)
         if (
            !country ||
            !size ||
            !brand ||
            !currentPage ||
            !keyword ||
            !rating ||
            !state ||
            !type ||
            !priceRange ||
            !vintage ||
            !subRegion
         ) {
            fetchRetailWineListing()
         }
   }, [country, size, brand, currentPage, keyword, rating, state, type, priceRange, vintage, subRegion])

   return {
      retailWineListing,
      retailWineFilters,
      retailWineHighlightListing,
      isLoading,
      isSuccess,
      isError,
   }
}
