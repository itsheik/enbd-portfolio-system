import { type TransactionDataReponse, type TransactionDataRequest } from '@/src/interface/transaction'

import { apiSlice } from './../apiSlice'

import { API_ENDPOINTS } from '~/constants'

export const TransactionApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: builder => ({
      getTransactionHistory: builder.query<TransactionDataReponse, TransactionDataRequest>({
         query: payload => ({
            url: API_ENDPOINTS.TRANSACTION.HISTORY,
            method: 'GET',
            params: payload,
            invalidateTags: ['TransactionHistory'],
         }),
      }),
   }),
})

export const { useGetTransactionHistoryQuery, useLazyGetTransactionHistoryQuery } = TransactionApi
