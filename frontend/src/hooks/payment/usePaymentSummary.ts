import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { useGetPaymentSummaryMutation } from '@/src/store/services/retail'
import { ApiErrorToast } from '@/src/utils/helpers'

export const usePaymentSummary = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const [
      getPaymentSummary,
      {
         isLoading: isGetPaymentSummaryLoading,
         isSuccess: isGetPaymentSummarySuccess,
         data: paymentSummary,
         error: getPaymentSummaryError,
         isError: isGetPaymentSummaryError,
      },
   ] = useGetPaymentSummaryMutation()

   useEffect(() => {
      if (isGetPaymentSummarySuccess) {
         dispatch(setRetailSlice({ paymentSummary: paymentSummary.payload.data }))

         router.push(routes.order)
      }
   }, [isGetPaymentSummarySuccess])

   useEffect(() => {
      if (isGetPaymentSummaryError) {
         ApiErrorToast(getPaymentSummaryError)
      }
   }, [isGetPaymentSummaryError])

   return {
      getPaymentSummary,
      isGetPaymentSummaryLoading,
   }
}
