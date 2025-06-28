import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectTransactionSlice, setTransactionSlice } from '@/src/store/features/transactions'
import { useLazyGetTransactionHistoryQuery } from '@/src/store/services/transactions'
import { ApiErrorToast, getAllFiltersData } from '@/src/utils/helpers'

export const useTransactionData = () => {
   const dispatch = useDispatch()
   const { transactionData } = useSelector(selectTransactionSlice)
   const { orderRefNo, securityName, transactionType, fromDate, toDate } = getAllFiltersData()

   const [getTransactionHistory, { data, isLoading, isError, isSuccess, error }] = useLazyGetTransactionHistoryQuery()

   useEffect(() => {
      getTransactionHistory({
         orderRefNo: orderRefNo || '',
         securityName: securityName || '',
         transactionType: transactionType || '',
         fromDate: fromDate || '',
         toDate: toDate || '',
      })
   }, [orderRefNo, securityName, transactionType, fromDate, toDate])

   useEffect(() => {
      if (isSuccess) {
         dispatch(
            setTransactionSlice({
               transactionData: data.payload,
            }),
         )
      }
   }, [isSuccess, data])

   useEffect(() => {
      if (isError) {
         ApiErrorToast(error)
      }
   }, [isError, error])

   return {
      transactionData,
      isLoading,
   }
}
