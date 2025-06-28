import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectGeneralSlice } from '@/src/store/features/general/generalSlice'
import { selectRetailSlice, setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { useLoadRetailWineListingMutation } from '@/src/store/services/retail'
import { ApiErrorToast } from '@/src/utils/helpers'

// will use this only to fetch all of the filters
export const useRetailFiltersData = () => {
   const dispatch = useDispatch()
   const [getAllRetailWineListing, { isLoading, isSuccess, isError, data, error }] = useLoadRetailWineListingMutation()
   const { retailWineFilters } = useSelector(selectRetailSlice)
   const { countries } = useSelector(selectGeneralSlice)

   const fetchRetailWineListing = async () => {
      try {
         if (!retailWineFilters) dispatch(setRetailSlice({ retailListingFiltersLoading: true })) // Start loading
         await getAllRetailWineListing({})
      } catch (err) {
         console.error('API Error:', err)
      } finally {
         if (!retailWineFilters) dispatch(setRetailSlice({ retailListingFiltersLoading: false })) // Stop loading
      }
   }

   useEffect(() => {
      if (!retailWineFilters) fetchRetailWineListing()
   }, [retailWineFilters])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      if (isSuccess && data) {
         if (!retailWineFilters?.filteredCountries) {
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
   }, [isSuccess, countries])

   return {
      retailWineFilters,
      isLoading,
      isSuccess,
      isError,
   }
}
