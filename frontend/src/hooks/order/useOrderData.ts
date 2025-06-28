import { useEffect } from 'react'

import { useCompleteOrderMutation } from '@/src/store/services/retail'
import { ApiErrorToast, ApiSuccessToast } from '@/src/utils/helpers'

export const useAddOrder = () => {
   const [
      completeOrder,
      {
         isLoading: isCompleteOrderLoading,
         isSuccess: isCompleteOrderSuccess,
         isError: isCompleteOrderError,
         data: completeOrderData,
         error: completeOrderError,
      },
   ] = useCompleteOrderMutation()

   useEffect(() => {
      if (isCompleteOrderSuccess) {
         ApiSuccessToast(completeOrderData.payload.data)
      }
   }, [isCompleteOrderSuccess])

   useEffect(() => {
      if (isCompleteOrderError) {
         ApiErrorToast(completeOrderError)
      }
   }, [isCompleteOrderError])

   return {
      completeOrder,
      isCompleteOrderLoading,
   }
}

