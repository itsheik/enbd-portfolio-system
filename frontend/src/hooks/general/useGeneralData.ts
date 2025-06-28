import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectGeneralSlice, setGeneralSlice } from '@/src/store/features/general/generalSlice'
import { useLoadCountriesMutation } from '@/src/store/services/general'
import { ApiErrorToast } from '@/src/utils/helpers'

export const useGeneralData = () => {
   const dispatch = useDispatch()
   const { countries } = useSelector(selectGeneralSlice)

   const [getCountries, { isLoading, isSuccess, isError, error, data }] = useLoadCountriesMutation()

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

   return {
      countries,
      isLoading,
      isSuccess,
      isError,
   }
}
